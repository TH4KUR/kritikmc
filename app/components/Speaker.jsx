import React from "react";
import SpeakerCard from "./SpeakerCard";

const Speaker = () => {
  return (
    <section className="bg-bgSecondary flex flex-col items-center py-6 px-3">
      <h1 className=" text-[#DA5867] uppercase font-bold text-sm">Speakers</h1>
      <h3 className="text-gray-100 text-2xl font-semibold">
        Know the Speakers
      </h3>
      <SpeakerCard type={"chief"} />
      <SpeakerCard type={"guest"} />
    </section>
  );
};

export default Speaker;
