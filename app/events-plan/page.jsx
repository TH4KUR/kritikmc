import SecondaryHero from "../components/SecondaryHero";
import Nav from "../components/Nav";
import TimelineCard from "./components/TimelineCard";
import Footer from "../components/Footer";
import getConvertedEventsData from "../lib/getConvertedEventsData";
export const metadata = {
  title: "Events Plan",
};
async function page() {
  const data = await getConvertedEventsData();
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  return (
    <>
      <Nav />
      <main className="mb-7">
        <SecondaryHero
          title={"Compete and Conquer: Events Plan Page."}
          body={
            "Discover upcoming competitions catering to all skill levels. Plan your strategy and join us for thrilling events that test your skills and passion for competition."
          }
        />
        <div className={""}>
          <div className="py-10 flex flex-col items-center">
            <h2 className=" text-accent uppercase font-bold text-base md:text-lg mt-5">
              Timeline
            </h2>
            <h3 className="text-black text-2xl font-bold md:text-3xl">
              Events Timing Breakdown
            </h3>
            {/* <hr className=" w-1/5 mx-auto border-black mb-4" /> */}
          </div>
          <div className={" w-full max-w-screen-md mx-auto"}>
            {data.map((dat, i) => {
              return <TimelineCard key={i} data={dat} />;
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default page;
