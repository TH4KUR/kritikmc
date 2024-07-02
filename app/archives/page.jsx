/* eslint-disable @next/next/no-img-element */
import SecondaryHero from "../components/SecondaryHero";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Image from "next/image";
import ImageCarousel from "./components/ImageCarousel";

const page = () => {
  return (
    <>
      <Nav />
      <main className="bg-bgSecondary">
        <h1 className="hidden">archives.</h1>
        {/* <SecondaryHero
          title={"Archive - Dive Into Our Time Capsule"}
          body={
            ""
          }
        /> */}
        <div className="px-5 py-7 relative lg:min-h-full">
          <img
            src="/archives_waves.svg"
            className=" w-3/5 opacity-20 absolute top-0 left-0 lg:opacity-10 lg:w-1/5"
            alt="An image of waves"
          />
          <Image
            height={100}
            width={200}
            src="/archives_heading.svg"
            className="w-3/5 lg:w-1/5 mx-auto lg:border-b-2 mb-10 border-bg"
            alt="An image containing text archives."
          />
          <img
            src="/archives_threedots.svg"
            className=" h-[50svh] opacity-50 absolute top-0 right-0"
            alt="An image of three colorful dots"
          />
          <img
            src="/archives_threedots.svg"
            className=" h-[50svh] opacity-50 absolute bottom-0 left-0 rotate-180"
            alt="An image of three colorful dots"
          />
          <div className="mx-auto relative z-20 lg:grid lg:grid-cols-2 lg:justify-items-center max-w-screen-md">
            <Image
              height={400}
              width={800}
              src="/archives_collage1.png"
              className="block object-contain"
              alt="An image of three colorful dots"
            />

            <Image
              height={400}
              width={800}
              src="/archives_collage2.png"
              className="block object-contain -translate-y-10 lg:translate-y-0"
              alt="An image of three colorful dots"
            />
            <Image
              height={400}
              width={800}
              src="/archives_collage3.png"
              className="block  object-contain -translate-y-12 lg:translate-y-0 col-span-2"
              alt="An image of three colorful dots"
            />
          </div>
        </div>
        <section className="px-1 relative pb-10 max-w-screen-sm mx-auto">
          <ImageCarousel />
        </section>
        <div className="p-5 bg-bgSecondary">
          <img className="" src="/archiveHeading.gif" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
