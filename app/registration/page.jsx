import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Form from "./components/Form";

export default async function Home() {
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
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
          <hr className="border-black border w-40 mt-5" />
        </section>
        <Form />
      </main>{" "}
      <Footer />
    </>
  );
}
