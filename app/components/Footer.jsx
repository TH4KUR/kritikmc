import Caret from "./icons/Caret";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-bgSecondary text-white px-4 lg:px-44 py-10 border-t-2 border-bg/10 ">
      <div className="">
        <div>
          <h4 className=" font-medium text-4xl lg:text-5xl lg:font-semibold">
            kriti<span className=" text-[#e94552]">.</span>
          </h4>
          <p className="text-gray-400 text-xs lg:text-sm">
            The official webiste of{" "}
            <span className="font-bold text-gray-300">
              Kakatiya Research Initiative for Transformative Innovations
            </span>{" "}
            - kriti <br /> (formerly krd)
          </p>
        </div>
        <div>
          <div className="my-7">
            <div className="flex flex-col lg:flex-row justify-between">
              <ul className="font-normal text-gray-300 text-sm ml-2 lg:text-base">
                <li className="font-semibold !text-gray-100 -translate-x-2">
                  Quick Links
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/"}>home.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/about"}>about us.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/events"}>events.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/events-iternary"}>events iternary.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/archives"}>archives.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/alumni"}>alumni.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/chronicles"}>KC Chronicles.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret color={"#ddd"} />
                  <Link href={"/contact"}>contact us.</Link>
                </li>
              </ul>
              <div className="mt-5 md:mt-0 md:flex md:justify-center md:mr-3">
                <ul className="*:mb-3 text-gray-100">
                  <li className="">
                    <strong>Address: </strong>
                    <p className="w-[30ch] !text-gray-300">
                      Kakatiya Medical College - South North V P Road,
                      Nizampura, Rangampet Street, Warangal 506007, Telangana,
                      India
                    </p>
                  </li>
                  <li className="">
                    <strong>Contact Number:</strong>{" "}
                    <p className="!text-gray-300">0870-2446355</p>
                  </li>
                  <li className="">
                    <strong>Email ID:</strong>{" "}
                    <p className="!text-gray-300">pwarangal@gmail.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-xs  text-gray-400 text-center">
            &copy; Kakatiya Medical College. All rights reserved{" "}
            {new Date().getFullYear()}
          </div>
        </div>
      </div>{" "}
    </footer>
  );
};

export default Footer;
