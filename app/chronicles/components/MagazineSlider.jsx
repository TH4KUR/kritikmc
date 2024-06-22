/* eslint-disable @next/next/no-img-element */
"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <>
      <div className="flex items-center gap-3 bg-bg">
        <button className="embla__prev relative z-[100]" onClick={scrollPrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM152.49,96.49,121,128l31.52,31.51a12,12,0,0,1-17,17l-40-40a12,12,0,0,1,0-17l40-40a12,12,0,0,1,17,17Z"></path>
          </svg>
        </button>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <button
              className="embla__slide"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <img className="rounded-xl" src="/v1.webp" alt="magazine cover" />
              <span className="mt-3 font-semibold">Issue 1</span>
              <span className="text-xs">July 2023</span>
            </button>
            <button
              className="embla__slide"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <img className="rounded-xl" src="/v2.webp" alt="magazine cover" />
              <span className="mt-3 font-semibold">Issue 2</span>
              <span className="text-xs">November 2023</span>
            </button>
            <button
              className="embla__slide"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <img className="rounded-xl" src="/v3.webp" alt="magazine cover" />
              <span className="mt-3 font-semibold">Issue 3</span>
              <span className="text-xs">May 2024</span>
            </button>
          </div>
        </div>
        <button className="embla__next relative z-[100]" onClick={scrollNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm32.49-92.49a12,12,0,0,1,0,17l-40,40a12,12,0,0,1-17-17L135,128,103.51,96.49a12,12,0,0,1,17-17Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}

const MagazineSlider = () => {
  return (
    <section className="flex flex-col items-center py-8 px-2 font-medium bg-bg">
      <h1 className=" text-accent font-semibold">
        All Volumes issued to date.
      </h1>
      <p className="text-sm">Click on a coverPage to read</p>
      <EmblaCarousel />
    </section>
  );
};

export default MagazineSlider;
