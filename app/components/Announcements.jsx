"use client";
import { Suspense, useState } from "react";
import Bullet from "./icons/Bullet";
import Caret from "./icons/Caret";
import Link from "next/link";
import getAnnouncements from "../lib/getAnnouncements";

const Announcements = () => {
  const [hidden, setHidden] = useState(true);
  const [announcements, setAnnouncements] = useState(false);

  return (
    <section className="bg-[#f2c7cc63] py-4 px-3">
      <div className="max-w-screen-md mx-auto">
        <p className="font-medium md:font-semibold md:text-lg mb-2 flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className=" size-6 fill-accent rotate-12"
          >
            <path
              d="M240,120a40,40,0,0,1-40,40H160V80h40A40,40,0,0,1,240,120Z"
              opacity="0.2"
            ></path>
            <path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z"></path>
          </svg>{" "}
          Important Updates/ Announcements:
        </p>
        {hidden ? (
          <Suspense
            fallback={
              <button
                disabled
                className="flex font-medium items-center gap-1 px-2 py-2 bg-accent/30 opacity-90 text-sm mx-auto rounded-md"
              >
                Loading...
              </button>
            }
          >
            <button
              onClick={async () => {
                const res = await getAnnouncements();
                setAnnouncements(res);
                setHidden(false);
              }}
              className="flex font-medium items-center gap-1 px-2 py-2 bg-accent/30 text-sm mx-auto rounded-md"
            >
              Show Updates <Caret className={"rotate-90 size-4"} />
            </button>
          </Suspense>
        ) : (
          ""
        )}
        {!hidden ? (
          <ul className="*:flex *:gap-2 ml-5 *:items-center *:shrink-0 *:mb-2 text-sm md:text-base">
            {announcements?.map((el, i) => {
              return (
                <li key={i}>
                  <Bullet size={7} className={"shrink-0"} />
                  <p>{el.text}</p>
                  <Link
                    className="text-base self-start"
                    href={el.link}
                    target="_blank"
                  >
                    {" "}
                    [Link]
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Announcements;
