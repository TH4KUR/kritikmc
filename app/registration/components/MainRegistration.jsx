import Nav from "@/app/components/Nav";
import Link from "next/link";
import React from "react";
import Form from "./Form";
import Footer from "@/app/components/Footer";
import Arrow from "@/app/components/icons/Arrow";

const MainRegistration = ({ deadline, start }) => {
  if (Date.now() > deadline.getTime() || Date.now() < start.getTime()) {
    return (
      <>
        <Nav />
        <main className=" bg-gradient-to-br from-[#1e0b0b] to-[#1b1701] py-10">
          <section className=" flex flex-col items-center justify-center px-3 gap-1 py-10">
            <svg
              className=" fill-red-500 size-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path
                d="M216,96V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H208A8,8,0,0,1,216,96Z"
                opacity="0.2"
              ></path>
              <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
            </svg>
            <h1 className="text-2xl font-semibold text-center text-gray-200">
              Registrations for Kritikmc are now over! 😭
            </h1>
            <p className="text-gray-400 text-lg max-w-[45ch] text-center mt-3 ">
              But Hey, you can always participate the next time in the most
              awaited medical conference of Telengana with amazing prize pools!
            </p>
          </section>
        </main>{" "}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Nav bg={"#eee"} />
        <main className=" bg-gradient-to-br from-[#F7D4D4ba] to-[#F6ECC4] py-10">
          <section className=" flex flex-col items-center justify-center px-3 gap-1 py-10">
            <h1 className="font-semibold text-lg md:text-2xl">
              Registration form for kriti.
            </h1>
            <p className="text-sm text-center w-80 md:text-base md:w-">
              Fill in the required details below and pay the applicable fee to
              register for the event!{" "}
            </p>
            <p className="text-sm text-center w-80 md:text-base bg-accent/15 rounded px-5 py-3 flex-col flex items-center">
              <span>
                Just want to watch and learn? 😎 <br /> Register as a passive
                delegate!!
              </span>{" "}
              <Link
                href={"/registration/passive"}
                className="flex items-center font-medium hover:font-semibold px-3 py-2 hover:scale-105 transition-all hover:text-gray-50 hover:bg-accent2 mt-2 rounded-md border-accent border-2 text-sm"
              >
                Register Here &nbsp; <Arrow size={18} />
              </Link>{" "}
            </p>
            <hr className="border-black border w-40 mt-5" />
            <p className="bg-accent/10 px-3 py-2 text-base mt-2 font-medium">
              For any queries, contact:{" "}
              <Link
                href={"tel:+918700621534"}
                className=" underline text-blue-700"
              >
                +91 8700621534
              </Link>
            </p>
          </section>
          <Form />
        </main>{" "}
      </>
    );
  }
};

export default MainRegistration;
