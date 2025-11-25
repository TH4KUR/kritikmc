import Link from "next/link";
import React from "react";
import Arrow from "./icons/Arrow";
import Image from "next/image";

const Brochure = () => {
  return (
    <section className="bg-[url('/timelinebg.png')] bg-contain bg-origin-border flex flex-col items-center py-10 px-4 text-black min-h-[40vh] justify-center">
      <h2 className="text-[#DA5867] uppercase font-bold text-base md:text-lg lg:text-xl">
        Brochure
      </h2>
      <h3 className="text-2xl font-semibold md:text-3xl mb-6 text-white">
        Download our brochure below
      </h3>

      <div className="w-10/12 sm:w-2/4 md:w-1/3 lg:w-1/5 mb-6">
        <Link
          href={"/kriti_brochure.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg overflow-hidden focus:outline-none focus:ring focus:ring-[#7ea03e]"
        >
          <div className="relative aspect-[9/16] w-full">
            <Image
              src={"/brochure_cover.png"}
              alt="Kriti Brochure Front Page"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </Link>
      </div>

      <div className="grid place-items-center p-5">
        <Link
          href={"/kriti_brochure.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center gap-2 items-center mx-auto bg-[#cbe896] px-4 py-2 rounded-lg text-[#074802] font-semibold text-base hover:bg-[#d2fc85] hover:scale-105 transition-all focus:outline-none focus:ring focus:ring-[#7ea03e]"
        >
          <span>Download Brochure</span>
          <Arrow size={14} color={"#074802"} />
        </Link>
      </div>
    </section>
  );
};

export default Brochure;
