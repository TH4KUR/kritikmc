import SecondaryHero from "../components/SecondaryHero";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ImageCarousel from "./components/ImageCarousel";

const page = () => {
  return (
    <>
      <Nav />
      <main className="bg-bgSecondary py-4">
        {/* <SecondaryHero
          title={"Archive - Dive Into Our Time Capsule"}
          body={
            ""
          }
        /> */}
        <div className="px-5 mb-7">
          <img src="/archiveHeading.png" className="w-3/5 mb-5" alt="heading" />
          <p className="text-gray-100 text-xs w-11/12">
            Explore a treasure trove of past articles, stories, and insights.
            Discover valuable content spanning various topics and delve deep
            into our archives.
          </p>
        </div>
        <section className="py-6 px-1 bg-bg">
          <ImageCarousel />
        </section>
        <div className=" p-3 bg-bgSecondary">
          <img className="w-2/3" src="/archiveHeading.gif" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
