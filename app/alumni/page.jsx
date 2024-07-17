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
            <ul className="p-3">
              <li className="md:flex items-center mb-4">
                <div className="mb-2 rounded grid place-items-center p-2 bg-white/5">
                  <img
                    className=" object-cover h-full w-full"
                    src="/dr_sujeeth.webp"
                    alt="alumni dr sujeeth"
                  />
                </div>
                <ul className="ml-3">
                  <li className="flex items-center gap-3">
                    <span className=" font-semibold text-red-200 text-sm">
                      2//
                    </span>{" "}
                    <p className=" font-semibold text-xl">
                      Dr Dr Sujeeth R. Punnam
                    </p>
                  </li>
                  <li className=" ml-8">
                    MD, FACC Interventional & Structural Cardiologist
                  </li>
                  <li className=" ml-8 mt-3">
                    Sutter Health, Stockton, CA, USA. KRITI (Kakatiya Research
                    Initiative for Transformative Innovations) Formerly Kakatiya
                    Research Day Co-Chair, NRI Alumni Educational Center
                  </li>
                </ul>
              </li>
              <li>
                <span className=" font-serif text-5xl font-semibold">
                  &quot;
                </span>
                Like the adage goes- Rome was not built in one day! The seed for
                the Kakatiya Research Day was sown when a group of Alumni
                Committee members from US and India had an online meeting to
                review the progress of NRI Alumni center and the discussion
                extended towards increasing the research activities in KMC, to
                make it a more vibrant medical school in the country. We were
                bothered by the latest statistic, in the top 10 medical colleges
                of India, Telangana medical colleges did not find a place. That
                set the ball rolling for a series of activities that led to the
                following efforts. Our background efforts culminated in
                fructification of First Kakatiya Researched Day on July 22,
                2023. That took a whole 1 year of planning! India is progressing
                in all sectors but the key ingredient to make this a success
                story, is trained man power. With burgeoning number of medical
                schools and hospitals coming up to cater to the health needs of
                the population, comes a necessity to have well trained doctors.
                We figured having a research mindset to go along with the
                brilliant academic students we have, will be a good combination.
                As innovation is the recipe for sure shot success of any
                country, we decided to focus our efforts towards that direction.
                We had series of meetings with KMC Principal, Dr Mohan Das, and
                other key people on the ground. It was decided to work on
                increasing research activities in the campus by making the
                student, the center point of focus. In the first edition of KMC
                Research Day, for the first time, we witnessed students from all
                over India come to our campus and present the latest research
                studies in poster and podium presentation format. From more than
                100 college entries, we finalized 10 student groups in each
                category to come and showcase those research topics. With these
                attempts, we are trying to expose KMC students to happenings
                around the country, which will in turn set them up for more
                interest in the research during the college days itself. This
                will strengthen their CV&quot; s, harness their writing skills,
                team building skills and leadership skills. World is changing
                and we need our students to be competitive and prepare
                themselves for those academic changes in the field of medicine.
              </li>
            </ul>
          </div>
          <div className="md:flex gap-3">
            <div className="rounded grid place-items-center p-2 bg-white/5">
              <img
                className=" object-cover h-full w-full brightness-[0.85]"
                src="/dr_anupama.jpeg"
                alt="alumni dr anupama"
              />
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

          <div className="md:flex gap-3">
            <ul>
              <li>
                <div className=" rounded grid place-items-center p-2 bg-white/5">
                  <img
                    className=" object-cover h-full w-full brightness-90"
                    src="/dr_venu.jpeg"
                    alt="alumni dr venu"
                  />
                </div>
                <ul className="p-3">
                  <li className="flex items-center gap-3">
                    <span className=" font-semibold text-red-200 text-sm">
                      3//
                    </span>{" "}
                    <p className=" font-semibold text-xl">Dr Venu G. Bathini</p>
                  </li>
                  <li className=" ml-8">Hematology/Oncology</li>
                  <li className=" ml-8 max-w-[35ch] mt-3">
                    Mass General Brigham Community Physicians Associate
                    Professor, Univ. of Massachusetts
                  </li>
                </ul>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
