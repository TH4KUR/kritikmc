import React from "react";
import { myClient } from "@/sanity";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(myClient);
function retrieveImageUrl(source) {
  return builder.image(source);
}
const SpeakerCard = ({ data }) => {
  if (data.speakertype === "Chief Guest") {
    return (
      <div className="grid grid-cols-12 mt-8">
        <div
          style={{ "--image-url": `url(${retrieveImageUrl(data.speakerimg)})` }}
          className="bg-[image:var(--image-url)] bg-cover col-span-4 rounded-l-lg saturate-50"
        >
          {/* <img
      className="rounded-l-lg bg-cover"
      src="/speaker1.jpg"
      alt="Speaker 1"
    /> */}
        </div>
        <div className=" bg-[#F4E3D4] col-span-8 rounded-r-lg px-3 py-3">
          <h3 className="font-bold text-lg">{data.speakername}</h3>
          <h4 className=" text-xs text-red-800 font-semibold">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-[0.75rem] leading-4 font-medium">
            {data.speakerdesc}
          </p>
        </div>
      </div>
    );
  } else if (data.speakertype === "Guest Speaker") {
    return (
      <div className="grid grid-cols-12 mt-8">
        <div
          style={{ "--image-url": `url(${retrieveImageUrl(data.speakerimg)})` }}
          className="bg-[image:var(--image-url)] bg-cover col-span-4 rounded-l-lg saturate-50"
        >
          {/* <img
          className="rounded-l-lg bg-cover"
          src="/speaker1.jpg"
          alt="Speaker 1"
        /> */}
        </div>
        <div className=" bg-[#F1F5DA] col-span-8 rounded-r-lg px-3 py-4">
          <h3 className="font-bold text-lg">{data.speakername}</h3>
          <h4 className=" text-xs text-[#327D18] font-semibold">
            {data.speakertype}
          </h4>
          <p className="mt-3 text-[0.75rem] leading-4 font-medium">
            {data.speakerdesc}
          </p>
        </div>
      </div>
    );
  }
};

export default SpeakerCard;
