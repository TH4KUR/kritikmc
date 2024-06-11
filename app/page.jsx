import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Speaker from "./components/Speaker";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <header>
        <Nav />
      </header>
      <main>
        <Hero />
        <Speaker />
      </main>
    </Suspense>
  );
}
