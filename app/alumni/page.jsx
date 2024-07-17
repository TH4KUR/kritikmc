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
        <div className="grid max-w-screen-md mx-auto mt-10 text-white gap-10 px-2 text-sm md:text-base">
          <div className="flex gap-3">
            <ul className="p-3">
              <li className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-10 items-center mb-4">
                <div className="mb-2 rounded grid place-items-center p-2 bg-white/5 col-span-3">
                  <img
                    className=" object-cover h-full w-full aspect-square"
                    src="/dr_sujeeth.webp"
                    alt="alumni dr sujeeth"
                  />
                </div>
                <ul className="ml-3 col-span-7">
                  <li className="flex items-center gap-3">
                    <span className=" font-semibold text-red-200 text-sm">
                      1//
                    </span>{" "}
                    <p className=" font-semibold text-xl">
                      Dr Sujeeth R. Punnam
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
                make it a more vibrant medical school in the country.
                <br />
                <br />
                We were bothered by the latest statistic, in the top 10 medical
                colleges of India, Telangana medical colleges did not find a
                place. That set the ball rolling for a series of activities that
                led to the following efforts. Our background efforts culminated
                in fructification of First Kakatiya Researched Day on July 22,
                2023.
                <br />
                <br />
                That took a whole 1 year of planning! India is progressing in
                all sectors but the key ingredient to make this a success story,
                is trained man power. With burgeoning number of medical schools
                and hospitals coming up to cater to the health needs of the
                population, comes a necessity to have well trained doctors. We
                figured having a research mindset to go along with the brilliant
                academic students we have, will be a good combination. As
                innovation is the recipe for sure shot success of any country,
                we decided to focus our efforts towards that direction. We had
                series of meetings with KMC Principal, Dr Mohan Das, and other
                key people on the ground.
                <br />
                <br />
                It was decided to work on increasing research activities in the
                campus by making the student, the center point of focus. In the
                first edition of KMC Research Day, for the first time, we
                witnessed students from all over India come to our campus and
                present the latest research studies in poster and podium
                presentation format. From more than 100 college entries, we
                finalized 10 student groups in each category to come and
                showcase those research topics. With these attempts, we are
                trying to expose KMC students to happenings around the country,
                which will in turn set them up for more interest in the research
                during the college days itself.
                <br />
                <br />
                This will strengthen their CV&quot; s, harness their writing
                skills, team building skills and leadership skills. World is
                changing and we need our students to be competitive and prepare
                themselves for those academic changes in the field of medicine.
              </li>
            </ul>
          </div>
          <div className="flex gap-3">
            <ul className="p-3">
              <li className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-10 items-center mb-4">
                <div className="mb-2 rounded grid place-items-center p-2 bg-white/5 col-span-3">
                  <img
                    className=" object-cover h-full w-full aspect-square"
                    src="/dr_anupama.jpeg"
                    alt="alumni dr anupama"
                  />
                </div>
                <ul className="ml-3 col-span-7">
                  <li className="flex items-center gap-3">
                    <span className=" font-semibold text-red-200 text-sm">
                      2//
                    </span>{" "}
                    <p className=" font-semibold text-xl">
                      Dr Anupama Gotimukula
                    </p>
                  </li>
                  <li className=" ml-8">MD Pediatric Anesthesiology</li>
                  <li className=" ml-8 mt-3">San Antonio, TX, USA</li>
                </ul>
              </li>
              <li>
                <span className=" font-serif text-5xl font-semibold">
                  &quot;
                </span>
                Distinguished guests, esteemed faculty, and future medical
                leaders, This journey began a year ago when a group of dedicated
                alumni from around the world gathered virtually to brainstorm
                ways to elevate our beloved institution, the University of
                Medical Sciences. We realized that to place our university among
                the top medical schools globally, we needed to significantly
                boost our research activities and foster a culture of
                innovation.
                <br />
                <br />
                Our discussions revealed a critical gap—none of the medical
                colleges in our region ranked among the top 10 in India. This
                was a wake-up call and the catalyst for our mission. Over the
                past year, through countless meetings and strategic planning
                sessions with the university leadership, including our dynamic
                Principal, Dr. Priya Sinha, we formulated a comprehensive plan
                to make research an integral part of the student experience.
                <br />
                <br />
                Today marks the fruition of those efforts. The International
                Medical Research Conference is not just an event but a movement
                towards excellence. We have students from across the nation and
                beyond presenting their groundbreaking research. This platform
                provides an invaluable opportunity for our students to learn,
                grow, and be inspired by the innovative work being done by their
                peers. Out of numerous submissions, we have carefully selected
                the most promising research projects to be showcased here today.
                <br />
                <br />
                By encouraging our students to engage in research, we aim to
                equip them with skills that go beyond the classroom—critical
                thinking, problem-solving, teamwork, and leadership. These are
                the skills that will prepare them for the ever-evolving
                landscape of medicine. We believe that this conference is a
                significant step towards creating a research-oriented mindset
                and building a stronger, more vibrant academic community.
                <br />
                <br />
                Thank you for your commitment and participation. Together, we
                are shaping the future of medical education and research.
              </li>
            </ul>
          </div>
          <div className="flex gap-3">
            <ul className="p-3">
              <li className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-10 items-center mb-4">
                <div className="mb-2 rounded grid place-items-center p-2 bg-white/5 col-span-3">
                  <img
                    className=" object-cover h-full w-full aspect-square"
                    src="/dr_venu.jpeg"
                    alt="alumni dr venu"
                  />
                </div>
                <ul className="ml-3 col-span-7">
                  <li className="flex items-center gap-3">
                    <span className=" font-semibold text-red-200 text-sm">
                      3//
                    </span>{" "}
                    <p className=" font-semibold text-xl">Dr Venu G. Bathini</p>
                  </li>
                  <li className=" ml-8">MD Hematology/Oncology</li>
                  <li className=" ml-8 mt-3">
                    Mass General Brigham Community Physicians Associate
                    Professor, Univ. of Massachusetts
                  </li>
                </ul>
              </li>
              <li>
                <span className=" font-serif text-5xl font-semibold">
                  &quot;
                </span>
                Dear colleagues, students, and honored guests,
                <br />
                <br />
                This event is the culmination of a vision that began a year ago
                when a few of us alumni, driven by a shared passion for our alma
                mater, decided it was time to propel our institution into the
                ranks of the finest medical schools in the country. We convened
                multiple times across different time zones, bringing together
                alumni from Australia, Canada, and India to deliberate on how to
                enhance the research capabilities of our university.
                <br />
                <br />
                Our motivation was sparked by a stark reality: none of the
                medical colleges in our home state were listed among the top 10
                in India. This realization ignited a determination to change the
                status quo. We collaborated closely with the university
                administration, including our esteemed Principal, Dr. Kavita
                Rao, to lay down a strategic plan that places research at the
                heart of our educational ethos.
                <br />
                <br />
                Today, as we gather for the National Medical Innovation Summit,
                we witness the beginning of a new chapter. This summit has
                attracted bright minds from all over India, eager to present
                their innovative research projects. After a rigorous selection
                process, we have chosen outstanding presentations that highlight
                the cutting-edge work being done by our students. This event
                serves as a platform for them to gain exposure, receive
                feedback, and draw inspiration from one another.
                <br />
                <br />
                Our goal is to instill a robust research culture among our
                students, encouraging them to think critically and creatively.
                The skills they develop through research—analytical thinking,
                collaboration, and leadership—are essential for their future
                careers in medicine. This summit is not just about recognizing
                individual achievements but about fostering a collaborative
                environment that nurtures academic and professional growth.
                <br />
                <br />
                We are grateful for your support and participation. Together,
                let us pave the way for a brighter, more innovative future in
                medical education and research.
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
