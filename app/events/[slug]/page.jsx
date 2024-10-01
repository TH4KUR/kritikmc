import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Events",
};
const data = {
  "amboss-workshop": {
    rules: [
      <>
        <p className="mb-4">
          At the AMBOSS workshop, we offer a range of personalized services to
          enhance your USMLE preparation:
        </p>
        <ul className=" *:mb-2 !text-gray-200">
          <li>
            <strong>1) one-on-one Guidance:</strong> Gain personalized insights
            with an NBME expert who will provide tailored advice to support your
            preparation.
          </li>
          <li>
            <strong>2) Efficiency through Hacks</strong> : Just as we use life
            hacks to simplify daily tasks, our experts will introduce strategies
            like pattern recognition to streamline your study process.
          </li>
          <li>
            <strong>3) Resume Enhancement</strong> : KRITI, in collaboration
            with our USA NRI alumni, will significantly boost your resume,
            providing you with a competitive edge.
          </li>
          <li>
            <strong>4) Flexible Learning Options</strong> : To suit your
            convenience, AMBOSS sessions are available both online and offline.
          </li>
          <li>
            <strong>5) Global Perspective</strong> : Many candidates mistakenly
            view fellow Indians as their only competition. Our sessions will
            provide you with a broader, more accurate perspective on the global
            landscape of USMLE.
          </li>
          <li>
            <strong>6) Current Exam Insights</strong> : Unlike other platforms
            that rely on past exam experiences, AMBOSS provides up-to-date
            guidance tailored to the current USMLE format, ensuring you stay
            ahead of the curve.
          </li>
          <li>
            <strong>7) Time-Saving Strategies</strong> : No more wasting hours
            researching preparation methods or seeking advice from various
            forums and coaches. This workshop will help you develop an efficient
            study plan, saving you valuable time.
          </li>
          <li>
            <strong>8) Balancing University and USMLE Prep</strong> : Struggling
            to balance your university workload with USMLE preparation? Our
            sessions will help you create a seamless schedule to manage all your
            commitments effectively.
          </li>
          <li>
            <strong>9) Time-Limited Preparation</strong> : Worried about
            preparing in a short timeframe? Our experts will help you craft a
            realistic and achievable study plan, even if your exam date is only
            a few months away.
          </li>
          <li>
            <strong>10) Maximizing Exam Day</strong> : You{"'"}ve prepared well,
            but are you ready to fully utilize the 8-hour exam duration? AMBOSS
            will teach you strategies to ensure you perform at your best on the
            big day.
          </li>
          <li>
            <strong>11) Cost-Effective</strong> : Instead of spending $40 on
            generic counseling sessions, join our AMBOSS workshop for just ₹550.
            Get personalized, actionable strategies designed to meet your unique
            needs without breaking the bank.
          </li>
        </ul>
        <p className="mt-4">
          Let AMBOSS help you achieve your goals with expert guidance and an
          approach that{"'"}s tailored for success!
        </p>
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
        <>
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
        </>
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
            {params.slug != "amboss-workshop"
              ? makeTitle(params.slug)
              : makeTitle(params.slug).split(" ")[0].toUpperCase() +
                " " +
                makeTitle(params.slug).split(" ")[1]}
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
