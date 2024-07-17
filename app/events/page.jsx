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
              Discover upcoming events featuring cutting-edge medical research
              delivering innovative solutions to contemporary medical
              challenges. Experience immersive symposiums, workshops and
              seminars.
              <br />
              <br />
              Participate in dynamic competitions such as Med-E-Bate and Medical
              Jeopardy, and foster a culture of curiosity and enthusiasm among
              students.
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
