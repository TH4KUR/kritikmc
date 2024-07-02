import SecondaryHero from "../components/SecondaryHero";
import Nav from "../components/Nav";
import TimelineCard from "../components/TimelineCard";
import Footer from "../components/Footer";

async function page() {
  let data = [
    {
      day: "Day 1",
      date: "27 July 20xx",
      schedule: [
        { time: "09:30 - 12:30", events: ["Jeopardy", "Working Lunch"] },
        { time: "Post Working Lunch in NRI Hall", events: ["Med-Exhibition"] },
        {
          time: "13:30 - 15:00",
          events: ["Debate"],
        },
        { time: "15:30 - 16:15", events: ["Guest Lecture - 1"] },
        { time: "16:45 - 18:15", events: ["Hackathon"] },
      ],
    },
    {
      day: "Day 2",
      date: "28 July 20xx",
      schedule: [
        {
          time: "09:30 - 11:30",
          events: ["Podium Paper Presentation", "Poster Presentation"],
        },
        {
          time: "11:45 - 12:45",
          events: ["Inauguration Ceremony", "Working Lunch"],
        },
        { time: "Post Working Lunch in NRI Hall", events: ["Med-Exhibition"] },

        { time: "14:00 - 14:45", events: ["Guest Lecture - 2"] },
        { time: "15:30 - 17:00", events: ["Symposium"] },
        { time: "6:30pm - 8:00pm", events: ["Prize Distribution"] },
      ],
    },
  ];
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
