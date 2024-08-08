"use client";
import Checkmark from "@/app/registration/components/icons/Checkmark";
import Image from "next/image";
import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

const Gateway = ({ regData }) => {
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState({});
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {success ? (
        <>
          <section className="py-2">
            <div className="flex flex-col items-center">
              <Checkmark className=" size-32 mx-auto bg-green-500 rounded-full p-7" />
              <h1 className="font-semibold text-xl mt-5">
                Registration Request Successfull!!
              </h1>
              <p className="text-center">
                You will receive a confirmation email once our team has
                confirmed the payment.
              </p>
              <pre className="mt-5 bg-[#111] text-gray-50 w-full px-5 py-3">
                {JSON.stringify(response, null, 2)}
                {/*{JSON.stringify(
                  JSON.parse(
                    atob(
                      "eyJkZWxlZ2F0ZUlkIjoiRC0xMDQxYWJhNSIsInN0dWRlbnROYW1lIjoiRWFzaGFhbiBUaGFrdXIiLCJzdHVkZW50TnVtYmVyIjoiODcwMDYyMTUzNCIsInN0dWRlbnRFbWFpbCI6InBheW5lQGdtYWlsLmNvbSIsImNvbGxlZ2VZZWFyIjpudWxsLCJpc0ttY1N0dWRlbnQiOiJmYWxzZSIsImttY1JvbGxObyI6bnVsbCwiaXNQZ1N0dWRlbnQiOiJ0cnVlIiwic3R1ZGVudENvbGxlZ2UiOiJLYWthdGl5YSBNZWRpY2FsIENvbGxlZ2UiLCJldmVudHMiOlsiZGViYXRlIiwicG9zdGVyUHJlc2VudGF0aW9uIl19"
                    )
                  ),
                  null,
                  2
                )} */}
              </pre>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="text-[#fdf8e2] bg-bgSecondary py-12 px-4">
            <h1 className="text-xl md:text-2xl font-semibold mb-4 md:w-4/5 sm:mx-auto mx-5 max-w-screen-md">
              Payment Page
            </h1>
            <p className="text-base md:text-lg mx-5 md:w-4/5 sm:mx-auto max-w-screen-md">
              Please pay the applicable amount on the QR_Code below and upload
              the screenshot of the payment made.
            </p>
            <div className="flex justify-center pt-6">
              <p className="bg-white/5 text-white text-xl font-semibold px-5 py-3 rounded-md ">
                ₹
                {regData.isKmcStudent === "true"
                  ? "300"
                  : regData.isPgStudent
                    ? "600"
                    : "400"}
              </p>
            </div>
          </section>
          <Image
            src={"/Payment_Image_1.jpg"}
            height={500}
            width={500}
            alt="Payment QR code"
            className="my-5"
          />
          <div className="my-5">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setSuccess(true);
                setResponse(res);
                console.log(res);
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>{" "}
        </>
      )}
    </main>
  );
};

export default Gateway;
