import React from "react";
import TimelineCard from "./TimelineCard";
import Arrow from "./icons/Arrow";
import Link from "next/link";

const Timeline = ({ light = false }) => {
  if (!light) {
    return (
      <section className="bg-[url('/timelinebg.png')] bg-contains bg-origin-border flex flex-col items-center py-20 px-1 text-gray-200">
        <h1 className=" text-[#DA5867] uppercase font-bold text-base">
          Timeline
        </h1>
        <h3 className="text-2xl font-semibold mb-10 text-center">
          Events Timing Breakdown
        </h3>
        <div className="flex flex-col gap-4 w-11/12 mx-auto">
          <div className="flex justify-between mx-auto w-3/4 text-xs font-medium">
            <p>Registration Open</p>
            <span className="before:content-[''] before:absolute  before:w-[50px] before:h-[1px] before:bg-gray-100 relative flex items-center justify-center "></span>
            <p>27 July 20xx</p>
          </div>
          <div className="flex justify-between mx-auto w-3/4 text-xs font-medium">
            <p>Registration Close</p>
            <span className="before:content-[''] before:absolute  before:w-[50px] before:h-[1px] before:bg-gray-100 relative flex items-center justify-center "></span>
            <p>27 Sept 20xx</p>
          </div>
          <Link
            href={"/events-plan"}
            className="flex justify-center gap-1 items-center w-1/2 mx-auto bg-[#cbe896] px-4 py-2 rounded-lg text-[#074802] font-semibold text-sm mt-7 hover:bg-[#d2fc85] hover:w-full hover:scale-105 transition-all focus:outline-none hover:gap-3 focus:ring focus:ring-[#7ea03e] "
          >
            <span>Events Plan</span> <Arrow size={10} color={"#074802"} />
          </Link>
        </div>
        {/* <div className="mt-5 w-full grid grid-cols-2 gap-1">
    {data.map((dat, i) => {
      return <TimelineCard key={i} data={dat} />;
    })}
  </div> */}
      </section>
    );
  } else {
    return (
      <section className="bg-bg flex flex-col items-center py-20 px-1 text-black">
        <h1 className=" text-accent uppercase font-bold text-base">Timeline</h1>
        <h3 className="text-2xl font-semibold mb-10 text-center">
          Events Timing Breakdown
        </h3>
        <div className="flex flex-col gap-4 w-11/12 mx-auto">
          <div className="flex justify-between mx-auto w-3/4 text-xs font-medium">
            <p>Registration Open</p>
            <span className="before:content-[''] before:absolute  before:w-[50px] before:h-[1px] before:bg-black relative flex items-center justify-center "></span>
            <p>27 July 20xx</p>
          </div>
          <div className="flex justify-between mx-auto w-3/4 text-xs font-medium">
            <p>Registration Close</p>
            <span className="before:content-[''] before:absolute  before:w-[50px] before:h-[1px] before:bg-black relative flex items-center justify-center "></span>
            <p>27 Sept 20xx</p>
          </div>
          <Link
            href={"/events-plan"}
            className="flex justify-center gap-1 items-center w-1/2 mx-auto bg-[#cbe896] px-4 py-2 rounded-lg text-[#074802] font-semibold text-sm mt-7 hover:bg-[#d2fc85] hover:w-full hover:scale-105 transition-all focus:outline-none hover:gap-3 focus:ring focus:ring-[#7ea03e] "
          >
            <span>Events Plan</span> <Arrow size={10} color={"#074802"} />
          </Link>
        </div>
        {/* <div className="mt-5 w-full grid grid-cols-2 gap-1">
    {data.map((dat, i) => {
      return <TimelineCard key={i} data={dat} />;
    })}
  </div> */}
      </section>
    );
  }
};

export default Timeline;
