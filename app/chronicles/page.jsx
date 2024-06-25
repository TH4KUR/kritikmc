import React, { Suspense } from "react";
import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import { myClient } from "@/sanity";

import MagazineSlider from "./components/MagazineSlider";
import Footer from "../components/Footer";
import Articles from "./components/Articles";

async function getDeadline() {
  const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
  return res[0].deadline;
}

async function page() {
  const deadline = await getDeadline();
  const target = new Date(deadline).getTime();
  const now = new Date().getTime();
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  return (
    <>
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
      <Timer
        deadline={deadline}
        showButton={true}
        alreadyOver={target < now ? true : false}
      />

      <MagazineSlider />
      <hr className="border-black bg-bg w-1/4 mx-auto" />
      <Articles />
      <Footer />
    </>
  );
}

export default page;
