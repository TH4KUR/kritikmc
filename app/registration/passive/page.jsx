import Nav from "@/app/components/Nav";
import Form from "./components/Form";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Arrow from "@/app/components/icons/Arrow";

export const metadata = {
  title: "Passive Delegate Registration Form",
};

export default async function Home() {
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
  return (
    <>
      <Nav bg={"#eee"} />
      <main className=" bg-gradient-to-br from-[#F7D4D4ba] to-[#F6ECC4] py-10">
        <section className=" flex flex-col items-center justify-center px-3 gap-1 py-10">
          <h1 className="font-semibold text-lg md:text-2xl">
            Passive Registration form for kriti.
          </h1>
          <p className="text-sm text-center w-80 md:text-base md:w-">
            Want to just watch your friends participate? Then hurry up and fill
            up the form below to book your seats at the kriti!{" "}
          </p>
          {/* <p className="text-sm text-center w-80 md:text-base bg-accent/20 rounded px-5 py-3 flex-col flex items-center">
            <span>Want to register as a active delegate?</span>{" "}
            <Link
              href={"/registration"}
              className="flex items-center font-medium hover:font-semibold px-3 py-2 hover:scale-105 transition-all hover:text-gray-50 hover:bg-accent2 mt-2 rounded-md"
            >
              Register Here <Arrow size={18} />
            </Link>{" "}
          </p> */}
          <hr className="border-black border w-40 mt-5" />
        </section>
        <Form />
      </main>{" "}
      <Footer />
    </>
  );
}
