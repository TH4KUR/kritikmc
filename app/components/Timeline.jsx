import React from "react";
import TimelineCard from "./TimelineCard";
import Arrow from "./icons/Arrow";

const Timeline = () => {
  let data = [
    {
      day: "Day 1",
      date: "27 July 20xx",
      schedule: [
        { time: "9:30am - 12:00pm", events: ["Podium and Paper presentation"] },
        {
          time: "9:00am - 12:00pm",
          events: ["Poster presentation", "Working Lunch"],
        },
        { time: "1:30pm - 3:00pm", events: ["Debate"] },
        { time: "3:30pm - 4:15pm", events: ["Guest lecture"] },
        { time: "4:45pm - 6:15pm", events: ["HACKATHON"] },
      ],
    },
    {
      day: "Day 2",
      date: "28 July 20xx",
      schedule: [
        { time: "9:30am - 10:30am", events: ["Guest lecture"] },
        { time: "11:00am - 12:30pm", events: ["Inauguration Working Lunch"] },
        { time: "1:15pm - 4:00pm", events: ["Jeopardy"] },
        { time: "4:30pm - 6:00pm", events: ["Symposium"] },
        { time: "6:30pm - 8:00pm", events: ["Prize Distribution"] },
      ],
    },
  ];
  return (
    <section className="bg-bgSecondary flex flex-col items-center py-6 px-1 text-gray-200">
      <h1 className=" text-[#DA5867] uppercase font-bold text-base">
        Timeline
      </h1>
      <h3 className="text-2xl font-bold mb-7 text-center">
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
        <button className="flex justify-center items-center w-1/2 mx-auto bg-[#cbe896] px-4 py-2 rounded-lg text-[#074802] font-semibold text-xs">
          Events Plan <Arrow size={10} color={"#074802"} />
        </button>
      </div>
      {/* <div className="mt-5 w-full grid grid-cols-2 gap-1">
        {data.map((dat, i) => {
          return <TimelineCard key={i} data={dat} />;
        })}
      </div> */}
    </section>
  );
};

export default Timeline;
