 
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
        { time: "9:30am - 12:00pm", events: ["Podium and Paper presentation"] },
        {
          time: "9:00am - 12:00pm",
          events: ["Poster presentation", "Working Lunch"],
        },
        { time: "1:30pm - 3:00pm", events: ["Debate"] },
        { time: "3:30pm - 4:15pm", events: ["Guest lecture"] },
        { time: "4:45pm - 6:15pm", events: ["Hackahthon"] },
      ],
    },
    {
      day: "Day 2",
      date: "28 July 20xx",
      schedule: [
        { time: "9:30am - 10:30am", events: ["Guest lecture"] },
        { time: "11:00am - 12:30pm", events: ["Inauguration Working Lunch"] },
        { time: "1:15pm - 4:00pm", events: ["Jeopardy"] },
        { time: "4:30pm - 6:00pm", events: ["Symposium"] },
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
          <div className="pt-10">
            <h2 className=" text-accent font-bold text-sm text-center uppercase">
              Timeline
            </h2>
            <h3 className={" text-center text-2xl font-bold mb-6"}>
              Event Breakdown
            </h3>
            {/* <hr className=" w-1/5 mx-auto border-black mb-4" /> */}
          </div>
          <div className={" w-full "}>
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
