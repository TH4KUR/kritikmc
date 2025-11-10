import React from "react";
import PatreonCarousel from "./PatreonCarousel";

const Patreons = ({ patrondata }) => {
  return (
    <>
      <section className="bg-bgSecondary flex flex-col items-center pt-8 pb-12  min-h-[600px] justify-center ">
        <h2 className=" text-[#DA5867] text-center uppercase font-semibold text-base md:text-lg mt-5 px-6">
          Patrons
        </h2>
        <h3 className="text-gray-100 text-center text-2xl font-semibold md:text-3xl px-6">
          Leaders championing Kriti
        </h3>
        <p className="text-gray-300 text-center text-sm md:text-base max-w-3xl px-6 mt-3 mb-6">
          Discover the visionaries whose mentorship and generosity propel the
          festival forward, nurturing the communities it serves.
        </p>
        <div className={`w-full md:w-2/3 lg:h-4/5`}>
          <PatreonCarousel patrondata={patrondata} />
        </div>
        <div className="after:w-24 after:bg-white/20 after:h-[1px] after:block mx-auto mt-16"></div>
      </section>
    </>
  );
};

export default Patreons;
