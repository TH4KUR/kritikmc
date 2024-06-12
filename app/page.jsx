import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Speaker from "./components/Speaker";
import { Suspense } from "react";
import Loading from "./loading";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <header>
        <Nav />
      </header>
      <main>
        <Hero />
        <Speaker />
        <Timeline />
      </main>
    </Suspense>
  );
}
