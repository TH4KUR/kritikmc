"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VTlist from "./VTlist";
import "./VTStyles.css";
import Image from "next/image";

const Box = ({ eventDetails }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [0.8, 1, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  return (
    <motion.div
      style={{ scale, opacity }}
      ref={targetRef}
      className="sm:w-3/5 sm:mx-auto h-[250vh] overflow-visible p-5"
    >
      <div className="sticky top-0">
        <Image
          height={300}
          width={400}
          className="event-img  max-h-80"
          src={eventDetails.eventImg}
          alt="event 1"
        />
      </div>
      <div className="text-white sticky top-80">
        <h2>Event Name</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          repudiandae numquam assumenda atque quas error corrupti dolorum in
          provident, officia culpa fuga voluptate odit! Aut odit quas sunt
          placeat eaque.
        </p>
      </div>
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
        return <Box key={i} eventDetails={el.event} />;
      })}
    </motion.section>
  );
}

export default VerticalTab;
