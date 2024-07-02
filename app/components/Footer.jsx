import Caret from "./icons/Caret";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-bgSecondary text-white px-4 py-10 border-t-2 border-bg/10">
      <div>
        <h4 className=" font-medium text-4xl">
          kriti<span className=" text-[#e94552]">.</span>
        </h4>
        <p className="text-gray-400 text-xs">
          The official webiste of{" "}
          <span className="font-bold text-gray-400">
            Kakatiya Research Initiative for Transformative Innovations
          </span>{" "}
          - kriti <br /> (formerly krd)
        </p>
      </div>
      <div>
        <div className="my-7">
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="font-normal text-gray-300 text-[0.8rem] ml-2">
            <li className="flex items-center gap-1">
              <Caret color={"#ddd"} />
              <Link href={"/"}>home.</Link>
            </li>
            <li className="flex items-center gap-1">
              <Caret color={"#ddd"} />
              <Link href={"/about"}>about us.</Link>
            </li>
            <li className="flex items-center gap-1">
              <Caret color={"#ddd"} />
              <Link href={"/events"}>events.</Link>
            </li>
            <li className="flex items-center gap-1">
              <Caret color={"#ddd"} />
              <Link href={"/events-plan"}>events plan.</Link>
            </li>
            <li className="flex items-center gap-1">
              <Caret color={"#ddd"} />
              <Link href={"/archives"}>archives.</Link>
            </li>
            <li className="flex items-center gap-1">
              <Caret color={"#ddd"} />
              <Link href={"/alumini"}>alumini.</Link>
            </li>
            <li className="flex items-center gap-1">
              <Caret color={"#ddd"} />
              <Link href={"/chronicles"}>KC Chronicles.</Link>
            </li>
          </ul>
        </div>
        <div className="text-xs  text-gray-400 text-center">
          &copy; Kakatiya Medical College. All rights reserved{" "}
          {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
