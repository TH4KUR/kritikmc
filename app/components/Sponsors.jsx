/* eslint-disable @next/next/no-img-element */
import React from "react";

const Sponsors = () => {
  return (
    <section className="bg-bg flex flex-col items-center py-6 px-1 text-black">
      <h1 className=" text-accent uppercase font-bold text-base">Sponsors</h1>
      <h3 className="text-2xl font-bold mb-7">
        {" "}
        kriti<span className="text-accent">.</span> is sponsored by
      </h3>
      <div className="grid grid-cols-3 items-center gap-4">
        <div className=" object-cover  p-5">
          <img src="/marrow.png" className="rounded-lg" alt="Marrow" />
        </div>
        <div className=" object-cover  p-1">
          <img src="/kaplan.png" className="rounded-lg" alt="Kaplan" />
        </div>
        <div className=" object-cover  p-5">
          <img src="/prepladder.png" className="rounded-lg" alt="Prepladder" />
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
