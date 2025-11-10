import React from "react";
import JudgeCarousel from "./JudgeCarousel";

const Judges = ({ judgedata }) => {
  return (
    <section className="bg-bgSecondary flex flex-col items-center pt-8 pb-20  min-h-[600px] justify-center">
      <h2 className=" text-[#DA5867] text-center uppercase font-semibold text-base md:text-lg mt-5 px-6">
        Judges
      </h2>
      <h3 className="text-gray-100 text-center text-2xl font-semibold md:text-3xl px-6">
        Experience meets discernment
      </h3>
      <p className="text-gray-300 text-center text-sm md:text-base max-w-3xl px-6 mt-3 mb-5">
        Meet the seasoned professionals who bring thoughtful rigor to every
        submission, ensuring each voice is heard and celebrated.
      </p>
      <div className={`w-full md:w-2/3 lg:h-4/5`}>
        <JudgeCarousel judgedata={judgedata} />
      </div>
    </section>
  );
};

export default Judges;
