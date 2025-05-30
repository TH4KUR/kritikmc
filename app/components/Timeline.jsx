import getResgistrationDates from "../lib/getRegistrationDates";
import Arrow from "./icons/Arrow";
import Link from "next/link";

const Timeline = async ({ light = false }) => {
  const { registrationStart, registrationEnd } = await getResgistrationDates();
  if (!light) {
    return (
      <section className="bg-[url('/timelinebg.png')] bg-contains bg-origin-border flex flex-col items-center py-20 px-1 text-gray-200">
        <h2 className=" text-[#DA5867] uppercase font-bold text-base md:text-lg mt-5">
          Timeline
        </h2>
        <h3 className="text-gray-100 text-2xl font-semibold md:text-3xl">
          Events Timing Breakdown
        </h3>
        <div className="flex flex-col gap-4 w-11/12 mx-auto max-w-3xl mt-10 text-gray-200">
          <div className="flex justify-between mx-auto w-3/4 text-sm md:text-base  lg:text-lg font-medium">
            <p>Registration Open</p>
            <span className="before:content-[''] before:absolute  before:w-[30px] md:before:w-[100px] before:h-[1px] md:before:h-[2px] before:bg-gray-100 relative flex items-center justify-center "></span>
            <p>
              {new Date(registrationStart).toLocaleString("default", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-between mx-auto w-3/4 text-sm md:text-base lg:text-lg font-medium">
            <p>Registration Close</p>
            <span className="before:content-[''] before:absolute  before:w-[20px] md:before:w-[100px] before:h-[1px] md:before:h-[2px] before:bg-gray-100 relative flex items-center justify-center "></span>
            <p>
              {new Date(registrationEnd).toLocaleString("default", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <Link
            href={"/events-itinerary"}
            className="flex justify-center gap-1 items-center w-1/2 mx-auto bg-[#cbe896] px-4 py-2 rounded-lg text-[#074802] font-semibold text-base md:text-base mt-10 hover:bg-[#d2fc85] hover:w-full hover:scale-105 transition-all focus:outline-none hover:gap-3 focus:ring focus:ring-[#7ea03e] "
          >
            <span>Events itinerary</span> <Arrow size={10} color={"#074802"} />
          </Link>
        </div>
      </section>
    );
  } else {
    return (
      <section className="bg-bg flex flex-col items-center py-20 px-1 text-black">
        <h2 className=" text-accent2 uppercase font-bold text-base md:text-lg mt-5">
          Timeline
        </h2>
        <h3 className="text-black text-2xl font-semibold md:text-3xl">
          Events Timing Breakdown
        </h3>
        <div className="flex flex-col gap-4 w-11/12 mx-auto max-w-3xl mt-10">
          <div className="flex justify-between mx-auto w-3/4 text-sm md:text-base  lg:text-lg font-medium">
            <p>Registration Open</p>
            <span className="before:content-[''] before:absolute  before:w-[50px] md:before:w-[100px] md:before:h-[2px] before:bg-black before:h-[1px] relative flex items-center justify-center "></span>
            <p>
              {new Date(registrationStart).toLocaleString("default", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-between mx-auto w-3/4 text-sm md:text-base lg:text-lg font-medium">
            <p>Registration Close</p>
            <span className="before:content-[''] before:absolute  before:w-[50px] md:before:w-[100px] md:before:h-[2px] before:bg-black before:h-[1px] relative flex items-center justify-center "></span>
            <p>
              {new Date(registrationEnd).toLocaleString("default", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <Link
            href={"/events-itinerary"}
            className="flex justify-center gap-1 items-center w-1/2 mx-auto bg-[#cbe896] px-4 py-2 rounded-lg text-[#074802] font-semibold text-base md:text-base mt-10 hover:bg-[#d2fc85] hover:w-full hover:scale-105 transition-all focus:outline-none hover:gap-3 focus:ring focus:ring-[#7ea03e] "
          >
            <span>Events itinerary</span> <Arrow size={10} color={"#074802"} />
          </Link>
        </div>
      </section>
    );
  }
};

export default Timeline;
