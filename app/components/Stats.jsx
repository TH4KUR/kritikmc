"use client";

import { motion } from "framer-motion";

const Pill = ({ pillNo }) => {
  return (
    <div className="relative">
      <motion.div
        viewport={{ once: true }}
        whileInView={(i) => ({
          rotate: i % 2 === 0 ? [-1, 4, 0] : [1, 4, 0],
          transition: {
            delay: 0.05,
            repeat: 10,
            duration: 0.075,
            staggerChildren: 1,
          },
        })}
        className="grid grid-cols-2"
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
              delay: 0.75,
            },
          }}
          src="/pill2.svg"
          className="child"
          alt="half pill"
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
              delay: 0.75,
            },
          }}
          src="/pill1.svg"
          className="child"
          alt="half pill"
        />
      </motion.div>
      <motion.img
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          translateY: 15,
          transition: {
            delay: 1.25,
          },
        }}
        initial={{ opacity: 0, translateX: 20 }}
        src={`stat${pillNo}.svg`}
        className="absolute top-0 w-24 sm:w-9/12"
      />
    </div>
  );
};

const Stats = () => {
  return (
    <section className="bg-bg flex flex-col items-center py-16 px-1 text-black ">
      <h2 className=" text-accent uppercase font-bold text-base md:text-lg lg:text-lg">
        Stats
      </h2>
      <h3 className="text-2xl font-bold md:text-3xl mb-10">Event Statistics</h3>
      <div className="flex items-center gap-3 max-w-md md:max-w-lg md:gap-10 min-h-32 -translate-x-1">
        <Pill pillNo={1} />
        <Pill pillNo={2} />
        <Pill pillNo={3} />
      </div>
    </section>
  );
};

export default Stats;
