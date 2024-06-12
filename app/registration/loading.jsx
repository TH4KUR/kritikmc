import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen text-white bg-bgSecondary justify-center items-center text-7xl font-semibold">
      <p className="relative animate-pulse">
        kriti<span className=" text-accent2">.</span>
        {/* <span className="animate-ping absolute top-0 left-0">kriti</span> */}
      </p>
    </div>
  );
};

export default Loading;
