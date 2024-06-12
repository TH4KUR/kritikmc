"use client";
import { useState, useEffect } from "react";

const Timer = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(deadline);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

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
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-sm py-3 bg-accent2 text-white font-semibold">
      <p className=" text-center">
        Hurry Up! Registrations Close in:
        {days != 0 ? (
          <>
            <br /> {days} day(s)
          </>
        ) : (
          ""
        )}{" "}
        {`${hours}:${minutes}:${seconds} `} hrs
      </p>
    </div>
  );
};

export default Timer;
