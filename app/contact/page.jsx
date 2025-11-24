import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us",
};

async function page() {
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  return (
    <>
      <Nav />
      <SecondaryHero
        title={"Contact Us"}
        body={"Below are the details to required needed for you to reach us."}
      />
      <section className="bg-bg py-10">
        <h2 className=" text-accent uppercase font-bold text-base md:text-lg lg:text-lg text-center">
          Contact Us
        </h2>
        <h3 className="text-2xl font-bold md:text-3xl mb-10 text-center">
          Information about kriti.
        </h3>

        <div className="flex justify-center">
          <ul className="*:mb-3">
            <li className="">
              <strong>Address: </strong>
              <p className="w-[30ch]">
                Kakatiya Medical College - South North V P Road, Nizampura,
                Rangampet Street, Warangal 506007, Telangana, India
              </p>
            </li>
            <li className="">
              <strong>Contact Number:</strong> <p>0870-2446355</p>
            </li>
            <li className="">
              <strong>Email ID:</strong> <p>pwarangal@gmail.com</p>
            </li>
          </ul>
        </div>
        <p className="mt-6 text-center text-base px-3 py-2 rounded-lg bg-accent2/10 w-fit mx-auto text-gray-700">
          For registration related queries contact us on WhatsApp:{" "}
          <a
            href="https://api.whatsapp.com/send?phone=918700621534&text=Hi%20I%20want%20help%20with%20Kriti%20Registration%20in...."
            className="text-accent font-semibold hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Message us.
          </a>
        </p>
      </section>
      {/* {showTimer ? <Timer deadline={deadline} /> : <></>} */}
      <Footer />
    </>
  );
}

export default page;
