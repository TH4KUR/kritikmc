"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import VTlist from "./VTlist";
import "./VTStyles.css";

const Box = ({ wrapper, tabId, setTab }) => {
  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 },
  };

  const { ref, inView, entry } = useInView({
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
      className="snap-center bg-[#16040F] h-[70vh] flex flex-col"
    >
      <div className="">
        <img className="event-img" src="/event1.webp" alt="event 1" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="flex justify-center px-4 py-3 bg-[#370a1e] text-[#FF4E4E] font-semibold -translate-y-6 -rotate-2">
          Paper and poster presentation
        </h3>
        <p className="px-3 text-sm text-gray-100">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
          deleniti amet, obcaecati dolore inventore perferendis sunt! Quaerat
          itaque culpa nesciunt aperiam modi eum consequuntur eius nulla neque
          temporibus! Fugiat, libero!
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
          deserunt expedita reiciendis animi tempore eius, veritatis
        </p>
      </div>
    </motion.div>
  );
};

function VerticalTab(props) {
  const [activeTabId, setActiveTabId] = useState(0);
  function btnClick(id) {
    setActiveTabId(id);
  }
  const wrapperRef = useRef(null);
  return (
    <>
      <div className="flex items-center flex-col my-12">
        <h2 className="text-sm text-accent2 uppercase font-bold">Events</h2>
        <h4 className="text-lg font-semibold text-gray-100">
          Explore All Events Taking Place
        </h4>
      </div>
      <div className="section__Jobs-container">
        <div className="flex gap-2">
          <div>
            <div className="section__Jobs-styledTab">
              <ul className="section__Jobs-styledTabList">
                {props.data.map((job, index) => (
                  <VTlist
                    key={index}
                    onClick={btnClick}
                    data={job}
                    index={index}
                    activeTabId={activeTabId}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div
            ref={wrapperRef}
            className="h-[70vh] snap-y snap-mandatory overflow-y-scroll w-full"
          >
            <Box setTab={setActiveTabId} tabId={0} wrapper={wrapperRef} />
            <Box setTab={setActiveTabId} tabId={1} wrapper={wrapperRef} />
            <Box setTab={setActiveTabId} tabId={2} wrapper={wrapperRef} />
            <Box setTab={setActiveTabId} tabId={3} wrapper={wrapperRef} />
            <Box setTab={setActiveTabId} tabId={4} wrapper={wrapperRef} />
            <Box setTab={setActiveTabId} tabId={5} wrapper={wrapperRef} />
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
