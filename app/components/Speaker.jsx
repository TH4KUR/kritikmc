import SpeakerCard from "./SpeakerCard";
import { myClient } from "@/sanity";

async function Speaker({ speakerdata }) {
  return (
    <section className="bg-bgSecondary flex flex-col items-center pt-8 pb-14 px-6">
      <h2 className=" text-[#DA5867] uppercase font-semibold text-sm">
        Speakers
      </h2>
      <h3 className="text-gray-100 text-2xl font-semibold">
        Know the Speakers
      </h3>
      {speakerdata.map((el, i) => {
        return <SpeakerCard data={el} key={i} />;
      })}
    </section>
  );
}

export default Speaker;
