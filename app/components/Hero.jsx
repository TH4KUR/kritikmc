/* eslint-disable @next/next/no-img-element */
import React from "react";

const Hero = () => {
  return (
    <section className=" -translate-y-6">
      <img src="/hero_mobile.svg" alt="a picture of kakatiya medical college" />
      <h1 className="hidden">
        The most awaited medical conference of the year is back!
      </h1>
      <div className="-translate-y-24 flex justify-end gap-3 mr-4">
        <button className="bg-accent px-4 py-2 rounded-lg text-white font-semibold text-xs">
          Register Now!
        </button>
        <button className="border-2 border-black font-bold px-4 py-2 rounded-lg text-xs">
          Events
        </button>
      </div>
    </section>
  );
};

export default Hero;
