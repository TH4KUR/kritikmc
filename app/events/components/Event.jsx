/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
function clickHandler(e) {}
const Event = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [previousTab, setPreviousTab] = useState(1);
  const [fadeTabIn, setFadeTabIn] = useState(2);
  const [fadeTabOut, setFadeTabOut] = useState(2);

  return (
    <div className="grid grid-cols-12 py-10 bg-[#090909] h-[75vh]">
      <div className=" col-span-2">
        <ul className="">
          {[1, 2, 3, 4, 5].map((el, i) => {
            return (
              <li key={i} className="flex justify-end">
                <button
                  data-tabbuttonnumber={el}
                  onClick={(e) => {
                    const tabNum = Number(e.target.dataset.tabbuttonnumber);
                    setCurrentTab(tabNum);
                    if (previousTab > currentTab) {
                    } else if (previousTab < currentTab) {
                    }
                    console.log(previousTab);
                    setPreviousTab(tabNum);
                  }}
                  className={
                    previousTab === el
                      ? `event-tabs-button bg-[#16040F!important] text-[#FC6D6D!important]`
                      : "event-tabs-button"
                  }
                >
                  {el}.
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative col-span-9">
        {[1, 2, 3, 4, 5].map((el, i) => {
          return (
            <div
              key={i}
              data-tabnumber={el}
              className={`absolute top-0 left-0 w-full z-[3] bg-[#16040F] text-gray-50 rounded-md `}
            >
              <img src="/event1.webp" alt="event 1" />
              <div className="px-4 py-5">
                <h3 className="event-name relative z-10 text-lg text-[#FC6D6D] font-semibold text-center">
                  Paper and Poster Presentation
                </h3>
                <p className=" text-sm mt-4">
                  Submission Process: Abstracts are to be submitted, either
                  individually or as a pair (author and co-author). Following
                  the screening process:
                  <br />
                  <br />
                  {">"} Podium presentation
                  <br />
                  {">"} Poster Presentation
                  <br />
                  <br />
                  Abstracts not selected for podium presentation will be given
                  the opportunity to present posters. This includes case
                  reports, research not chosen for podium presentation, and
                  topics of significance.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Event;
