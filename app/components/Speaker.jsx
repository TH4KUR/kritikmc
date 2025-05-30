"use client";

import SpeakerCarousel from "./SpeakerCarousel";

// import Image from "next/image";

function Speaker({ speakerdata }) {
  // console.log(speakerdata);
  return (
    <>
      <section className="bg-bgSecondary flex flex-col items-center pt-7 pb-10  min-h-[600px] justify-center">
        <h2 className=" text-[#DA5867] uppercase font-semibold text-base md:text-lg mt-5 px-6">
          Speakers
        </h2>
        <h3 className="text-gray-100 text-2xl font-semibold md:text-3xl px-6">
          Know the Speakers
        </h3>
        <div className={`w-full md:w-2/3 lg:h-4/5`}>
          <SpeakerCarousel speakerdata={speakerdata} />
        </div>
        <div className="after:w-24 after:bg-white/20 after:h-[1px] after:block mx-auto mt-16"></div>
      </section>
    </>
  );
}

export default Speaker;
