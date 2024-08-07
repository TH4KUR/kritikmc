"use client";

import { UploadButton } from "@/utils/uploadthing";
import React from "react";

const UploaderButton = ({ setResponse, setUploaded }) => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");
        setUploaded(true);
        setResponse(res);
        console.log(res);
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploaderButton;
