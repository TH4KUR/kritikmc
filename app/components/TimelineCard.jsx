import React from "react";
import Bullet from "./Bullet";

const TimelineCard = ({ data }) => {
  return (
    <div className="font-semibold bg-bgSecondary rounded-lg mt-3 mx-2 px-6 py-8 text-bg">
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




         */}
      <div className="flex justify-between mb-7">
        <h4 className="text-bg uppercase underline underline-offset-4 text-3xl">
          {data.day}
        </h4>
        <h5 className="text-[#D5EAF9] text-lg">{data.date}</h5>
      </div>
      <div className="">
        <ul className=" text-sm">
          {data.schedule.map((el, i) => {
            return (
              <li key={i} className="mt-4">
                {el.time}
                <br />
                {el.events.map((eventName, j) => {
                  return (
                    <p
                      key={j}
                      className="ml-3 text-gray-100 flex items-center gap-2"
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
