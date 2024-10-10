"use client";
import React from "react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import JudgeCard from "./JudgeCard";

function JudgeCarousel({ judgedata }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 2500 }),
  ]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <>
      <div className="flex items-center gap-3">
        <button
          className="embla_imgCarousel__prev relative z-[100] hidden lg:block opacity-35"
          onClick={scrollPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#899ff7"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM152.49,96.49,121,128l31.52,31.51a12,12,0,0,1-17,17l-40-40a12,12,0,0,1,0-17l40-40a12,12,0,0,1,17,17Z"></path>
          </svg>
        </button>
        <div className="speakers_carousel" ref={emblaRef}>
          <div className="flex">
            {judgedata.map((el, i) => {
              return (
                <button
                  key={i}
                  className={`speakers_slide ${judgedata.length > 1 ? "" : "translate-x-[15%]"}`}
                >
                  <JudgeCard data={el} />
                </button>
              );
            })}
          </div>
        </div>
        <button
          className="embla_imgCarousel__next relative z-[100] hidden lg:block opacity-35"
          onClick={scrollNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#899ff7"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm32.49-92.49a12,12,0,0,1,0,17l-40,40a12,12,0,0,1-17-17L135,128,103.51,96.49a12,12,0,0,1,17-17Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}

export default JudgeCarousel;
