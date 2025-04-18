import Image from "next/image";
import Caret from "./icons/Caret";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-bgSecondary text-white px-4 lg:px-44 py-10 border-t-2 border-bg/10 ">
      <div className="">
        <div className="grid">
          <Link href={"/"} className="w-fit">
            <Image
              height={90}
              width={160}
              src={"/kriti_logo_dark.png"}
              alt="kritikmc logo"
              className=" -translate-x-5"
            />
          </Link>

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
                  <Caret className="size-[10px]" color={"#ddd"} />
                  <Link href={"/"}>home.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret  className="size-[10px]" color={"#ddd"} />
                  <Link href={"/about"}>about us.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret className="size-[10px]"  color={"#ddd"} />
                  <Link href={"/events"}>events.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret  className="size-[10px]"  color={"#ddd"} />
                  <Link href={"/events-itinerary"}>events itinerary.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret className="size-[10px]"  color={"#ddd"} />
                  <Link href={"/archives"}>archives.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret  className="size-[10px]" color={"#ddd"} />
                  <Link href={"/alumni"}>alumni.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret className="size-[10px]"  color={"#ddd"} />
                  <Link href={"/chronicles"}>Kakatiya Chronicles.</Link>
                </li>
                <li className="flex items-center gap-1 hover:text-gray-50 transition-colors">
                  <Caret className="size-[10px]"  color={"#ddd"} />
                  <Link href={"/contact"}>contact us.</Link>
                </li>
              </ul>
              <div className="mt-5 md:mt-0 md:flex md:justify-center md:mr-3">
                <ul className="*:mb-3 text-gray-100">
                  <li className="">
                    <strong>Address: </strong>
                    <p className="w-[30ch] !text-gray-300">
                      Kakatiya Medical College - SVP Road. NH 563, Nizampura, Rangampet, Warangal
                    </p>
                  </li>
                  <li className="">
                    <strong>Contact Number:</strong>{" "}
                    <p className="!text-gray-300">0870-2446355</p>
                  </li>
                  <li className="">
                    <strong>Email ID:</strong>{" "}
                    <p className="!text-gray-300">kmckriti@gmail.com</p>
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
