"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import Arrow from "@/app/components/icons/Arrow";

const Box = async ({ eventDetails, index }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [0.8, 1, 1, 0]
  );
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  const imgX = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "-100%"]);
  const imgTop = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 1],
    ["0vh", "30vh", "1vh", "0vh"]
  );

  const textOpacity = useTransform(scrollYProgress, [0.4, 0.45], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.4, 0.45], [0.7, 1]);
  return (
    <motion.div
      style={{ scale: containerScale, opacity: containerOpacity }}
      ref={targetRef}
      className="sm:w-3/5 sm:mx-auto h-[300vh] overflow-visible p-5 flex flex-col items-center max-w-screen-md relative"
    >
      <motion.div
        style={{ top: imgTop }}
        className="sticky overflow-x-hidden flex gap-1  "
      >
        <motion.div
          className="event_images_container flex flex-col justify-center items-center w-full h-full text-gray-50 animate-pulse"
          style={{ x: imgX }}
        >
          <h3 className="text-3xl uppercase">Event</h3>
          <p className="text-6xl font-bold">{index + 1}</p>
        </motion.div>
        <motion.div className="event_images_container" style={{ x: imgX }}>
          <Image
            height={300}
            width={400}
            className="relative top-5 w-full"
            src={urlForImage(eventDetails?.eventImg)}
            alt="event 1"
          />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="text-white bg-[#090909] sticky top-[18rem] lg:top-[30rem] flex flex-col gap-10"
      >
        <div className="">
          <h2 className=" px-3 py-2 bg-accent2 font-semibold text-xl mb-2">
            {eventDetails?.eventName}{" "}
          </h2>
          {/* <span className="text-base font-medium">{eventDetails?.slogan}</span> */}
          <p className="text-base md:text-lg border-l-4 pl-3 border-accent2">
            {eventDetails?.eventDesc}
          </p>
          <Link
            href={`/events/${eventDetails?.eventName.toLowerCase().replaceAll(" ", "-")}`}
            className="px-4 py-2 bg-accent mt-5 font-medium inline-flex rounded hover:scale-105 hover:brightness-110 transition-all focus:outline-none focus:ring-4 focus:ring-accent2/40"
          >
            {eventDetails.eventName.toLowerCase() != "amboss workshop"
              ? "Prizes & Rules"
              : "More information"}{" "}
            <Arrow size={20} color={"#fff"} />{" "}
          </Link>
          <ul className="mt-5 py-3 px-4 bg-accent2/5">
            <li>Event Coordinator: {eventDetails?.eventCoordinator}</li>
            <li>Contact info: +91 {eventDetails?.eventCoordinatorContact}</li>
            {eventDetails?.eventName === "Marrow's Jeopardy" ? (
              <>
                <li className="mt-2">Event Coordinator 2: Dr. B Roshni</li>
                <li>Contact info: +91 9515681977</li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="flex flex-col items-center self-center pb-10 relative after:w-20 after:h-1 after:bg-accent2/50 after:absolute after:bottom-0">
          <motion.p
            whileInView={() => {
              window.history.pushState(
                {},
                "Title",
                `/events#${eventDetails?.eventName}-${index + 1}`
              );
            }}
          >
            {eventDetails?.eventName} - {eventDetails?.eventSlogan}
          </motion.p>
        </div>
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
        return <Box key={i} eventDetails={el} index={i} />;
      })}
    </motion.section>
  );
}

export default VerticalTab;
