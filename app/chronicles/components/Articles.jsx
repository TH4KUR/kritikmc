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
      <div className="flex items-center gap-3">
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
              className="embla__slide-2"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <div className="rounded bg-bgSecondary text-white overflow-hidden w-full min-h-[14rem] grid grid-rows-5">
                <div className="article-img bg-[url('https://media.canva.com/v2/image-resize/format:JPG/height:197/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2Fqz128%2FMAGDZtqz128%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAAyvHdryZKLXdv7BAH8CkJkFTBZuCkdbKYeNx4LY2DM8&exp=1718470989&osig=AAAAAAAAAAAAAAAAAAAAAJ2eaQfO6zNtR5_FstL7tFEkqOvIlmZZ0McjWCgwK03q&signer=media-rpc&x-canva-quality=thumbnail')] row-span-2">
                  {" "}
                  {/* <img src="/speaker1.webp" alt="article" /> */}
                </div>
                <div className="text-start row-span-3 px-1 flex flex-col justify-center">
                  <h2 className="font-semibold px-2 text-emerald-200 text-[0.9rem] mb-1">
                    Beyond the Blood Brain Barrier
                  </h2>
                  <p className="text-xs px-2 mb-2">
                    From Fever to Fatal: HIV+ worker delays care, faces deadly
                    brain infection, and tragic outcome.
                  </p>
                </div>
              </div>
            </button>
            <button
              className="embla__slide-2"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <div className="rounded bg-bgSecondary text-white overflow-hidden w-full min-h-[14rem] grid grid-rows-5">
                <div className="article-img bg-[url('https://media.canva.com/v2/image-resize/format:JPG/height:748/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2FpFIEs%2FMAGEDnpFIEs%2F1%2Fp.jpg/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAFNAm4-vBdADwnCgqw33IIXdQfFkMwVlW2UJc6Mi2nBa&exp=1718471723&osig=AAAAAAAAAAAAAAAAAAAAANBW-OJp_BlDuDstXwRAr6JIvzAkyDeCXDQ5scw2J6gz&signer=media-rpc&x-canva-quality=screen')] row-span-2">
                  {" "}
                  {/* <img src="/speaker1.webp" alt="article" /> */}
                </div>
                <div className="text-start row-span-3 px-1 flex flex-col justify-center">
                  <h2 className="font-semibold px-2 text-emerald-200 text-[0.9rem] mb-1">
                    Neck Mystery Unveiled
                  </h2>
                  <p className="text-xs px-2 mb-2">
                    Woman&apos;s rare neck swelling and spine involvement,
                    treated effectively with anti-tuberculous meds.
                  </p>
                </div>
              </div>
            </button>
            <button
              className="embla__slide-2"
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <div className="rounded bg-bgSecondary text-white overflow-hidden w-full min-h-[14rem] grid grid-rows-5">
                <div className="article-img bg-[url('https://media.canva.com/v2/image-resize/format:JPG/height:420/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2F_PrnQ%2FMAGD2x_PrnQ%2F1%2Fp.jpg/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAME2u_ZVbbyCFDcDGP28gDuw4wQDRH57CBtAEnecmQxy&exp=1718470365&osig=AAAAAAAAAAAAAAAAAAAAAK0n1So7XyZzRw3dTN-PBXMXAuZgoRK1vJ4ZRrUu-roe&signer=media-rpc&x-canva-quality=screen')] row-span-2">
                  {" "}
                  {/* <img src="/speaker1.webp" alt="article" /> */}
                </div>
                <div className="text-start row-span-3 px-1 flex flex-col justify-center">
                  <h2 className="font-semibold px-2 text-emerald-200 text-[0.9rem] mb-1">
                    LITHIUM and its Effects on Brain
                  </h2>
                  <p className="text-xs px-2 mb-2">
                    Lithium proves remarkable for bipolar mania with psychosis
                    in a young woman.
                  </p>
                </div>
              </div>
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

const Articles = () => {
  return (
    <section className="text-black  bg-bg py-10 px-1">
      <h1 className="text-lg font-semibold mb-2 px-2 ">Must read articles</h1>
      <p className="text-sm mb-7 px-2 font-medium text-black/80">
        Explore our magazine&apos;s must-read articles: captivating stories,
        expert perspectives, and thought-provoking analyses. Don&apos;t miss
        out—start reading now!
      </p>

      <EmblaCarousel />
    </section>
  );
};

export default Articles;
