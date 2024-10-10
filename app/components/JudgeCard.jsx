"use client";
import React from "react";
import { motion } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

const JudgeCard = ({ data }) => {
  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ translateY: 50, scale: 0.5, opacity: 0.7 }}
      whileInView={{
        translateY: 0,
        opacity: 1,
        scale: 1,
      }}
      className="grid lg:grid-rows-1 lg:grid-cols-12 mt-8 md:grid-rows-12 md:grid-cols-1"
    >
      <div className="lg:col-span-5 md:row-span-5 sm:h-full">
        <Image
          height={180}
          width={320}
          src={urlForImage(data.judgeimg)}
          alt={"an image of"}
          className="object-cover h-full w-full max-h-[75vh] lg:max-h-full lg:rounded-l-lg lg:rounded-tr-none rounded-t-lg saturate-50 aspect-square"
        />
      </div>
      <div className="bg-[#fde7ff] lg:col-span-7 lg:rounded-r-lg lg:rounded-bl-none rounded-b-lg md:row-span-5 px-3 py-5">
        <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
          {data.judgename}
        </h3>
        <h4 className="text-sm text-sky-800 font-semibold md:text-base lg:text-lg">
          Judge
        </h4>
        <p className="mt-3 text-[0.825rem] leading-4 sm:text-base font-medium text-start">
          {data.judgedesc.slice(0, 500) + "..."}
        </p>
      </div>
    </motion.div>
  );
};

export default JudgeCard;
