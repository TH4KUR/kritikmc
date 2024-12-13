import Link from "next/link";
import Arrow from "./icons/Arrow";

const Credits = () => {
  return (
    <div className=" bg-[#0b0f1d] text-gray-300 py-4 px-1 text-xs">
      <p className="flex gap-1 justify-center">
        Made with ❤️ by{" "}
        <Link
          className=" underline underline-offset-2 flex items-center"
          href={"https://portfolio-eashaan.vercel.app/"}
          target="_blank"
        >
          Eashaan Thakur
          <Arrow size={10} color={"#eee"} />
        </Link>
        &
        <Link
          className="underline underline-offset-2 flex items-center"
          href={"https://www.linkedin.com/in/aarush-thakur-13375b320"}
          target="_blank"
        >
          Aarush Thakur <Arrow size={10} color={"#eee"} />
        </Link>
      </p>
      <br/>
      <div><a href="https://www.siis.in" target="_blank">SiiS</a></div>
    </div>
  );
};

export default Credits;
