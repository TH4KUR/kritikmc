import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import Footer from "../components/Footer";
import getDeadlineData from "../lib/getDeadlineData";

export const metadata = {
  title: "Magazine",
};

async function page() {
  const deadline = await getDeadlineData();
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
      </section>
      {/* <Timer deadline={deadline} showButton={true} /> */}
      <Footer />
    </>
  );
}

export default page;
