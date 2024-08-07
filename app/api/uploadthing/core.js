import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";
import { renameFiles } from "./renameFiles";
import student from "@/models/Student";

const f = createUploadthing();
// Fake auth function

export const FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = cookies().get("delegateId");

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("No delegate ID found!!");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file ", file);

      const regCookie = cookies().get("registrationData").value;
      const regData = JSON.parse(Buffer.from(regCookie, "base64").toString());
      console.log(regData);
      const studentData = new student({
        name: regData.studentName,
        email: regData.studentEmail,
        mobileno: Number(regData.studentNumber),
        collegeYear: Number(regData.collegeYear),
        collegeName: regData.studentCollege,
        isKmcStudent: regData.isKmcStudent === "true" ? true : false,
        delegateId: regData.delegateId,
        isPgStudent: regData.isPgStudent,
        events: regData.events,
      });
      let resMongo = await studentData.save();
      /////////////////////////////////////////////////////
      // TODO: RENAME FUNCTIONALITY
      /////////////////////////////////////////////////////

      // const oldname = file.key;
      // const newFileName =
      //   cookies().get("username") + "__" + cookies().get("delegateId");

      // await renameFiles(oldname, newFileName);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback

      return {
        uploadedBy: metadata.userId,
        dataUploaded: regData,
        url: file.url,
      };
    }),
};

export default FileRouter;
