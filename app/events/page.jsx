import React, { Suspense } from "react";
import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import { myClient } from "@/sanity";
import Footer from "../components/Footer";
import Event from "./components/Event";
import Loading from "./loading";
import Timeline from "../components/Timeline";
// import "./events.css";
async function getDeadline() {
  const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
  return res[0].deadline;
}
async function page() {
  const deadline = await getDeadline();
  const target = new Date(deadline).getTime();
  const now = new Date().getTime();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Nav />

        <main className="bg-[#090909]">
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
          <Timer
            deadline={deadline}
            showButton={true}
            alreadyOver={target < now ? true : false}
          />
          <Event />
          <Timeline light={true} />
          <hr className=" bg-bg" />
        </main>

        {/* <Tabx /> */}
        <Footer />
      </Suspense>
    </>
  );
}

export default page;
