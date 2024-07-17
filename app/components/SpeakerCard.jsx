/* eslint-disable @next/next/no-img-element */
"use client";
import { urlForImage } from "@/sanity/lib/image";
import { motion } from "framer-motion";

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
        className="grid md:grid-rows-1 md:grid-cols-12 mt-8"
      >
        <div className="md:col-span-5 sm:h-full self-end">
          <img
            src={urlForImage(data.speakerimg)}
            alt={"an image of" + data.speakername}
            className=" object-cover h-full w-full md:rounded-l-lg md:rounded-tr-none rounded-t-lg saturate-50 aspect-video"
          />
        </div>
        <div className="bg-[#F4E3D4] md:col-span-7 md:rounded-r-lg md:rounded-bl-none rounded-b-lg px-3 py-5">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
            {data.speakername}
          </h3>
          <h4 className="text-sm text-red-800 font-semibold md:text-base lg:text-lg">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-[0.825rem] leading-4 sm:text-base font-medium">
            {data.speakerdesc}
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
        className="grid md:grid-rows-1 md:grid-cols-12 mt-8"
      >
        <div className="md:col-span-5 sm:h-full self-end">
          <img
            src={urlForImage(data.speakerimg)}
            alt={"an image of" + data.speakername}
            className=" object-cover h-full w-full md:rounded-l-lg md:rounded-tr-none rounded-t-lg saturate-50 aspect-video"
          />
        </div>
        <div className=" bg-[#F1F5DA] md:col-span-7 md:rounded-r-lg md:rounded-bl-none rounded-b-lg px-3 py-5 flex flex-col justify-center">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
            {data.speakername}
          </h3>
          <h4 className=" text-sm text-[#327D18] font-semibold md:text-base lg:text-lg">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-[0.825rem] leading-4 sm:text-base font-medium">
            {data.speakerdesc}
          </p>
        </div>
      </motion.div>
    );
  }
};

export default SpeakerCard;
