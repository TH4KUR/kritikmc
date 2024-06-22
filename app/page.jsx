import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Speaker from "./components/Speaker";
import { Suspense } from "react";
import Loading from "./loading";
import Timeline from "./components/Timeline";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import Link from "next/link";
import { myClient } from "@/sanity";
import Arrow from "./components/icons/Arrow";
import Sponsors from "./components/Sponsors";
import Archive from "./components/Archive";

async function getDeadline() {
  // TODO: prevent api leaking to client side!!
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
  const target = new Date(deadline).getTime();
  const now = new Date().getTime();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <header>
          <Nav />
        </header>
        <main className="bg-bg">
          <Hero />
          <Timer
            deadline={deadline}
            alreadyOver={target < now ? true : false}
          />

          <Speaker speakerdata={speakerdata} />
          <Sponsors />
          <Timeline />
          <Archive />
        </main>
        <Footer />
        <div className=" bg-[#0b0f1d] text-gray-300 py-4 px-1 text-xs">
          <p className="flex gap-1 justify-center">
            Made with ❤️ by{" "}
            <Link
              className=" underline underline-offset-2 flex items-center"
              href={"#"}
            >
              Eashaan <Arrow size={10} color={"#eee"} />
            </Link>{" "}
            & Aarush Thakur
          </p>
        </div>
      </Suspense>
    </>
  );
}
