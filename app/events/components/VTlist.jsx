import React from "react";

import "./VTStyles.css";

function VTlist(props) {
  const Clicked = () => {
    props.onClick(props.index);
  };

  return (
    <li key={props.index} className=" list-none">
      <button
        className="section__Jobs-buttonCompany w-full"
        onClick={Clicked}
        style={(() => {
          if (props.activeTabId === props.index) {
            if (props.index === 0) {
              return { color: "#FC6D6D" };
            } else if (props.index === 1) {
              return { color: "#4EB5FF" };
            } else if (props.index === 2) {
              return { color: "#70FF87" };
            } else if (props.index === 3) {
              return { color: "#FFF170" };
            } else if (props.index === 4) {
              return { color: "#EB70FF" };
            } else if (props.index === 5) {
              return { color: "#FF8F50" };
            }
          } else {
            return {
              color: "#8892b0",
            };
          }
        })()}
      >
        {props.data.expData.company}
      </button>
    </li>
  );
}

export default VTlist;
