import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Speaker from "./components/Speaker";
import Timeline from "./components/Timeline";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import Stats from "./components/Stats";
import Archive from "./components/Archive";
import getDeadlineData from "./lib/getDeadlineData";
import getSpeakerData from "./lib/getSpeakerData";

export default async function Home() {
  const deadline = await getDeadlineData();
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
