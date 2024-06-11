/* eslint-disable @next/next/no-img-element */
import React from "react";
import Timer from "./Timer";

const Hero = async () => {
  return (
    <section>
      <img
        src="/hero.webp"
        alt="a picture of kakatiya medical college"
        className=" min-w-[100%]"
      />

      <h1 className="hidden">
        The most awaited medical conference of the year is back!
      </h1>
      <div className="flex justify-end gap-3 mr-4 mb-4 -translate-y-3">
        <button className="bg-accent px-4 py-2 rounded-lg text-white font-semibold text-xs">
          Register Now!
        </button>
        <button className="border-2 border-black font-bold px-4 py-2 rounded-lg text-xs">
          Events
        </button>
      </div>
      <Timer />
    </section>
  );
};

export default Hero;
