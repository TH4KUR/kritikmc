import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Events",
};
const data = {
  "amboss-workshop": {
    rules: [
      <>
        <p>
          In 2023, more than 50,000 students took the USMLE Step 1. Even more
          appeared for the USMLE Step 2. These students are not only from US,
          Canada and India, but around the world.
        </p>
        <br />
        <p>
          Which is why, with experience from 180+ countries, AMBOSS is hosting a
          USMLE Bootcamp for you!
        </p>
        <p className="my-4">
          <strong>Highlights</strong>
        </p>
        <ul className="ml-3 *:mb-2">
          <li>Intro to USMLE: What? Why? How? Of USMLE</li>
          <li>
            Insights into proven USMLE strategy: Understand what works and why,
            and -more importantly- what mistakes should IMGs avoid.
          </li>
          <li>Expert Guidance: Learn from an AMBOSS doctor and Q-writer</li>
          <li>
            Critical considerations: How an Indian MBBS student should adjust
            their everyday studying, to do well at local exams AND
            simultaneously increase their USMLE score-yield.
          </li>
        </ul>
        Speakers - 2024 Match Residents - Students who have passed Step 1 and
        Step 2 - NBME Experts - WHO, UN Delegates But most importantly, we will
        be solving YOUR doubts.
      </>,
    ],
    prizes: "NA",
  },
  "paper-presentation": {
    rules: [
      `Team should comprise of a maximum of 2 members , one delegate is allowed to present the paper , questions can be answered by either team members .`,
      `Delegates are expected to send the abstracts ( not more than 300 words) before 15th of september in the form of word document (.doc or.docx).`,
      `All abstracts will be screened.`,
      `Presentation is expected to be in the form of power point presentation (.ppt or .pptx file) not exceeding 18 slides that is to be submitted by 16th of October.`,
      `Each presenter will be given a total of 6 minutes ~4 minutes for presenting the case and 2 minutes for answering the questions from judges and audience.`,
      <>
        (Paper) Make sure you structure your abstract in the following headings:
        <br /> <strong>TITLE:</strong>
        <br /> <strong>PRESENTING AUTHOR:</strong>
        <br /> <strong>COLLEGE NAME OF PRESENTING AUTHOR:</strong>
        <br /> <strong>INTRODUCTION:</strong>
        <br /> <strong>AIMS AND OBJECTIVES:</strong>
        <br /> <strong>METHODOLOGY:</strong>
        <br /> <strong>RESULTS:</strong>
        <br /> <strong>DISCUSSION:</strong>
        <br /> <strong>CONCLUSION:</strong>
        <br /> <strong>No need of references</strong>
      </>,
    ],
    prizes: [15000, 10000],
  },
  "poster-presentation": {
    rules: [
      `Team should comprise of a maximum of 2 members (1 delegate for presentation, questions can be answered by either.)`,
      `Only digital poster in print , maximum size of 4ft* 3 ft will be accepted.`,
      `Only e- posters in landscape orientation with a resolution of 1920*1080 pixels will be accepted.`,
      `Abstracts to be sent via email by 15th of September following which finalists will be announced by 2nd of October.`,
      `Finalists will be allotef a total of 5 minutes (3 minutes to present and 2 minutes for questions by the jury.)`,
      <>
        (Poster) Make sure you structure your abstract in the following
        headings:
        <div>
          <br />
          (Original articles) <br /> <strong>TITLE:</strong> <br />
          <strong>PRESENTING AUTHOR:</strong>
          <br />
          <strong>COLLEGE NAME OF PRESENTING AUTHOR:</strong>
          <br />
          <strong>INTRODUCTION:</strong>
          <br />
          <strong>AIMS AND OBJECTIVES:</strong>
          <br />
          <strong>METHODOLOGY:</strong>
          <br />
          <strong>RESULTS:</strong>
          <br />
          <strong>DISCUSSION:</strong>
          <br />
          <strong>CONCLUSION:</strong>
          <br />
          <strong>No need of references</strong>
          <br />
          <br />
          (Case Reports)
          <br />
          <strong>TITLE:</strong>
          <br />
          <strong>PRESENTING AUTHOR:</strong>
          <br />
          <strong>COLLEGE NAME OF PRESENTING AUTHOR:</strong>
          <br />
          <strong>INTRODUCTION:</strong>
          <br />
          <strong>CASE DESCRIPTION:</strong>
          <br />
          <strong>DISCUSSION:</strong>
          <br />
          <strong>CONCLUSION:</strong>
          <br />
          <strong>No Need of References</strong>
        </div>
      </>,
    ],
    prizes: [15000, 10000],
  },
  debate: {
    rules: [
      `The event is to be conducted in two parts - prelims and finals.`,
      `Participants will be segregated into affirmatives and negatives debates on random basis.`,
    ],
    prelimRules: [
      `Motion for prelims will be released on 8th of September.`,
      `Participants to be participating asateam with one affirmative and one negative debater.`,
      `Videos of delegates to be send via email. 2 minutes will be given to each delegate.`,
      `Finalists will beannounced on 2nd October.`,
    ],
    finalsRules: [
      `Topic will be given 1 day before finals.`,
      `Each team will consists of 1 affirmative and 1 negative debater.`,
      `Speaker will be given 3 minutes to speak,followed by 1 minute of rebuttal.30 seconds for cross questioning if necessary.`,
    ],
    prizes: [15000, 10000],
  },
  symposium: {
    rules: [
      `It is a team event comprising of a minimum of 6 people and maximum of 12 people (comprising of 4-6 speakers and atleast 1 techie)`,
      `Teams to be selected based on reviewing of the abstracts. Screening of abstracts will replace the prelims.`,
      `Each team should selecta medically relevant research topic and complete literature review, study design, datacollection and analysis`,
      `Theabstracts should comprise ofa maximum of 1500 words (from title to references) before 9 am, 15th September. Selected abstracts will be revealed on 30th September.`,
      `Each team must preparean audio-visual presentation of their research together with script for the speakers who will be given atotal of 15 minutes (10 minutes for the presentation, 5 minutes for the Q and A round).`,
      `Rules regarding the content of the. Abstracts, criteria for the abstract.Screening will be conveyed to the participants in detail later.`,
    ],
    prizes: [25000, 15000, 10000],
  },
  hackathon: {
    rules: [
      `Delegates participate in teams of 3-5 members
A health problem statement will be released on 25th August to which the teams are required to come up with solutions.`,
      `Solutions to be sent in the form of an abstract with no more than 500 words before 15th of September.`,
      `Top 5 finalists to be declared on 2nd October 2024 following which they are required to present their solutions in AV format ( mp4 or. Pptx) on the day of the event.`,
      `Presentation willbbe for no longer than 6 minutes that will be followed by 3 minutes of Q and A round.`,
    ],
    prizes: [15000, 10000, 5000],
  },
  "med-exibition-(kmc-students-only)": {
    rules: [
      `Only open to KMC Students.`,
      `Students will participate in teams of 3 delegates. ( 1 delegate will beallowed to present the model whileall 3 delegates can participate in Q and A round)`,
      `A total of 10 teams will be selected to Present their models. Selection to be done based on their abstracts.`,
      `Stalls will be provided in which models can be placed.`,
      `Students will have to submitabstracts enlisting working principle of the model, therapeutic importanceand materials used.`,
      `Students will be given 4 minutes to Present followed by a2 minutes Q and A round.`,
    ],
    prizes: [15000, 10000, 5000],
  },
  "marrow's-jeopardy": {
    rules: [
      `Jeopardy will be conducted in three rounds: Preliminary Round, Rapid Fire Round Final Round`,
      <>
        Participants can register in one of the following categories: <br />
        • Preclinical: 1st and 2nd years <br />
        • Paraclinical: 2nd and 3rd years <br />• Clinical: Final years and
        interns
      </>,
      <>
        <strong className="font-semibold text-[#ffeedd]">
          Preliminary Round:
        </strong>{" "}
        <br />
        • Conducted using a Google-based question format. <br />• Each
        participant can submit only one form in their chosen category.
      </>,
      <>
        <strong className="font-semibold text-[#ffeedd]">
          Rapid Fire Round:
        </strong>{" "}
        <br />
        • Conducted online via a one-on-one Zoom call. <br />• Participants must
        answer a set number of questions within the given time.
      </>,
      <>
        <strong className="font-semibold text-[#ffeedd]">Final Round:</strong>{" "}
        <br />
        • Held offline on the day of the event. <br />• Consists of three
        segments: Jeopardy, Double Jeopardy, and Final Jeopardy
      </>,
    ],
    prizes: [`Prizes worth above Rs.1,00,000`],
  },
};
async function page({ params }) {
  function makeTitle(name) {
    return name
      .split("-")
      .map((el) => el[0].toUpperCase() + el.slice(1))
      .join(" ");
  }
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
  return (
    <>
      <Nav />

      <main className="bg-[#090909] relative text-gray-50 px-2 py-10">
        <div className="max-w-screen-md mx-auto">
          <h1 className=" text-3xl font-semibold mb-4 border-l-4 pl-3 border-accent2">
            {makeTitle(params.slug)}
          </h1>
          <h3 className="text-lg font-semibold text-[#ffeedd]">
            {params.slug != "amboss-workshop" ? "Rules" : "Information"}
          </h3>
          <ul>
            {data[params.slug]?.rules.map((rule, i) => (
              <li className="flex items-start justify-start  mt-2" key={i}>
                <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                <p>{rule}</p>
              </li>
            ))}
          </ul>
          {data[params.slug]?.prelimRules ? (
            <>
              <h3 className="text-lg font-semibold text-[#ffeedd] mt-5">
                Prelims Rules
              </h3>
              <ul>
                {data[params.slug]?.prelimRules.map((rule, i) => (
                  <li className="flex items-start justify-start  mt-2" key={i}>
                    <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>{rule}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            ""
          )}
          {data[params.slug]?.finalsRules ? (
            <>
              <h3 className="text-lg font-semibold text-[#ffeedd] mt-5">
                Final Round Rules
              </h3>
              <ul>
                {data[params.slug]?.finalsRules.map((rule, i) => (
                  <li className="flex items-start justify-start  mt-2" key={i}>
                    <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>{rule}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            ""
          )}

          {params.slug != "amboss-workshop" ? (
            <>
              <h3 className="text-lg font-semibold mt-5">Prizes</h3>
              <ul>
                <li className="flex mt-1">
                  <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                  <p>
                    <strong>Winner:</strong>{" "}
                    {typeof data[params.slug]?.prizes[0] === "string"
                      ? data[params.slug]?.prizes[0]
                      : `₹${data[params.slug]?.prizes[0]}`}
                  </p>
                </li>
                {data[params.slug]?.prizes[1] ? (
                  <li className="flex mt-1">
                    <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>
                      <strong>1st Runner Up:</strong> ₹
                      {data[params.slug]?.prizes[1]}
                    </p>
                  </li>
                ) : (
                  ""
                )}
                {data[params.slug]?.prizes[2] ? (
                  <li className="flex mt-1">
                    <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>
                      <strong>2nd Runner Up:</strong> ₹
                      {data[params.slug]?.prizes[2]}
                    </p>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </>
          ) : (
            ""
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default page;
