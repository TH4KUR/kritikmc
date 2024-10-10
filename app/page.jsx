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
import Sponsors from "./components/Sponsors";
import Brochure from "./components/Brochure";
import Announcements from "./components/Announcements";
import Testimonials from "./components/Testimonials";
import Patreons from "./components/Patreons";
import Judges from "./components/Judges";
import getPatronData from "./lib/getPatronData";
import getJudgeData from "./lib/getJudgeData";
export const metadata = {
  description:
    "The premier medical conference hosted by Kakatiya Medical College, Warangal. Join events or seminars by top medical experts.",
  keywords: [
    "medical conference in Telangana",
    "medical competitions in Telangana",
    "kriti kmc",
    "kmc warangal",
    "medical conference in warangal",
  ],
};
export default async function Home() {
  const deadline = await getDeadlineData();
  const speakerdata = await getSpeakerData();
  const patrondata = await getPatronData();
  const judgedata = await getJudgeData(); // FORCING Loading Screen
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="bg-bg">
        <Hero />
        {/* <Timer deadline={deadline} /> */}
        <Announcements />
        <Patreons patrondata={patrondata} />
        <Speaker speakerdata={speakerdata} />
        <Judges judgedata={judgedata} />
        <Stats />
        <Timeline />
        <Sponsors />
        <Brochure />
        <Testimonials />
        <Archive />
      </main>
      <Footer />
      {/* <Credits /> */}
    </>
  );
}
