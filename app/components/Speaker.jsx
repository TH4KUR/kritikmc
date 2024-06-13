import React from "react";
import SpeakerCard from "./SpeakerCard";

const Speaker = () => {
  return (
    <section className="bg-bgSecondary flex flex-col items-center pt-8 pb-14 px-6">
      <h2 className=" text-[#DA5867] uppercase font-semibold text-sm">
        Speakers
      </h2>
      <h3 className="text-gray-100 text-2xl font-semibold">
        Know the Speakers
      </h3>
      <SpeakerCard type={"chief"} />
      <SpeakerCard type={"guest"} />
    </section>
  );
};

export default Speaker;
