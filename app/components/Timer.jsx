"use client";
import { useState, useEffect } from "react";
const timeStringGenerator = () => {
  const deadline = new Date("2024-06-24").getTime();
  const distance = deadline - new Date().getTime();
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days ? days > 1 : ""}${
    "days" ? days > 1 : ""
  } ${hours}:${mins}:${secs} `;
};
const Timer = (type) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("2024-06-24");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className=" bg-accent2 text-white font-bold">
      <p>
        Hurry Up! Registrations Close in:
        <br /> {days}days {`${hours}:${minutes}:${seconds} `}
      </p>
    </div>
  );
};

export default Timer;
