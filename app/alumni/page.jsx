import Image from "next/image";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
export const metadata = {
  title: "Alumni",
};
export default async function Home() {
  // FORCING Loading Screen
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="bg-[#11131c] min-h-screen py-10">
        <div className="flex flex-col items-center">
          <Image
            height={250}
            width={250}
            src={"/alumni_logo.webp"}
            className="mx-auto"
            alt="Logo of Osmania medical alumni association"
          />
          <h1 className="text-teal-50 font-semibold text-4xl my-5">
            Our Alumni<span className=" text-red-400">.</span>
          </h1>
        </div>
        <div className="grid max-w-screen-sm mx-auto mt-10 text-white gap-10 px-2 text-sm md:text-base">
          <div className="flex gap-3">
            <div className=" size-36 rounded grid place-items-center p-2 bg-white/5">
              <p className="text-center">Alumni Image</p>
            </div>
            <ul className="p-3">
              <li className="flex items-center gap-3">
                <span className=" font-semibold text-red-200 text-sm">1//</span>{" "}
                <p className=" font-semibold text-xl">Dr Anupama Gotimukula</p>
              </li>
              <li className=" ml-8">MD Pediatric Anesthesiology</li>
              <li className=" ml-8 mt-3">San Antonio, TX, USA</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <div className=" size-36 rounded grid place-items-center p-2 bg-white/5">
              <p className="text-center">Alumni Image</p>
            </div>
            <ul className="p-3">
              <li className="flex items-center gap-3">
                <span className=" font-semibold text-red-200 text-sm">2//</span>{" "}
                <p className=" font-semibold text-xl">
                  Dr Dr Sujeeth R. Punnam
                </p>
              </li>
              <li className=" ml-8">
                MD, FACC Interventional & Structural Cardiologist
              </li>
              <li className=" ml-8 mt-3">Sutter Health, Stockton, CA, USA</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <div className=" size-36 rounded grid place-items-center p-2 bg-white/5">
              <p className="text-center">Alumni Image</p>
            </div>
            <ul className="p-3">
              <li className="flex items-center gap-3">
                <span className=" font-semibold text-red-200 text-sm">3//</span>{" "}
                <p className=" font-semibold text-xl">Dr Venu G. Bathini</p>
              </li>
              <li className=" ml-8">Hematology/Oncology</li>
              <li className=" ml-8 max-w-[35ch] mt-3">
                Mass General Brigham Community Physicians Associate Professor,
                Univ. of Massachusetts
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
