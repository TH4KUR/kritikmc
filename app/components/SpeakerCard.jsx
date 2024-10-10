/* eslint-disable @next/next/no-img-element */
"use client";
import { urlForImage } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

const SpeakerCard = ({ data }) => {
  if (data.speakertype === "Chief Guest") {
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
            src={urlForImage(data.speakerimg)}
            alt={"an image of" + data.speakername}
            className="object-cover h-full w-full max-h-[75vh] lg:max-h-full lg:rounded-l-lg lg:rounded-tr-none rounded-t-lg saturate-50 aspect-square"
          />
        </div>
        <div className="bg-[#F4E3D4] lg:col-span-7 lg:rounded-r-lg lg:rounded-bl-none rounded-b-lg md:row-span-5 px-3 py-5">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
            {data.speakername}
          </h3>
          <h4 className="text-sm text-red-800 font-semibold md:text-base lg:text-lg">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-[0.825rem] leading-4 sm:text-base font-medium text-start">
            {data.speakerdesc.slice(0, 550) + "..."}
          </p>
        </div>
      </motion.div>
    );
  } else if (data.speakertype === "Guest Speaker") {
    return (
      <motion.div
        viewport={{ once: true }}
        initial={{ translateY: 50, scale: 0.5, opacity: 0.7 }}
        whileInView={{
          translateY: 0,
          opacity: 1,
          scale: 1,
        }}
        className="grid lg:grid-rows-1 lg:grid-cols-12 md:grid-rows-12 md:grid-cols-1 mt-8 justify-center"
      >
        <div className="lg:col-span-5 md:row-span-5 sm:h-full">
          <Image
            height={180}
            width={320}
            src={urlForImage(data.speakerimg)}
            alt={"an image of" + data.speakername}
            className=" object-cover h-full w-full max-h-[75vh] lg:max-h-full lg:rounded-l-lg lg:rounded-tr-none rounded-t-lg saturate-50 aspect-square"
          />
        </div>
        <div className=" bg-[#F1F5DA] lg:col-span-7 lg:rounded-r-lg lg:rounded-bl-none rounded-b-lg md:row-span-5 px-3 py-5 flex flex-col">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
            {data.speakername}
          </h3>
          <h4 className=" text-sm text-[#327D18] font-semibold md:text-base lg:text-lg">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-[0.825rem] leading-4 sm:text-base font-medium text-start">
            {data.speakerdesc.slice(0, 550) + "..."}
          </p>
        </div>
      </motion.div>
    );
  }
};

export default SpeakerCard;
