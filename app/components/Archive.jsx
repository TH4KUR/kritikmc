import React from "react";
import Arrow from "./icons/Arrow";

const Archive = () => {
  return (
    <section className="bg-bg flex flex-col items-center py-6 px-1 text-black">
      <h1 className=" text-accent uppercase font-bold text-xl">Archive</h1>
      <h3 className="text-lg font-semibold mb-7">
        {" "}
        Discover previous editions of kriti
        <span className="text-accent">.</span>
      </h3>
      <div className="bg-[url('/archive.png')] flex items-center justify-center w-5/12 min-h-[20vh] bg-cover p-">
        <button className="bg-accent px-4 py-2 rounded-lg text-white font-semibold text-xs flex justify-center items-center gap-1">
          Archive <Arrow color={"#eee"} size={12} />
        </button>
      </div>
    </section>
  );
};

export default Archive;
