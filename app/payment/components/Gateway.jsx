"use client";
import SecondaryHero from "@/app/components/SecondaryHero";
import Checkmark from "@/app/registration/components/icons/Checkmark";
import Image from "next/image";
import React, { useState } from "react";
import UploaderButton from "./UploaderButton";

const Gateway = ({ regData }) => {
  const [uploaded, setUploaded] = useState(false);
  const [response, setResponse] = useState({});
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      {uploaded ? (
        <>
          <Checkmark className=" size-32 mx-auto bg-green-500" />
          <code>{JSON.parse(res)}</code>
        </>
      ) : (
        <>
          <SecondaryHero
            title={"Payment Page"}
            body={
              "Please pay the applicable amount on the QR_Code below and upload the file."
            }
          />
          <div className="bg-bgSecondary w-full mx-auto flex justify-center py-6">
            <p className="bg-white/5 text-white text-xl font-semibold px-5 py-3 rounded-md">
              ₹{regData.isKmcStudent === "true" ? "300" : "400"}
            </p>
          </div>
          <Image
            src={"/Payment_Image_1.jpg"}
            height={500}
            width={500}
            alt="Payment QR code"
            className="my-5"
          />
          <button onClick={() => {}}>check</button>
          <UploaderButton setUploaded={setUploaded} setResponse={setResponse} />
        </>
      )}
    </main>
  );
};

export default Gateway;
