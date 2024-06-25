/* eslint-disable @next/next/no-img-element */
 
import Link from "next/link";
const Hero = async () => {
  return (
    <section>
      <div className="min-h-[24vh]">
        <img
          src="/hero.webp"
          alt="a picture of kakatiya medical college"
          className=" min-w-[100%]"
        />
      </div>

      <h1 className="hidden">
        The most awaited medical conference of the year is back!
      </h1>
      <div className="flex justify-end gap-3 mr-4 mb-4 -translate-y-3">
        <Link
          href={"/registration"}
          className="bg-accent hover:scale-105 transition-all px-4 py-2 grid place-items-center hover focus:ring focus:ring-[#e3616c] rounded-lg text-white font-semibold text-sm"
        >
          Register Now!
        </Link>
        <Link
          href={"/events"}
          className="border-2 border-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#111] hover:scale-110 hover:text-white focus:outline-none focus:ring focus:ring-slate-600 transition-all"
        >
          Events
        </Link>
      </div>
    </section>
  );
};

export default Hero;
