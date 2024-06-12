import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Speaker from "./components/Speaker";
import { Suspense } from "react";
import Loading from "./loading";
import Timeline from "./components/Timeline";
import Timer from "./components/Timer";

async function getDeadline() {
  // TODO: prevent api leaking to client side!!
  const res = await fetch(
    `https://tcfgh3jw.api.sanity.io/v2024-06-12/data/query/production?query=*%5B_type+%3D%3D+%27siteSettings%27%5D%7Bdeadline%7D`
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const ret = await getDeadline();
  const deadline = ret.result[0].deadline;
  return (
    <Suspense fallback={<Loading />}>
      <header>
        <Nav />
      </header>
      <main>
        <Hero />
        <Timer deadline={deadline} />
        <Speaker />
        <Timeline />
      </main>
    </Suspense>
  );
}
