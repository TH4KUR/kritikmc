import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";
// import student from "@/models/Student";
// import connectDB from "@/app/lib/connectDB";
import { UploadRegistrationData } from "@/app/lib/UploadRegistrationData";

const f = createUploadthing();
// Fake auth function

export const FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const delegateId = cookies().get("delegateId");

      // If you throw, the user will not be able to upload
      if (!delegateId) throw new UploadThingError("No delegate ID found!!");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      const regCookie = cookies().get("registrationData").value;
      return { delegateId, regCookie };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete for userId:", metadata.delegateId);
        console.log("file ", file);

        /////////////////////////////////////////////////////
        // Upload all data to server
        /////////////////////////////////////////////////////
        const dataUploaded = await UploadRegistrationData(
          metadata.regCookie,
          file.url
        );

        ////////////////////////////////////////////////////
        // TODO: RENAME FUNCTIONALITY
        /////////////////////////////////////////////////////

        // const oldname = file.key;
        // const newFileName =
        //   cookies().get("username") + "__" + cookies().get("delegateId");

        // await renameFiles(oldname, newFileName);
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback

        return {
          dataUploaded,
        };
      } catch (err) {
        if (
          err.includes(
            "E11000 duplicate key error collection: test.students index: email_1 dup key:"
          )
        ) {
          throw new UploadThingError(
            "Duplicate Email Address Used, contact management for refund if amount paid."
          );
        }
      }
    }),
};

export default FileRouter;
