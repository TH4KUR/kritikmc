import React from "react";
import Link from "next/link";

const improvementHighlights = [
  {
    title: "Enhanced Carousel",
    description:
      "The carousel showcasing information about our patrons and speakers has been redesigned for better clarity and visual appeal.",
  },
  {
    title: "Revamped Events Page",
    description:
      "The Events page now provides clearer, more comprehensive details so participants never miss context.",
  },
  {
    title: "Updated Registration Page & Form",
    description:
      "Delegates can select Active, Passive, or Workshop participation with guidance built into every step.",
  },
  {
    title: "Duplicate Entry Prevention",
    description:
      "Each Delegate ID is tied to a unique email or mobile number. Duplicate registrations are blocked before payment.",
  },
  {
    title: "Delegate ID Retrieval System",
    description:
      "Participants can retrieve IDs using their credentials and review payment verification in the same flow.",
  },
];

const verificationOptions = [
  {
    title: "Recommended Verification",
    description:
      "Enter the UPI Transaction ID after payment so the KRITI mobile app can validate it automatically.",
    tag: "Fastest",
  },
  {
    title: "Alternative Verification",
    description:
      "Upload a payment screenshot when the Transaction ID is unavailable—the finance desk will review it manually.",
    tag: "Fallback",
  },
];

const Updates = () => {
  return (
    <section className="bg-bgSecondary px-4 py-16 text-bg">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-[3fr,2fr] lg:p-12">
        <div className="space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-400">
            Latest Updates
          </p>
          <div className="space-y-5">
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Built from last year’s feedback
            </h2>
            <p className="text-lg leading-relaxed text-bg/80 md:text-xl">
              We have implemented several significant improvements to both the
              design and functionality of the website. Here’s a snapshot before
              you dive into the detailed write-up.
            </p>

            <ol className="space-y-5">
              {improvementHighlights.map((item, index) => (
                <li
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4 text-bg/80">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em]">
                      #{index + 1}
                    </span>
                    <span className="size-2 rounded-full bg-accent" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    <em>{item.title}</em>
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-bg/80 md:text-lg">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent2"
            >
              Read the full update
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                fill="none"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </Link>
            <p className="text-sm font-medium tracking-wide text-bg/70">
              Last updated · Nov 2025
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <article className="rounded-3xl border border-white/15 bg-bgSecondary/60 p-6 shadow-inner shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-400">
              Kriti Payments Gateway 2.0
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white">
              The most important update this year
            </h3>
            <p className="mt-4 text-base leading-relaxed text-bg/80">
              Once the Delegate ID is generated, participants confirm their
              registration by paying the required fee through Kriti’s dedicated
              payments gateway. A companion Android app reads transaction
              messages on-device and validates them automatically.
            </p>
            <p className="mt-4 text-base leading-relaxed text-bg/80">
              Participants can then pick the verification path that matches
              their context:
            </p>
          </article>

          <ul className="space-y-4">
            {verificationOptions.map((option) => (
              <li
                key={option.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm transition hover:-translate-y-1 hover:border-accent/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-rose-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-400">
                    {option.tag}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-5 text-bg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </div>
                <h4 className="mt-4 text-2xl font-semibold text-white">
                  {option.title}
                </h4>
                <p className="mt-2 text-base leading-relaxed text-bg/80">
                  {option.description}
                </p>
              </li>
            ))}
          </ul>

          <p className="text-xs font-medium uppercase tracking-[0.35em] text-center text-bg/70">
            A confirmation email is sent as soon as verification is complete.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Updates;
