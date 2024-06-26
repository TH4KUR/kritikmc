/* eslint-disable @next/next/no-img-element */
import SecondaryHero from "../components/SecondaryHero";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Nav />
      <main className="">
        {/* <SecondaryHero
          title={"Archive - Dive Into Our Time Capsule"}
          body={
            ""
          }
        /> */}
        <div className="px-5 py-7 bg-[#c1360017]">
          <img src="/archiveHeading.png" className="w-3/5" alt="heading" />
          <p className="text-black text-base w-11/12 ml-3 font-medium">
            Explore a treasure trove of past articles, stories, and insights.
            Discover valuable content spanning various topics and delve deep
            into our archives.
          </p>
        </div>
        <section className="px-1 bg-bg pb-10">
          <div className="relative">
            <img className="w-2/3 " src="/archive1.png" alt="archive photo" />
            <img
              className="absolute w-2/3 m:w-1/2 top-0 translate-y-1/2 translate-x-1/2"
              src="/archive2.png"
              alt="archive photo"
            />
          </div>
          <div className="relative">
            <img className="w-2/3 " src="/archive3.png" alt="archive photo" />
            <img
              className="absolute w-2/3  top-0 translate-y-1/2 translate-x-1/2"
              src="/archive4.png"
              alt="archive photo"
            />
          </div>
          <div className="relative">
            <img className="w-2/3 " src="/archive5.png" alt="archive photo" />
          </div>

          {/* <ImageCarousel /> */}
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
