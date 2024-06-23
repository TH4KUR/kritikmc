import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen text-white bg-bgSecondary justify-center items-center text-7xl font-semibold">
      <div className="relative animate-pulse flex flex-col -translate-y-8">
        <span className="w-full text-center text-lg mb-2 -translate-x-2">
          welcome to
        </span>
        <p>
          kriti<span className=" text-accent2">.</span>
        </p>
        {/* <span className="animate-ping absolute top-0 left-0">kriti</span> */}
      </div>
    </div>
  );
};

export default Loading;
