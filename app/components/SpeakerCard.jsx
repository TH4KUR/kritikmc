"use client";

import { myClient } from "@/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";

const builder = imageUrlBuilder(myClient);

function retrieveImageUrl(source) {
  return builder.image(source);
}

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
        className="grid grid-cols-12 mt-8"
      >
        <div
          style={{ "--image-url": `url(${retrieveImageUrl(data.speakerimg)})` }}
          className="bg-[image:var(--image-url)] bg-cover col-span-4 rounded-l-lg saturate-50"
        ></div>
        <div className=" bg-[#F4E3D4] col-span-8 rounded-r-lg px-3 py-5">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
            {data.speakername}
          </h3>
          <h4 className=" text-sm text-red-800 font-semibold lg:text-base">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-xs sm:text-base font-medium">
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
        className="grid grid-cols-12 mt-8"
      >
        <div
          style={{ "--image-url": `url(${retrieveImageUrl(data.speakerimg)})` }}
          className="bg-[image:var(--image-url)] bg-cover col-span-4 rounded-l-lg saturate-50"
        >
          {/* <img
          className="rounded-l-lg bg-cover"
          src="/speaker1.jpg"
          alt="Speaker 1"
        /> */}
        </div>
        <div className=" bg-[#F1F5DA] col-span-8 rounded-r-lg px-3 py-4">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
            {data.speakername}
          </h3>
          <h4 className=" text-sm text-[#327D18] font-semibold lg:text-base">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-xs sm:text-base font-medium">
            {data.speakerdesc}
          </p>
        </div>
      </motion.div>
    );
  }
};

export default SpeakerCard;
