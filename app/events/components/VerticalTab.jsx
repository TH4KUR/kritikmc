"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./VTStyles.css";
import Image from "next/image";

const Box = ({ eventDetails, index }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [0.8, 1, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "-100%"]);
  const imgTop = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 1],
    ["0vh", "30vh", "1vh", "0vh"]
  );

  const textOpacity = useTransform(scrollYProgress, [0.4, 0.45], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.4, 0.45], [0.7, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      ref={targetRef}
      className="sm:w-3/5 sm:mx-auto h-[300vh] overflow-visible p-5 flex flex-col items-center max-w-screen-md"
    >
      <motion.div
        style={{ top: imgTop }}
        className="sticky overflow-x-hidden flex gap-3"
      >
        <motion.div
          className="event_images_container flex flex-col justify-center items-center w-full h-full text-gray-50 animate-pulse"
          style={{ x }}
        >
          <h3 className="text-3xl uppercase">Event</h3>
          <p className="text-6xl font-bold">{index + 1}</p>
        </motion.div>
        <motion.div className="event_images_container" style={{ x }}>
          <Image
            height={300}
            width={400}
            className="relative top-5 w-full"
            src={eventDetails.eventImg}
            alt="event 1"
          />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="text-white sticky top-[18rem]"
      >
        <h2 className=" px-3 py-2 bg-accent2 font-semibold text-xl mb-2">
          {eventDetails.eventName}{" "}
        </h2>
        {/* <span className="text-base font-medium">{eventDetails.slogan}</span> */}
        <p className="text-base md:text-lg border-l-4 pl-3 border-accent2">
          {eventDetails.eventDesc}
        </p>
      </motion.div>
    </motion.div>
  );
};

function VerticalTab({ data }) {
  const [activeTabId, setActiveTabId] = useState(0);
  function btnClick(id) {
    setActiveTabId(id);
  }

  return (
    <motion.section className="pt-16  overflow-visible">
      <div className="flex items-center flex-col mb-16 h-[20vh] justify-center">
        <h2 className="text-lg text-accent2 uppercase font-bold">Events</h2>
        <h4 className="text-xl font-semibold text-gray-100">
          Explore All Events Taking Place
        </h4>
      </div>
      {data.map((el, i) => {
        return <Box key={i} eventDetails={el.event} index={i} />;
      })}
    </motion.section>
  );
}

export default VerticalTab;
