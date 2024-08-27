"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import ThumbsUp from "./icons/ThumbsUp";

export default function TestimonialsCarousel({ data }) {
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
          className="embla_imgCarousel__prev relative z-[100] hidden sm:block hover:bg-black/75 transition hover:fill-gray-50 p-1 rounded-full fill-black "
          onClick={scrollPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM152.49,96.49,121,128l31.52,31.51a12,12,0,0,1-17,17l-40-40a12,12,0,0,1,0-17l40-40a12,12,0,0,1,17,17Z"></path>
          </svg>
        </button>
        <div className="embla_imgCarousel" ref={emblaRef}>
          <div className="embla_imgCarousel__container">
            {data.map(({ studentName, collegeName, testimonialText }, i) => {
              return (
                <div className="embla__slide-testimonials " key={i}>
                  <div className="group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500  w-full mx-auto hover:border-indigo-600 hover:shadow-sm slide_active:border-indigo-600">
                    <div className="">
                      <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500  ">
                        <ThumbsUp className={" fill-amber-500 size-8"} />
                      </div>
                      <p className="text-base text-gray-600 leading-6  transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800">
                        {testimonialText}
                      </p>
                    </div>
                    <div className="flex items-center gap-5 border-t border-solid border-gray-200 pt-5">
                      <Image
                        className="rounded-full h-10 w-10"
                        width={40}
                        height={40}
                        src="/default_user.jpg"
                        alt="avatar"
                      />
                      <div className="block">
                        <h5 className="text-gray-900 font-medium transition-all duration-500  mb-1">
                          {studentName}
                        </h5>
                        <span className="text-sm leading-4 text-gray-500">
                          {collegeName}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="embla_imgCarousel__next relative z-[100] hidden sm:block hover:bg-black/75 transition hover:fill-gray-50 p-1 rounded-full fill-black "
          onClick={scrollNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm32.49-92.49a12,12,0,0,1,0,17l-40,40a12,12,0,0,1-17-17L135,128,103.51,96.49a12,12,0,0,1,17-17Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
