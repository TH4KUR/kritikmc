import React, { Suspense } from "react";
import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import { myClient } from "@/sanity";
import Loading from "./loading";
import Footer from "../components/Footer";
import Event from "./components/Event";

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
          title={"Explore upcoming Events."}
          body={
            <>
              Dive into our conference events for cutting-edge workshops,
              seminars, and networking! Join experts, students, and
              professionals in shaping the future of healthcare innovation.
              <br />
              <br />
              Don&apos;t miss out — be a part of the action!
            </>
          }
        />
        <Timer deadline={deadline} showButton={true} />
        <Event />
        <Footer />
      </Suspense>
    </>
  );
}

export default page;
