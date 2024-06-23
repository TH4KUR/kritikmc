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
      className="snap-center bg-[#16040F] h-[70vh] flex flex-col gap-10"
    >
      <div className="">
        <img className="event-img" src="/event1.webp" alt="event 1" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="flex justify-center event-name text-[#FF4E4E] font-semibold">
          Paper and poster presentation
        </h2>
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
  );
}

export default VerticalTab;
