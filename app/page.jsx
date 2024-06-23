import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Speaker from "./components/Speaker";
import { Suspense } from "react";
 
import Timeline from "./components/Timeline";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import Link from "next/link";
import { myClient } from "@/sanity";
import Arrow from "./components/icons/Arrow";
import Sponsors from "./components/Sponsors";
import Archive from "./components/Archive";
import Credits from "./components/Credits";

async function getDeadline() {
  const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
  return res[0].deadline;
}
async function getSpeakerData() {
  const speakerQuery = `*[_type=='speakers']{speakername,speakertype,speakerimg,speakerdesc} | order(speakertype asc)`;
  const data = await myClient.fetch(speakerQuery);
  return data;
}
export default async function Home() {
  const deadline = await getDeadline();
  const speakerdata = await getSpeakerData();

  // Need to remove this
  const target = new Date(deadline).getTime();
  const now = new Date().getTime();

  // FORCING Loading Screen
  await fetch("https://reqres.in/api/users?delay=2",{cache: 'no-cache'});;

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="bg-bg">
        <Hero />
        <Timer deadline={deadline} alreadyOver={target < now ? true : false} />

        <Speaker speakerdata={speakerdata} />
        <Sponsors />
        <Timeline />
        <Archive />
      </main>
      <Footer />
      <Credits />
    </>
  );
}
