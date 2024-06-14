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
  return (
    <>
      <Suspense fallback={<Loading />}>
        <header>
          <Nav />
        </header>
        <main>
          <Hero />
          <Timer deadline={deadline} />
          <Speaker speakerdata={speakerdata} />
          <Timeline />
        </main>
        <Footer />
        <div className=" bg-[#0b0f1d] text-gray-300 py-4 px-1 text-xs">
          <p className="flex gap-1 justify-center">
            Made with ❤️ by{" "}
            <Link
              className=" underline underline-offset-2 flex items-center"
              href={"#"}
            >
              Eashaan{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="#eee"
                viewBox="0 0 256 256"
              >
                <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
              </svg>
            </Link>{" "}
            & Aarush Thakur
          </p>
        </div>
      </Suspense>
    </>
  );
}
