/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla mt-9" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide rounded-xl overflow-hidden">
          <img src="/v1.webp" alt="magazine cover" />
        </div>
        <div className="embla__slide rounded-xl overflow-hidden ">
          <img src="/v2.webp" alt="magazine cover" />
        </div>
        <div className="embla__slide rounded-xl overflow-hidden ">
          <img src="/v3.webp" alt="magazine cover" />
        </div>
      </div>
    </div>
  );
}

const MagazineSlider = () => {
  return (
    <section className="flex flex-col items-center py-8 px-2 font-medium">
      <h1 className=" text-accent font-semibold">
        All Volumes issued to date.
      </h1>
      <p className="text-sm">Click on a coverPage to read</p>
      <EmblaCarousel />
    </section>
  );
};

export default MagazineSlider;
