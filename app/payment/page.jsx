"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import SecondaryHero from "../components/SecondaryHero";
import { useState } from "react";
import Checkmark from "../registration/components/icons/Checkmark";

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const [response, setResponse] = useState({});
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      {uploaded ? (
        <>
          <Checkmark className=" size-32 mx-auto bg-green-500" />
        </>
      ) : (
        <>
          <SecondaryHero
            title={"Payment Page"}
            body={
              "Please pay the applicable amount on the QR_Code below and upload the file."
            }
          />
          <Image
            src={"/Payment_Image_1.jpg"}
            height={500}
            width={500}
            alt="Payment QR code"
            className="my-5"
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </>
      )}
    </main>
  );
}
