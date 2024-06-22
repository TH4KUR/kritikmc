"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import VTlist from "./VTlist";
import "./VTStyles.css";
const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

// const [ref, inView] = useInView();

// useEffect(() => {
//   if (inView) {
//     control.start("visible");
//   } else {
//     control.start("hidden");
//   }
// }, [control, inView]);

const Box = ({ wrapper, tabId, setTab }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
    root: wrapper.current,
  });
  useEffect(() => {
    if (inView === true) {
      setTab(tabId);
    }
  }, [inView]);
  return (
    <div
      ref={ref}
      className="snap-center bg-red-500 h-[50vh] grid place-items-center"
    >
      VerticalTab {inView ? "yup" : "nope"}
    </div>
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
          className="h-[50vh] snap-y snap-mandatory overflow-y-scroll w-full"
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
