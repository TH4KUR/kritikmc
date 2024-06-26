"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import VTlist from "./VTlist";
import "./VTStyles.css";

const Box = ({ wrapper, tabId, setTab, eventDetails }) => {
  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 },
  };

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.5,
    root: wrapper.current,
  });
  const control = useAnimation();
  useEffect(() => {
    if (inView) {
      control.start("visible");
      setTab(tabId);
    } else {
      control.start("hidden");
    }
  }, [inView]);
  return (
    <motion.div
      animate={control}
      variants={boxVariant}
      ref={ref}
      className="snap-center snap-always bg-[#16040F] flex flex-col justify-start"
    >
      <div className="w-full object-cover">
        <img className="event-img" src={eventDetails.eventImg} alt="event 1" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="flex justify-center px-4 py-3 bg-[#370a1e] text-[#FF4E4E] font-semibold -translate-y-6 -rotate-2">
          {eventDetails.eventName}
        </h3>
        <p className="p-3 text-gray-100">{eventDetails.eventDesc}</p>
        <p className="p-3 bg-orange-300/10 text-sm text-gray-100">
          {eventDetails.slogan}
        </p>
        <div className="text-gray-200 text-base *:text-start w-full px-5 py-2">
          <p>Event Coordinator: John Doe</p>
          <p className="">
            Contact:{" "}
            <a className="underline" href="tel:+91XXXXXXXX">
              +91 XXXXXXXX
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

function VerticalTab({ data }) {
  const [activeTabId, setActiveTabId] = useState(0);
  function btnClick(id) {
    setActiveTabId(id);
  }
  const wrapperRef = useRef(null);
  return (
    <>
      <div className="flex items-center flex-col mt-16 mb-8">
        <h2 className="text-sm text-accent2 uppercase font-bold">Events</h2>
        <h4 className="text-lg font-semibold text-gray-100">
          Explore All Events Taking Place
        </h4>
      </div>
      <div className="section__Jobs-container  sm:w-4/5 sm:mx-auto">
        <div className=" h-[80svh] sm:h-[60svh] flex gap-2">
          <div className="">
            <div className="section__Jobs-styledTab">
              <ul className="section__Jobs-styledTabList">
                {data.map((el, i) => (
                  <VTlist
                    key={i}
                    onClick={btnClick}
                    index={i}
                    activeTabId={activeTabId}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div
            ref={wrapperRef}
            className="snap-y snap-mandatory overflow-y-scroll w-full"
          >
            {data.map(({ event }, i) => {
              return (
                <Box
                  key={i}
                  setTab={setActiveTabId}
                  tabId={i}
                  wrapper={wrapperRef}
                  eventDetails={event}
                />
              );
            })}
          </div>
        </div>
        <span
          className={(() => {
            let clas = "";
            if (activeTabId === 0) {
              clas += "index1-chosen";
            } else if (activeTabId === 1) {
              clas += "index2-chosen";
            } else if (activeTabId === 2) {
              clas += "index3-chosen";
            } else if (activeTabId === 3) {
              clas += "index4-chosen";
            } else if (activeTabId === 4) {
              clas += "index5-chosen";
            } else if (activeTabId === 5) {
              clas += "index6-chosen";
            }
            return clas;
          })()}
        >
          &nbsp;
        </span>
      </div>
    </>
  );
}

export default VerticalTab;
