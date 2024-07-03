import Image from "next/image";
import Arrow from "./icons/Arrow";
import Link from "next/link";

const Archive = () => {
  return (
    <section className="archives_container bg-bg flex flex-col items-center justify-center py-6 px-1 text-gray-50 h-[30vh] lg:h-[60vh] ">
      <h1 className=" text-accent2 uppercase font-bold text-xl">Archive</h1>
      <h3 className="text-lg font-semibold mb-7  md:text-2xl">
        {" "}
        Discover previous editions of kriti
        <span className="text-accent2">.</span>
      </h3>
      <Link
        href={"/archives"}
        className="flex items-center justify-between gap-3 bg-accent hover:scale-105 transition-all px-4 py-2 hover focus:ring focus:ring-[#e3616c] rounded-lg text-white font-semibold text-base lg:text-lg"
      >
        Archive <Arrow color={"#eee"} size={12} />
      </Link>
    </section>
  );
};

export default Archive;
