import Bullet from "../../components/icons/Bullet";
import { Cutive } from "next/font/google";
const cutive = Cutive({
  subsets: ["latin"],
  weight: ["400"],
});

const TimelineCard = ({ data }) => {
  return (
    <div className="font-medium rounded-lg text-bg shadow-lg shadow-black/10 md:mb-2">
      <div className="bg-[#b732770f] border-y-2 border-accent border-opacity-30 flex justify-between items-center py-3 px-4">
        <h4 className="text-black uppercase underline underline-offset-4 text-lg font-bold ">
          {data.day}
        </h4>
        <h5 className="text-black text-base ">
          {new Date(data.date).toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h5>
      </div>
      <div className="relative before:absolute before:bg-[url('/papertexture.jpg')] before:h-full before:w-full before:block before:z-[-1] before:opacity-25 before:bg-cover before:left-0 before:top-0 px-4 py-8">
        <ul className={cutive.className + " text-sm"}>
          {data.schedule.map((el, i) => {
            return (
              <li key={i} className="mt-4 font-bold text-gray-800">
                {!el.postNriLunch ? el.time : "Post NRI Lunch in NRI Hall"}
                <br />
                {el.events.map((eventName, j) => {
                  if (
                    eventName.toLowerCase() === "amboss workshop" ||
                    eventName === "Marrow's Jeopardy"
                  ) {
                    return (
                      <p
                        key={j}
                        className="ml-3 text-accent2/90 font-bold flex items-center gap-2"
                      >
                        <Bullet />
                        {eventName}
                      </p>
                    );
                  } else {
                    return (
                      <p
                        key={j}
                        className="ml-3 text-black flex items-center gap-2 font-normal"
                      >
                        <Bullet />
                        {eventName}
                      </p>
                    );
                  }
                })}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TimelineCard;
