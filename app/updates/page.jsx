import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SecondaryHero from "../components/SecondaryHero";

const improvementHighlights = [
  {
    title: "Enhanced Carousel",
    description:
      "The carousel showcasing information about our patrons and speakers has been redesigned for better clarity and visual appeal.",
  },
  {
    title: "Revamped Events Page",
    description:
      "The Events page has undergone a complete overhaul to provide participants with clearer, more comprehensive details, thereby minimizing confusion.",
  },
  {
    title: "Updated Registration Page & Form",
    description:
      "The Registration section has been refined, and participants can now select their preferred mode of participation—Active, Passive, or Workshop.",
  },
  {
    title: "Duplicate Entry Prevention",
    description:
      "The Registration form now restricts users from using the same email ID or mobile number more than once. This prevents duplicate registrations, as each Delegate ID is linked to a unique email ID or mobile number and is generated prior to payment.",
  },
  {
    title: "Delegate ID Retrieval System",
    description:
      "To avoid issues arising from misplaced Delegate IDs, we have introduced a system that allows participants to retrieve their IDs using their credentials. They can also check their payment verification status through the same system.",
  },
];

const verificationOptions = [
  {
    title: "Recommended Verification",
    body: "After completing the payment, participants can enter their UPI Transaction ID. The system then verifies it with the data received through the KRITI mobile app for near-instant confirmation.",
  },
  {
    title: "Alternative Verification",
    body: "If participants are unable to verify using the Transaction ID, the traditional method of uploading a payment screenshot remains available for manual review.",
  },
];

const page = () => {
  return (
    <>
      <Nav />
      <SecondaryHero
        title={"Updates"}
        body={
          "Take a closer look at the experience improvements and the brand-new Kriti Payments Gateway 2.0."
        }
      />

      <main className="bg-white/50 px-4 py-12 md:px-8 lg:px-0">
        <section className="max-w-5xl mx-auto space-y-10 text-[#2a2a2a]">
          <p className="text-lg md:text-xl leading-relaxed text-[#444]">
            We have implemented several significant improvements to both the
            design and functionality of the website. The key updates are as
            follows:
          </p>

          <ol className="space-y-6">
            {improvementHighlights.map((item, index) => (
              <li
                key={item.title}
                className="rounded-3xl border border-[#f3d4d8] bg-white/95 p-6 shadow-sm backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b1495b]">
                  Update {index + 1}
                </p>
                <h3 className="text-2xl font-semibold text-[#1e1e1e]">
                  <em>{item.title}</em>
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#4c4c4c]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          <article className="rounded-3xl border border-[#c5e7e1] bg-[#f3fffb] p-6 md:p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Kriti Payments Gateway 2.0
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#143a31]">
              The most important update this year
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#28594e]">
              The most important update to the website this year is our own
              payments system. Once the Delegate ID is generated, participants
              must confirm their registration by paying the required
              registration fee through Kriti Payments Gateway 2.0.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#28594e]">
              To ensure a smoother payment experience, we have developed a
              dedicated Android app for Kriti. This app reads the transaction
              messages on the user’s phone and uses them to automatically
              validate payments.
            </p>

            <p className="mt-4 text-base font-semibold leading-relaxed text-[#1f4f46]">
              Participants will be able to choose between two verification
              methods:
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {verificationOptions.map((option) => (
                <div
                  key={option.title}
                  className="rounded-2xl bg-white/70 p-5 ring-1 ring-[#c5e7e1]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#1b4f45]">
                    Verification Option
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#103731]">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-[#325f55]">
                    {option.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-base leading-relaxed text-[#28594e]">
              Upon successful verification, participants will receive a
              confirmation email acknowledging the completion of their
              registration.
            </p>
          </article>

          <p className="text-base md:text-lg leading-relaxed text-[#444]">
            All these enhancements have been implemented based on the feedback
            received last year. We believe these improvements will significantly
            reduce queries and confusion related to the registration process and
            help build greater trust and confidence among participants for the
            upcoming event.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
