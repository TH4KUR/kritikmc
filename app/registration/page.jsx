import { Suspense } from "react";
import Loading from "./loading";
import Timer from "../components/Timer";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <Timer />
      </main>
    </Suspense>
  );
}
