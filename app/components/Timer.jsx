"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Timer = ({ deadline, showButton }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [regOver, setRegOver] = useState(false);
  const alreadyOver =
    new Date(deadline).getTime() < new Date().getTime() ? true : false;

  useEffect(() => {
    const target = new Date(deadline);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference < 0) {
        setRegOver(true);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        setDays(d);

        let h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        h = h > 9 ? h : "0" + String(h);
        setHours(h);

        let m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        m = m > 9 ? m : "0" + String(m);
        setMinutes(m);

        let s = Math.floor((difference % (1000 * 60)) / 1000);
        s = s > 9 ? s : "0" + String(s);
        setSeconds(s);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);
  return (
    <motion.div
      initial={{ translateX: "-100%" }}
      whileInView={{ translateX: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
      className="text-sm py-3 bg-accent2 text-white font-medium flex flex-col items-center md:text-base"
    >
      {(() => {
        if (!alreadyOver) {
          return !regOver ? (
            <>
              <motion.div
                initial={{ translateY: 3, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{
                  translateY: 0,
                  opacity: 1,

                  transition: { duration: 0.25, delay: 0.5 },
                }}
              >
                <p className="flex justify-center gap-3">
                  <span className="font-semibold">
                    {" "}
                    Hurry Up! Registrations Close in:
                  </span>
                  <span>
                    {days != 0 ? <>{days} day(s)</> : ""}{" "}
                    {`${hours}:${minutes}:${seconds} `} hrs
                  </span>
                </p>
                {showButton ? (
                  <Link
                    href={"/registration"}
                    className="text-sm underline underline-offset-1 flex items-center justify-self-center"
                  >
                    Register Now{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="#eee"
                      viewBox="0 0 256 256"
                    >
                      <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                    </svg>
                  </Link>
                ) : (
                  ""
                )}
              </motion.div>
            </>
          ) : (
            <motion.p
              initial={{ translateY: 3, opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{
                translateY: 0,
                opacity: 1,

                transition: { duration: 0.25, delay: 0.5 },
              }}
              className="text-center"
            >
              The registrations are now closed!
            </motion.p>
          );
        } else {
          return (
            <motion.p
              initial={{ translateY: 3, opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{
                translateY: 0,
                opacity: 1,

                transition: { duration: 0.25, delay: 0.5 },
              }}
              className="text-center"
            >
              The registrations are now closed!
            </motion.p>
          );
        }
      })()}
    </motion.div>
  );
};

export default Timer;
