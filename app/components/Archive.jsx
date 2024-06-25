import Arrow from "./icons/Arrow";
import Link from "next/link";

const Archive = () => {
  return (
    <section className="bg-bg flex flex-col items-center py-6 px-1 text-black">
      <h1 className=" text-accent uppercase font-bold text-xl">Archive</h1>
      <h3 className="text-lg font-semibold mb-7">
        {" "}
        Discover previous editions of kriti
        <span className="text-accent">.</span>
      </h3>
      <div className="bg-[url('/archive.png')] flex items-center justify-center w-[219px] min-h-[196px] bg-cover">
        <Link
          href={"/archive"}
          className="flex items-center justify-between gap-3 bg-accent hover:scale-105 transition-all px-4 py-2 hover focus:ring focus:ring-[#e3616c] rounded-lg text-white font-semibold text-sm"
        >
          Archive <Arrow color={"#eee"} size={12} />
        </Link>
      </div>
    </section>
  );
};

export default Archive;
