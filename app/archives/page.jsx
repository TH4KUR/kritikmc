/* eslint-disable @next/next/no-img-element */
import SecondaryHero from "../components/SecondaryHero";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Image from "next/image";
import ImageCarousel from "./components/ImageCarousel";
import getArchivesData from "../lib/getArchivesData";
import ArchivesGrid from "./components/ArchivesGrid";

export const metadata = {
  title: "Archives",
};

const page = async () => {
  const archiveData = await getArchivesData();
  // console.log(archiveData);

  return (
    <>
      <Nav />
      <main className="bg-bgSecondary">
        <h1 className="hidden">archives.</h1>
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
            className="w-3/5 lg:w-1/5 mx-auto "
            alt="An image containing text archives."
          />

          <p className="text-base text-yellow-50 md:text-lg mx-5 md:w-4/5 sm:mx-auto max-w-screen-md mb-10 lg:border-b-2 pb-10 border-bg/35">
            Welcome to our archives. Here, you can delve into the trailblazing,
            avant-garde, innovative, and cutting-edge medical research studies,
            posters, articles, and insights from the previous edition of KRD.
            <br />
            <br />
            Let these pioneering works inspire you to showcase your expertise
            and create something truly extraordinary and monumental.
          </p>
        </div>
        <ArchivesGrid archivesData={archiveData} />
        {/* <section className="px-1 relative pb-10 max-w-screen-sm mx-auto">
          <ImageCarousel />
        </section> */}
        <div className="p-5 bg-bgSecondary ">
          <img className="mx-auto" src="/archiveHeading.gif" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
