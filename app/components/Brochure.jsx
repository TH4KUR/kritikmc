import Link from "next/link";
import React from "react";
import Arrow from "./icons/Arrow";
import Image from "next/image";

const Brochure = () => {
  return (
    <section className="bg-[url('/timelinebg.png')] bg-contains bg-origin-border flex flex-col items-center py-10 px-1 text-black min-h-[40vh] justify-center">
      <h2 className=" text-[#DA5867] uppercase font-bold text-base md:text-lg lg:text-xl">
        Brochure
      </h2>
      <h3 className="text-2xl font-semibold md:text-3xl mb-10 text-white">
        Download our brochure below
      </h3>

      <Link
        href={"/brochure_compressed.pdf"}
        target="_blank"
        rel="noopener noreferer"
        className="rounded-lg hover:scale-105 transition-all focus:outline-none  focus:ring focus:ring-[#7ea03e]"
      >
        <Image
          height={500}
          width={200}
          src={"/brochure_page1.jpg"}
          alt="Kriti Brochure Front Page"
          className="rounded-lg"
        />
      </Link>
      <div className=" grid place-items-center object-cover p-5">
        <Link
          href={"/brochure_compressed.pdf"}
          target="_blank"
          rel="noopener noreferer"
          className="flex justify-center gap-1 items-center mx-auto bg-[#cbe896] px-4 py-2 rounded-lg text-[#074802] font-semibold text-base md:text-basehover:bg-[#d2fc85] hover:w-full hover:scale-105 transition-all focus:outline-none hover:gap-3 focus:ring focus:ring-[#7ea03e] "
        >
          <span>Download Brochure</span> <Arrow size={10} color={"#074802"} />
        </Link>
      </div>
    </section>
  );
};

export default Brochure;
