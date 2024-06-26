"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function EmblaCarousel() {
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
      <div className="flex items-center gap-3 bg-bg">
        <button
          className="embla_imgCarousel__prev relative z-[100]"
          onClick={scrollPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM152.49,96.49,121,128l31.52,31.51a12,12,0,0,1-17,17l-40-40a12,12,0,0,1,0-17l40-40a12,12,0,0,1,17,17Z"></path>
          </svg>
        </button>
        <div className="embla_imgCarousel" ref={emblaRef}>
          <div className="embla_imgCarousel__container">
            <button
              className="embla_imgCarousel__slide"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <img
                className="rounded-xl"
                src="/archive1.png"
                alt="magazine cover"
              />
            </button>
            <button
              className="embla_imgCarousel__slide"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <img
                className="rounded-xl"
                src="/archive2.png"
                alt="magazine cover"
              />
            </button>
            <button
              className="embla_imgCarousel__slide"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <img
                className="rounded-xl"
                src="/archive3.png"
                alt="magazine cover"
              />
            </button>
          </div>
        </div>
        <button
          className="embla_imgCarousel__next relative z-[100]"
          onClick={scrollNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm32.49-92.49a12,12,0,0,1,0,17l-40,40a12,12,0,0,1-17-17L135,128,103.51,96.49a12,12,0,0,1,17-17Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}

const ImageCarousel = () => {
  return (
    <div>
      <EmblaCarousel />
    </div>
  );
};

export default ImageCarousel;
