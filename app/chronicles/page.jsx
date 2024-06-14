import React, { Suspense } from "react";
import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import { myClient } from "@/sanity";
import Loading from "./loading";
import MagazineSlider from "./components/MagazineSlider";
import Footer from "../components/Footer";

async function getDeadline() {
  const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
  return res[0].deadline;
}

async function page() {
  const deadline = await getDeadline();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Nav />
        <SecondaryHero
          title={"View the online version of our exclusive magazine"}
          body={
            <>
              Welcome to our online Kakatiya Medical College Magazine! Explore
              inspiring stories, cutting-edge research, and the human side of
              medicine. <br />
              <br /> Dive in and be inspired!
            </>
          }
        />
        <Timer deadline={deadline} showButton={true} />
        <MagazineSlider />
        <Footer />
      </Suspense>
    </>
  );
}

export default page;
