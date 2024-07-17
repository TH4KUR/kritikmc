/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import DesktopHero from "./DesktopHero";
import Image from "next/image";
const Hero = async () => {
  return (
    <section className="relative md:h-[95vh] md:bg-[#090909]">
      <div className=" md:hidden">
        <Image
          width={400}
          height={300}
          src="/hero.webp"
          alt="a picture of kakatiya medical college"
          className=" min-w-[100%]"
        />
      </div>
      <div className="flex md:hidden justify-end md:justify-normal gap-3 mr-4 mb-4 -translate-y-3 md:translate-y-0">
        <Link
          href={"/registration"}
          className="bg-accent hover:scale-105 transition-all px-4 py-2 grid place-items-center hover focus:ring focus:ring-[#e3616c] rounded-lg text-white font-semibold text-sm"
        >
          Register Now!
        </Link>
        <Link
          href={"/events"}
          className="border-2 border-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#111] hover:scale-110 hover:text-white focus:outline-none focus:ring focus:ring-slate-600 transition-all md:border-white md:text-white md:hover:bg-[#ddd] md:hover:text-black"
        >
          Events
        </Link>
      </div>
      <DesktopHero />
    </section>
  );
};

export default Hero;
