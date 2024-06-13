import React from "react";

const SpeakerCard = ({ type }) => {
  if (type === "guest") {
    return (
      <div className="grid grid-cols-12 mt-8">
        <div className="bg-[url('/speaker2.jpg')] bg-cover col-span-4 rounded-l-lg saturate-50">
          {/* <img
          className="rounded-l-lg bg-cover"
          src="/speaker1.jpg"
          alt="Speaker 1"
        /> */}
        </div>
        <div className=" bg-[#F1F5DA] col-span-8 rounded-r-lg px-3 py-4">
          <h3 className="font-bold text-lg">Dr. Sumirta Mahajan</h3>
          <h4 className=" text-xs text-[#327D18] font-semibold">
            Guest Speaker
          </h4>
          <p className="mt-3 text-[0.75rem] leading-4 font-medium">
            Introducing Dr. Sumitra Mahajan, a luminary in South Indian
            medicine, blending traditional wisdom with modern innovation. With
            over two decades of experience and a degree from Madras Medical
            College, Dr. Subramanian is renowned for his expertise in Ayurveda
            and holistic healthcare.{" "}
          </p>
        </div>
      </div>
    );
  } else if (type === "chief") {
    return (
      <div className="grid grid-cols-12 mt-8">
        <div className="bg-[url('/speaker1.jpg')] bg-cover col-span-4 rounded-l-lg saturate-50">
          {/* <img
      className="rounded-l-lg bg-cover"
      src="/speaker1.jpg"
      alt="Speaker 1"
    /> */}
        </div>
        <div className=" bg-[#F4E3D4] col-span-8 rounded-r-lg px-3 py-3">
          <h3 className="font-bold text-lg">Dr. Vikram Subraman</h3>
          <h4 className=" text-xs text-red-800 font-semibold">Chief Guest</h4>
          <p className="mt-3 text-[0.75rem] leading-4 font-medium">
            Introducing Dr. Vikram Subramanian, a luminary in South Indian
            medicine, blending traditional wisdom with modern innovation. With
            over two decades of experience and a degree from Madras Medical
            College, Dr. Subramanian is renowned for his expertise in Ayurveda
            and holistic healthcare.{" "}
          </p>
        </div>
      </div>
    );
  }
};

export default SpeakerCard;
