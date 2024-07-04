import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Speaker from "./components/Speaker";
import Timeline from "./components/Timeline";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import { myClient } from "@/sanity";
import Stats from "./components/Stats";
import Archive from "./components/Archive";

export default async function Home() {
  async function getDeadline() {
    const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
    return res[0].deadline;
  }
  async function getSpeakerData() {
    const speakerQuery = `*[_type=='speakers']{speakername,speakertype,speakerimg,speakerdesc} | order(speakertype asc)`;
    const data = await myClient.fetch(speakerQuery);
    return data;
  }
  const deadline = await getDeadline();
  const speakerdata = await getSpeakerData();

  // FORCING Loading Screen
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="bg-bg">
        <Hero />
        <Timer deadline={deadline} />

        <Speaker speakerdata={speakerdata} />
        <Stats />
        <Timeline />
        <Archive />
      </main>
      <Footer />
      {/* <Credits /> */}
    </>
  );
}
