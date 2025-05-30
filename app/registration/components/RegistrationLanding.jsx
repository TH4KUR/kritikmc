"use client";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import React, { useState } from "react";
import MainRegistration from "./MainRegistration";
import Link from "next/link";

const RegistrationLanding = ({ deadline, start }) => {
  const [activeParticipation, setActiveParticipation] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  console.log(deadline);
  return (
    <>
      {initialLoad ? (
        <>
          <Nav />
          <main className="min-h-[70vh] flex items-center justify-center max-w-screen-xl mx-auto my-5">
            <div className=" grid lg:grid-cols-2 gap-5 mx-auto">
              <div
                className="p-4 size-[19rem] hover:shadow hover:-translate-x-1 hover:-translate-y-2 hover:scale-105 transition-all flex flex-col gap-3 items-center justify-center rounded-lg bg-cover relative cursor-pointer overflow-hidden focus:ring focus:ring-amber-500"
                onClick={() => {
                  setInitialLoad(false);
                  setActiveParticipation(true);
                }}
              >
                <div className="bg-[url('/active.webp')] h-full w-full z-0 bottom-0 absolute bg-cover brightness-[0.30] "></div>
                <h3 className=" text-xl font-semibold text-gray-100 z-10">
                  Active Participant Registration
                </h3>
                <p className=" z-10 text-gray-300 font-medium">
                  Be an active participate and contest against other delegates.
                  The winners return with amazing prizes in hand 😎.
                </p>
              </div>
              <Link
                href={"/registration/passive"}
                className="p-4 size-[19rem] hover:shadow hover:-translate-x-1 hover:-translate-y-2 hover:scale-105 transition-all flex flex-col gap-3 items-center justify-center rounded-lg bg-cover relative cursor-pointer overflow-hidden focus:ring focus:ring-amber-500"
              >
                <div className="bg-[url('/posterpresentation.jpg')] h-full w-full z-0 bottom-0 absolute bg-cover brightness-[0.30]"></div>
                <h3 className=" text-xl font-semibold text-gray-100 z-10">
                  Passive Delegate Registration
                </h3>
                <p className="z-10 text-gray-300 font-medium">
                  Be an passive participate and watch and learn from the active
                  delegates. Or just support your friends participating 😉.
                </p>
              </Link>
              <Link
                href={"/registration/amboss"}
                className=" p-4 size-[19rem] hover:shadow hover:-translate-x-1 hover:-translate-y-2 hover:scale-105 transition-all flex flex-col gap-3 items-center justify-center rounded-lg bg-cover relative cursor-pointer overflow-hidden focus:ring focus:ring-amber-500 bg-black/70"
              >
                <div className="bg-[url('/Logo-teal-vertical.webp')] h-[60%] w-[100%] z-0 absolute top-[6] right-0  bg-cover bg-center"></div>
                <h3 className=" text-xl font-semibold text-gray-100 z-10">
                  AMBOSS Workshop Registration
                </h3>
                <p className="z-10 text-gray-200 font-medium">
                  Master medical knowledge fast—join our AMBOSS Workshop for
                  essential exam insights! ✨.
                </p>
              </Link>
            </div>
          </main>
          <Footer />
        </>
      ) : (
        (function () {
          if (activeParticipation) {
            return <MainRegistration deadline={deadline} start={start} />;
          }
        })()
      )}
    </>
  );
};

export default RegistrationLanding;
