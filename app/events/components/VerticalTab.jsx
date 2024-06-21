import React, { useState } from "react";
import VTlist from "./VTlist";
import VTcontent from "./VTcontent";
import "./VTStyles.css";

function VerticalTab(props) {
  const [activeTabId, setActiveTabId] = useState(0);

  function btnClick(id) {
    setActiveTabId(id);
  }

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
        <div>
          {props.data.map((job, index) => (
            <VTcontent
              data={job}
              key={index}
              index={index}
              activeTabId={activeTabId}
            />
          ))}
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
