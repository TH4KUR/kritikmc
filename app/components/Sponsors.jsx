import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sponsors = () => {
  return (
    <section className="bg-bg flex flex-col items-center py-10 px-1 text-black">
      <h2 className=" text-accent uppercase font-bold text-base md:text-lg lg:text-xl">
        Sponsors
      </h2>
      <h3 className="text-2xl font-bold md:text-3xl mb-10">
        kriti<span className="text-accent">.</span> is sponsored by
      </h3>

      <div>
        <Link
          className=" flex items-center flex-col md:flex-row gap-5 object-cover p-5"
          href={"https://www.marrow.com/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="rounded-lg"
            height={120}
            width={120}
            src="/marrow.png"
            alt="The logo of company Marrow"
          />

          <span className="text-3xl font-medium">Marrow</span>
        </Link>

        <Link
          className=" flex items-center gap-5 object-cover p-5"
          href={"https://www.amboss.com/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            // height={350}
            width={325}
            className=" mx-auto"
            src="/Logo-teal-vertical.webp"
            alt="kmc amboss logo"
          />
        </Link>
      </div>
    </section>
  );
};

export default Sponsors;
