"use client";
import React from "react";
import { motion } from "framer-motion";

const Pill = ({ pillNo }) => {
  return (
    <motion.div
      viewport={{ once: true }}
      whileInView={(i) => ({
        rotate: i % 2 === 0 ? [-1, 4, 0] : [1, 4, 0],
        transition: {
          delay: 0.05,
          repeat: 10,
          duration: 0.1,
          staggerChildren: 1,
        },
      })}
      className="grid grid-cols-2 p-5 relative"
    >
      <motion.img
        viewport={{ once: true }}
        whileInView={{
          x: [0, -6],
          y: [0, 10, -25],
          scale: [1.1, 0.5],
          rotate: 10,
          transition: {
            duration: 0.75,
            delay: 1.5,
          },
        }}
        src="/pill2.svg"
        className="child"
        alt="half pill"
      />
      <motion.img
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          translateY: 15,
          transition: {
            delay: 2,
            // duration: 0.5,
          },
        }}
        initial={{ opacity: 0, translateX: 20 }}
        src={`stat${pillNo}.svg`}
        className="absolute top-0"
        height={95}
        width={95}
      />
      <motion.img
        viewport={{ once: true }}
        whileInView={{
          x: [0, 10, 18],
          y: [0, 10, -25],
          scale: [1.1, 0.5],

          rotate: -10,
          transition: {
            duration: 0.75,
            delay: 1.5,
          },
        }}
        src="/pill1.svg"
        className="child"
        alt="half pill"
      />
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="bg-bg flex flex-col items-center py-14 px-1 text-black">
      <h1 className=" text-accent uppercase font-bold text-base">Stats</h1>
      <h3 className="text-2xl font-bold mb-10"> Event statistics.</h3>
      <div className="grid grid-cols-3 items-center gap-3">
        <Pill pillNo={1} />
        <Pill pillNo={2} />
        <Pill pillNo={3} />
      </div>
    </section>
  );
};

export default Stats;
