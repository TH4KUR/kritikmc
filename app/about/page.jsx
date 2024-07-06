/* eslint-disable @next/next/no-img-element */
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SecondaryHero from "../components/SecondaryHero";
import KritiInfo from "./components/KritiInfo";

import Stats from "../components/Stats";

export const metadata = {
  title: "About Us",
};

export const AboutCard = ({ imgSrc, title, body }) => {
  return (
    <div className="w-full bg-bgSecondary flex flex-col  overflow-hidden rounded-lg min-h-full">
      <div className="max-h-[1/2] overflow-hidden">
        <img
          src={imgSrc}
          alt="About Us Image"
          className="block h-full w-full filter brightness-[0.80] object-cover"
        />
      </div>
      <div className="max-h-[1/2] px-5 py-6 md:py-8 flex flex-col justify-center self-center">
        <h3 className="text-lg text-gray-100 font-bold mb-2 md:text-xl">
          {title}
        </h3>
        <p className="text-gray-200 text-base font-medium ">{body}</p>
      </div>
    </div>
  );
};

const page = async () => {
  const cardsData = [
    {
      imgSrc: "/about1.jpg",
      heading: "About KMC warangal",
      body: `Nestled in Warangal, Telangana, Kakatiya Medical College, established in 1959, excels in medical education, research, and community service. With dedicated faculty, the college fosters academic excellence and innovation. Alumni have made notable contributions globally. Committed to community health, KMC engages in outreach programs and medical camps. We cherish our sense of community, celebrating successes and supporting each other in our shared passion for healing and service. Kakatiya Medical College: Where passion meets purpose, and curiosity sparks innovation.`,
    },
    {
      imgSrc: "/about2.jpg",
      heading: "About Kakatiya Research Day",
      body: `The First Kakatiya Research Day began with an online Alumni Committee meeting on July 16, 2022, to enhance research at KMC and foster academic excellence. After a year of planning, the event took place on July 22, 2023, with the theme "Today's research, tomorrow's practice." Guided by the Principal, faculty, and KMC USA NRI alumni, the event featured submissions from nearly 100 medical colleges across India. Sixty students presented their research through papers, posters, debates, and a unique Jeopardy quiz. Keynote lectures on cutting-edge medical topics further enriched the event. The inaugural Kakatiya Research Day provided a platform for students to showcase their research and engage with peers and professionals, highlighting KMC's commitment to academic excellence and nurturing future medical researchers.`,
    },
  ];
  async function getDeadline() {
    const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
    return res[0].deadline;
  }
  const deadline = await getDeadline();
  return (
    <>
      <Nav />
      <main className="overflow-x-hidden">
        <SecondaryHero
          title={"Learn more about us."}
          body={
            "Kriti. celebrates groundbreaking research and innovation, fostering collaboration and knowledge sharing among academics, scientists, and industry leaders to drive progress and address global challenges."
          }
        />
        {/* <Timer deadline={deadline} />  */}
        <section className="bg-bg py-10">
          <h2 className=" text-accent uppercase font-bold text-base md:text-lg lg:text-lg text-center">
            About
          </h2>
          <h3 className="text-2xl font-bold md:text-3xl mb-10 text-center">
            Information about kriti.
          </h3>
          <div className="flex flex-col gap-3 w-11/12 sm:w-4/5 md:flex-row md:w-11/12 mx-auto lg:max-w-screen-lg lg:gap-6">
            {cardsData.map((el, i) => (
              <AboutCard
                title={el.heading}
                body={el.body}
                imgSrc={el.imgSrc}
                key={i}
              />
            ))}
          </div>
        </section>
        <KritiInfo />
        <Stats />
      </main>
      <Footer />
    </>
  );
};

export default page;
