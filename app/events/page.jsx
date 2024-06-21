import React from "react";
import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import { myClient } from "@/sanity";
import Footer from "../components/Footer";
import Event from "./components/Event";
import "./globals.css";
async function getDeadline() {
  const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
  return res[0].deadline;
}

async function page() {
  const deadline = await getDeadline();
  return (
    <>
      <Nav />

      <SecondaryHero
        title={"Explore upcoming Events."}
        body={
          <>
            Dive into our conference events for cutting-edge workshops,
            seminars, and networking! Join experts, students, and professionals
            in shaping the future of healthcare innovation.
            <br />
            <br />
            Don&apos;t miss out — be a part of the action!
          </>
        }
      />
      <Timer deadline={deadline} showButton={true} />

      <Event />
      {/* <Tabx /> */}
      <Footer />
    </>
  );
}

export default page;
