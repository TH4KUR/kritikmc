"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const DesktopHero = () => {
  return (
    <>
      <div className="absolute h-full w-full bg-[url('/desktop_hero.webp')] bg-cover filter brightness-[0.55] md:block hidden"></div>
      <div className="relative md:flex flex-col h-full justify-center px-10  lg:w-2/3 md:w-5/6 hidden">
        <motion.div
          initial={{
            opacity: 0,
            x: -200,
          }}
          whileInView={{
            opacity: 1,
            x: -40,
            transition: {
              duration: 0.5,
              bounce: 0,
            },
          }}
          viewport={{ once: true }}
          className="hero_container absolute h-full w-full bg-black/40"
        ></motion.div>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
              bounce: 0,
            },
          }}
          viewport={{ once: true }}
          className="hidden md:block md:text-3xl lg:text-4xl text-gray-50 font-bold z-10 xl:w-9/12 mb-3"
        >
          The most awaited medical conference of the year is back!
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 1,
              duration: 0.5,
              bounce: 0,
            },
          }}
          viewport={{ once: true }}
          className="lg:text-lg md:text-base font-medium text-gray-200 w-[50ch] z-10 mb-7 "
        >
          Join us at Kakatiya Medical College for the year&apos;s top medical
          conference! Connect with experts, explore innovations, and shape the
          future of healthcare.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            zIndex: 10,
            transition: {
              delay: 1.5,
              duration: 0.5,
              bounce: 0,
            },
          }}
          viewport={{ once: true }}
          className="flex justify-end md:justify-normal gap-3 mr-4 mb-4 -translate-y-3 md:translate-y-0"
        >
          <Link
            href={"/registration"}
            className="bg-accent hover:scale-105 transition-all px-4 py-2 grid place-items-center hover focus:ring focus:ring-[#e3616c] rounded-lg text-white font-semibold text-sm lg:text-lg"
          >
            Register Now!
          </Link>
          <Link
            href={"/events"}
            className="border-2 border-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#111] hover:scale-110 hover:text-white focus:outline-none focus:ring focus:ring-slate-600 transition-all md:border-white md:text-white md:hover:bg-[#ddd] md:hover:text-black lg:text-lg"
          >
            Events
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default DesktopHero;
