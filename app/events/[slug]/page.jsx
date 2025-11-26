import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { buildMetadata } from "@/app/lib/metadata";

/* Final data object — poster-presentation and paper-presentation contain
   two arrays: rules.ug and rules.pg (Option B). All rules & contacts from brochure. */

const data = {
  "poster-presentation": {
    rules: {
      ug: [
        <>
          <strong>UG POSTER RULES —</strong>
          <br />
          1) A team should comprise of a maximum of <strong>
            3 members
          </strong>{" "}
          (1 delegate for presentation, questions can be answered by either).
        </>,
        <>
          2) A team may consist of members from the same college or from
          different colleges.
        </>,
        <>
          3) Only e-posters in landscape orientation with a resolution of{" "}
          <strong>1920×1080 pixels</strong> will be accepted.
        </>,
        <>
          4) Abstracts to not exceed <strong>300 words</strong>, to be sent via
          email by <strong>14th December, 2025</strong> to{" "}
          <strong>UGposter.kritiwgl@gmail.com</strong>, following which
          finalists will be announced by <strong>25th December, 2025</strong>.
        </>,
        <>
          5) Finalists will be allotted a total of <strong>5 minutes</strong> (3
          minutes to present and 2 minutes for questions).
        </>,
        <>
          <strong>Contacts:</strong> M Arun Kumar: <strong>8688644831</strong>,{" "}
          Sreeja Kothur: <strong>9030945816</strong>
        </>,
      ],
      pg: [
        <>
          <strong>PG POSTER RULES —</strong>
          <br />
          1) Open to postgraduate students; only individual entries allowed.
        </>,
        <>
          2) Only e-posters in landscape orientation with a resolution of{" "}
          <strong>1920×1080 pixels</strong> will be accepted.
        </>,
        <>
          3) Abstracts to not exceed <strong>300 words</strong>, to be sent via
          email by <strong>14th December, 2025</strong> to{" "}
          <strong>PGposter.kritiwgl@gmail.com</strong>, following which
          finalists will be announced by <strong>25th December, 2025</strong>.
        </>,
        <>
          4) Finalists will be allotted a total of <strong>7 minutes</strong> (5
          minutes to present and 2 minutes for questions).
        </>,
        <>
          <strong>Contacts:</strong> Dr. Merlyn Anthony:{" "}
          <strong>6302888539</strong>, Javali Garikapati:{" "}
          <strong>6303765915</strong>
        </>,
      ],
    },
    prizes: [15000, 10000],
  },

  "paper-presentation": {
    rules: {
      ug: [
        <>
          <strong>UG PAPER RULES —</strong>
          <br />
          1) Team should comprise of a maximum of <strong>2 members</strong>,
          one delegate is allowed to present the paper; questions can be
          answered by either team member.
        </>,
        <>
          2) A team may consist of members from the same college or from
          different colleges.
        </>,
        <>
          3) Delegates are expected to send the abstracts (not more than{" "}
          <strong>300 words</strong>) by <strong>14th December, 2025</strong> in
          the form of word document (.doc or .docx) to{" "}
          <strong>ugpaperkritiwgl@gmail.com</strong> and selected abstracts will
          be announced by <strong>25th December, 2025</strong>.
        </>,
        <>
          4) Presentation is expected to be in the form of power point
          presentation (.ppt or .pptx file) not exceeding{" "}
          <strong>18 slides</strong> (excluding title & thank you slide) that is
          to be submitted by <strong>4th January, 2026</strong>.
        </>,
        <>
          5) Each presenter will be given a total of <strong>9 minutes</strong>{" "}
          — 6 minutes for presenting the case and 3 minutes for answering the
          questions from judges and audience.
        </>,
        <>
          <strong>Contacts:</strong> Dr. Spoorthy Reddy:{" "}
          <strong>7702161336</strong>, Vatluri Sai Sarath:{" "}
          <strong>7075304642</strong>
        </>,
      ],
      pg: [
        <>
          <strong>PG PAPER RULES —</strong>
          <br />
          1) Open to all postgraduate students of medical and allied health
          sciences recognised by the Indian medical association.
        </>,
        <>2) Only Individual Entries are allowed (no group entries).</>,
        <>
          3) The research article must be an original research conducted by the
          participant who must be an author with substantial contribution to the
          study.
        </>,
        <>
          4) Systematic Reviews and meta-analyses will also be accepted, along
          with clinical studies. The research must be completed at the time of
          submission of the abstract.
        </>,
        <>
          5) The Ethical Committee approval certificate / attestation from the
          head of the institute must be submitted along with the abstract
          (except for Systematic Reviews and Meta-analyses).
        </>,
        <>
          6) Delegates are expected to send the abstracts (not more than{" "}
          <strong>300 words</strong>) by <strong>14th December, 2025</strong> in
          the form of word document (.doc or .docx) to{" "}
          <strong>pgpaperkritiwgl@gmail.com</strong> and selected abstracts will
          be announced by <strong>25th December, 2025</strong>.
        </>,
        <>
          7) Presentation is expected to be in the form of power point
          presentation and each presenter will be given a total of{" "}
          <strong>9 minutes</strong> (6 minutes for presenting the case and 3
          minutes for the Q & A round).
        </>,
        <>
          <strong>Contacts:</strong> Dr. Grandi Sai Aneesh:{" "}
          <strong>7702943703</strong>, Jothika Balakrishnan:{" "}
          <strong>8106025326</strong>
        </>,
      ],
    },
    prizes: [15000, 10000],
  },

  jeopardy: {
    rules: [
      <>
        1) Jeopardy will be conducted in three rounds:
        <br />• <strong>Preliminary Round 1:</strong> Conducted through a
        Google-based question format. Each participant may submit only one form
        in their selected category.
        <br />• <strong>Preliminary Round 2:</strong> The format for this round
        will be revealed after the completion of Round 1. 12 participants will
        be shortlisted for the Final Round.
        <br />• <strong>Final Round:</strong> Conducted offline on the day of
        the event. 4 teams, each consisting of 3 participants, will be formed
        randomly. The format for the final round will be announced after
        Preliminary Round 2.
      </>,
      <>
        2) <strong>Categories for Registration:</strong>
        <br />
        • Preclinical: 1st and 2nd year students
        <br />
        • Paraclinical: 2nd and 3rd year students
        <br />• Clinical: Final year students and interns
      </>,
      <>
        <strong>Contacts:</strong> Dr. Geethika Chalumuri:{" "}
        <strong>9652048636</strong>, Aarush Thakur: <strong>8700621534</strong>,
        Kunumalla Lokesh: <strong>7337006714</strong>
      </>,
    ],
    prizes: ["Prizes worth above Rs.1,00,000"],
  },

  hackathon: {
    rules: [
      <>
        1) Delegates participate in teams of <strong>3-5 members</strong>.
      </>,
      <>
        2) A team may consist of members from the same college or from different
        colleges.
      </>,
      <>
        3) A health problem statement will be released to which the teams are
        required to come up with solutions.
      </>,
      <>
        4) Solutions to be sent in the form of an abstract with no more than{" "}
        <strong>500 words</strong> before <strong>14th December, 2025</strong>{" "}
        to <strong>hackathon@kritikmc.com</strong>.
      </>,
      <>
        5) Top 5 finalists will be declared on{" "}
        <strong>25th December, 2025</strong> following which they are required
        to present their solutions in AV format (mp4 or .pptx) on the day of the
        event.
      </>,
      <>
        6) Presentation will be for no longer than <strong>6 minutes</strong>{" "}
        and will be followed by <strong>3 minutes</strong> of Q & A round.
      </>,
      <>
        <strong>Contacts:</strong> Rashi Agarwal: <strong>8287930983</strong>,
        Pooja Mehra: <strong>9643212202</strong>
      </>,
    ],
    prizes: [15000, 10000, 5000],
  },

  symposium: {
    rules: [
      <>
        1) It is a team event comprising of a minimum of{" "}
        <strong>6 people</strong> and a maximum of <strong>12 people</strong>{" "}
        (4-6 speakers and at least 1 techie). Intercollegiate teams are allowed.
      </>,
      <>
        2) Each team should select a medically relevant research topic and
        complete literature review, study design, data collection and analysis.
      </>,
      <>
        3) They must submit an abstract based on which selection for the final
        round will take place.
      </>,
      <>
        4) The abstracts should comprise of a maximum of{" "}
        <strong>1500 words</strong> (from title to references) to be mailed to{" "}
        <strong>symposiumkritiwgl@gmail.com</strong> before{" "}
        <strong>14th December, 2025</strong>. Selected abstracts will be
        revealed on <strong>25th December, 2025</strong>.
      </>,
      <>
        5) Selected teams must prepare an audiovisual presentation of their
        research, not exceeding <strong>10 min</strong>, which will be presented
        in the final round, after which <strong>5 minutes</strong> will be
        allocated for the Q & A segment.
      </>,
      <>
        6) Rules regarding the content of the abstracts, criteria for the
        abstract, and screening will be conveyed to the participants in detail
        after registration.
      </>,
      <>
        <strong>Contacts:</strong> K. Sai Varun Reddy:{" "}
        <strong>9398059753</strong>, G. Ananya: <strong>8125605375</strong>,
        Vishnu Pappu: <strong>8897474396</strong>
      </>,
    ],
    prizes: [25000, 15000, 10000],
  },

  "med-exibition-(kmc-students-only)": {
    // NOTE: slug spelled as requested (typo preserved)
    rules: [
      <>1) Only open to KMC Students (2023, 2024 and 2025 batches).</>,
      <>
        2) Students will have to submit abstracts enlisting working principle of
        the model, therapeutic importance, and materials used to{" "}
        <strong>medexkriti@gmail.com</strong> by{" "}
        <strong>14th December, 2025</strong>.
      </>,
      <>
        3) Based on the abstracts, a total of <strong>10 teams</strong> will be
        selected to present their models.
      </>,
      <>4) Stalls will be provided in which models can be placed.</>,
      <>
        5) Students will be given <strong>4 minutes</strong> to present followed
        by a <strong>2 minutes</strong> Q & A round on final days.
      </>,
      <>
        6) Students will participate in teams of <strong>3 delegates</strong> (1
        delegate will be allowed to present the model, while all 3 delegates can
        participate in the Q & A round).
      </>,
      <>
        <strong>Contacts:</strong> Ch. Phani Sri Sowmya:{" "}
        <strong>8919833952</strong>, S. Jyothsna: <strong>7995449950</strong>
      </>,
    ],
    prizes: [15000, 10000, 5000],
  },

  "surgical-skill-workshops": {
    rules: [
      <>
        1) Hands-on Surgical Skills Workshop covering suturing, instrument
        handling, knot-tying, and other essential minor surgical skills.
      </>,
      <>
        2) Registrations open soon and will be accepted on a first-come,
        first-served basis; limited seats.
      </>,
      <>
        3) Further details, timing, and participation rules will be announced on
        official channels (Instagram / site) as per brochure.
      </>,
      <>
        <strong>Notes:</strong> This is a practical, hands-on workshop — seats
        are limited and subject to registration rules mentioned above.
      </>,
    ],
    prizes: "N/A",
  },

  "cme-talks": {
    rules: [
      <>
        1) KRITI 3.0 will feature two exclusive CME talks on Day 2 by invited
        experts in their respective specialties.
      </>,
      <>
        2) Sessions will deliver valuable insights beneficial for
        Undergraduates, Postgraduates, and all medical enthusiasts.
      </>,
      <>
        3) <strong>CPD Points</strong> will be awarded to Postgraduates
        attending the CME sessions.
      </>,
      <>
        4) Speaker lineup and session topics will be announced soon on official
        channels.
      </>,
    ],
    prizes: "N/A",
  },

  "campus-ambassador": {
    rules: [
      <>
        1) Campus Ambassador Programme — represent KRITI at your college; act as
        liaison between college and KRITI organising team.
      </>,
      <>
        2) Promotion: Facilitate registrations and promote events within your
        campus.
      </>,
      <>
        3) Networking: Interact with peers, organisers, and distinguished
        guests.
      </>,
      <>
        4) Recognition & Benefits: Free registration for ambassadors who bring
        in {">"} 15 registrations; free Surgical Skills Workshop entry for {">"}{" "}
        30 registrations (see brochure for thresholds & details).
      </>,
      <>
        <strong>Contact:</strong> Vattam Bhargav: <strong>8309785132</strong>,
        General enquiries: <strong>8520924668</strong>
      </>,
    ],
    prizes: "Recognition & benefits per brochure",
  },
};

const eventSummaries = {
  "poster-presentation":
    "UG & PG poster submission instructions, contact details, and presentation rules as per brochure.",
  "paper-presentation":
    "UG & PG paper submission guidelines, ethics and presentation timelines from the brochure.",
  jeopardy:
    "Jeopardy rules, rounds, registration categories and contacts (single event covering all categories).",
  hackathon:
    "Hackathon guidelines: teams, submission, finalist presentations and contacts.",
  symposium:
    "Symposium: team composition, abstract rules, presentation timings and contacts.",
  "med-exibition-(kmc-students-only)":
    "Med-Ex display rules, abstract submission and presentation rules for KMC students.",
  "surgical-skill-workshops":
    "Hands-on surgical skills workshop details and registration notes.",
  "cme-talks": "CME talks info, CPD points and forthcoming speaker lineup.",
  "campus-ambassador":
    "Campus Ambassador programme details, referral thresholds and contacts.",
};

function makeTitle(name) {
  return name
    .split("-")
    .map((el) => (el ? el[0].toUpperCase() + el.slice(1) : ""))
    .join(" ");
}

function resolveEventTitle(slug) {
  if (slug === "amboss-workshop") {
    const words = makeTitle(slug).split(" ");
    return `${words[0].toUpperCase()} ${words[1]}`;
  }
  // special-case med-exibition slug to display nicer title
  if (slug === "med-exibition-(kmc-students-only)") {
    return "Med-Exhibition (KMC Students Only)";
  }
  // surgical-skill-workshops display nicer title
  if (slug === "surgical-skill-workshops") {
    return "Surgical Skill Workshops";
  }
  return makeTitle(slug);
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const eventData = data[slug];
  const eventTitle = resolveEventTitle(slug);
  const description =
    eventSummaries[slug] ||
    `Rules, format, and prize details for ${eventTitle} at Kriti by Kakatiya Medical College.`;

  return buildMetadata({
    title: `${eventTitle} Event`,
    description,
    path: `/events/${slug}`,
    keywords: [
      `${eventTitle} Kriti`,
      "Kakatiya Medical College events",
      "medical competitions Telangana",
    ],
  });
}

async function page({ params }) {
  // keep this fetch as a cache bypass demo (no-store)
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  const slug = params.slug;
  const event = data[slug];

  return (
    <>
      <Nav />

      <main className="bg-[#090909] relative text-gray-50 px-2 py-10">
        <div className="max-w-screen-md mx-auto">
          <h1 className=" text-3xl font-semibold mb-4 border-l-4 pl-3 border-accent2">
            {resolveEventTitle(slug)}
          </h1>
          <h3 className="text-lg font-semibold text-[#ffeedd]">
            {slug !== "amboss-workshop" ? "Rules" : "Information"}
          </h3>

          {/* If rules is an object with ug/pg -> render two blocks (Option B) */}
          {event?.rules &&
          typeof event.rules === "object" &&
          !Array.isArray(event.rules) ? (
            <>
              {/* UG block if present */}
              {event.rules.ug && (
                <>
                  <h4 className="text-md font-semibold mt-4 text-[#ffeedd]">
                    UG Rules
                  </h4>
                  <ul>
                    {event.rules.ug.map((rule, i) => (
                      <li
                        className="flex items-start justify-start mt-2"
                        key={`ug-${i}`}
                      >
                        <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                        <p>{rule}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* PG block if present */}
              {event.rules.pg && (
                <>
                  <h4 className="text-md font-semibold mt-5 text-[#ffeedd]">
                    PG Rules
                  </h4>
                  <ul>
                    {event.rules.pg.map((rule, i) => (
                      <li
                        className="flex items-start justify-start mt-2"
                        key={`pg-${i}`}
                      >
                        <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                        <p>{rule}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          ) : (
            // Normal rendering for slug.rules being an array
            <>
              <ul>
                {event?.rules?.map((rule, i) => (
                  <li className="flex items-start justify-start  mt-2" key={i}>
                    <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>{rule}</p>
                  </li>
                )) || <p>No rules available.</p>}
              </ul>
            </>
          )}

          {/* prelimRules (for events that have them) */}
          {event?.prelimRules ? (
            <>
              <h3 className="text-lg font-semibold text-[#ffeedd] mt-5">
                Prelims Rules
              </h3>
              <ul>
                {event.prelimRules.map((rule, i) => (
                  <li
                    className="flex items-start justify-start  mt-2"
                    key={`prelim-${i}`}
                  >
                    <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>{rule}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {/* finalsRules (for events that have them) */}
          {event?.finalsRules ? (
            <>
              <h3 className="text-lg font-semibold text-[#ffeedd] mt-5">
                Final Round Rules
              </h3>
              <ul>
                {event.finalsRules.map((rule, i) => (
                  <li
                    className="flex items-start justify-start  mt-2"
                    key={`finals-${i}`}
                  >
                    <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>{rule}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {/* Prizes */}
          {slug !== "amboss-workshop" && (
            <>
              <h3 className="text-lg font-semibold mt-5">Prizes</h3>
              <ul>
                <li className="flex mt-1">
                  <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                  <p>
                    <strong>Winner:</strong>{" "}
                    {typeof event?.prizes?.[0] === "string"
                      ? event?.prizes?.[0]
                      : event?.prizes?.[0] !== undefined
                        ? `₹${event.prizes[0]}`
                        : "TBA"}
                  </p>
                </li>

                {Array.isArray(event?.prizes) &&
                  event.prizes[1] !== undefined && (
                    <li className="flex mt-1">
                      <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                      <p>
                        <strong>1st Runner Up:</strong>{" "}
                        {typeof event.prizes[1] === "string"
                          ? event.prizes[1]
                          : `₹${event.prizes[1]}`}
                      </p>
                    </li>
                  )}

                {Array.isArray(event?.prizes) &&
                  event.prizes[2] !== undefined && (
                    <li className="flex mt-1">
                      <i className="before:size-2 before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                      <p>
                        <strong>2nd Runner Up:</strong>{" "}
                        {typeof event.prizes[2] === "string"
                          ? event.prizes[2]
                          : `₹${event.prizes[2]}`}
                      </p>
                    </li>
                  )}
              </ul>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default page;
