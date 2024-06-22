import React from "react";
import Bullet from "./icons/Bullet";
import { Cutive } from "next/font/google";
const cutive = Cutive({
  subsets: ["latin"],
  weight: ["400"],
});

const TimelineCard = ({ data }) => {
  return (
    <div className="font-medium rounded-lg text-bg">
      {/* 
      data {day: 'Day 1', 
            date: '27 July 20xx'
         schedule:   [{time: '9:30am - 12:00pm', events:['Podium and Paper presentation']},
                      {time: '9:00am - 12:00pm', events:['Poster presentation','Working Lunch']},
                      {time: '1:30pm - 3:00pm', events:['Debate']},
                      {time: '3:30pm - 4:15pm', events:['Guest lecture']},
                      {time: '4:45pm - 6:15pm', events:['HACKATHON']},
            ]}
      data {day: 'Day 2', 
            date: '28 July 20xx'
            schedule: [{time: '9:30am - 10:30am', events:['Guest lecture']},
                      {time: '11:00am - 12:30pm', events:['Inauguration Working Lunch']},
                      {time: '1:15pm - 4:00pm', events:['Jeopardy']},
                      {time: '4:30pm - 6:00pm', events:['Symposium']},
                      {time: '6:30pm - 8:00pm', events:['Prize Distribution']},
            ]}



cutive.className + 
 + 
         */}
      <div className="bg-[#b732770f] border-y-2 border-accent border-opacity-30 flex justify-between items-center py-3 px-4">
        <h4 className="text-black uppercase underline underline-offset-4 text-lg font-bold ">
          {data.day}
        </h4>
        <h5 className="text-black text-sm ">{data.date}</h5>
      </div>
      <div className="relative before:absolute before:bg-[url('/papertexture.jpg')] before:h-full before:w-full before:block before:z-[-1] before:opacity-60 before:bg-cover before:left-0 before:top-0 px-4 py-8">
        <ul className={cutive.className + " text-xs"}>
          {data.schedule.map((el, i) => {
            return (
              <li key={i} className="mt-4 font-bold text-gray-800">
                {el.time}
                <br />
                {el.events.map((eventName, j) => {
                  return (
                    <p
                      key={j}
                      className="ml-3 text-black flex items-center gap-2 font-normal"
                    >
                      <Bullet />
                      {eventName}
                    </p>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TimelineCard;
