import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import Footer from "../components/Footer";
import Timeline from "../components/Timeline";
import Events from "./components/Events";
import getDeadlineData from "../lib/getDeadlineData";
import getEventsData from "../lib/getEventsData";

export const metadata = {
  title: "Events",
};

async function page() {
  const deadlineData = getDeadlineData();
  const eventsData = getEventsData();
  const [deadline, events] = await Promise.all([deadlineData, eventsData]);
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
  return (
    <>
      <Nav />

      <main className="bg-[#090909] relative">
        <SecondaryHero
          title={"Explore upcoming Events."}
          body={
            <>
              Dive into our conference events for cutting-edge workshops,
              seminars, and networking! Join experts, students, and
              professionals in shaping the future of healthcare innovation.
              <br />
              <br />
              Don&apos;t miss out — be a part of the action!
            </>
          }
        />
        <Timer deadline={deadline} showButton={true} />
        <Events data={events} />
        <Timeline light={true} />
        <hr className=" bg-bg" />
      </main>

      {/* <Tabx /> */}
      <Footer />
    </>
  );
}

export default page;
