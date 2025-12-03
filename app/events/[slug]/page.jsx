import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { buildMetadata } from "@/app/lib/metadata";
import { getEventBySlug } from "@/app/lib/getEventsData";
import { PortableText } from "@portabletext/react";
import { imageBuilder, urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const event = await getEventBySlug(slug);

  if (!event) {
    return buildMetadata({
      title: "Event Not Found",
      description: "The requested event could not be found.",
      path: `/events/${slug}`,
    });
  }

  const openGraphImage = event.eventImg
    ? urlForImage(event.eventImg)
    : undefined;

  return buildMetadata({
    title: `${event.eventName} Event`,
    description:
      event.eventDesc ||
      `Rules, format, and prize details for ${event.eventName} at Kriti by Kakatiya Medical College.`,
    path: `/events/${slug}`,
    keywords: [
      `${event.eventName} Kriti`,
      "Kakatiya Medical College events",
      "medical competitions Telangana",
    ],
    openGraphImage,
  });
}

// Portable Text components for custom rendering
const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-3 mt-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-2 mt-4 text-[#ffeedd]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mb-2 mt-3 text-[#ffeedd]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-rose-5002 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 my-4 list-none pl-0">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-base">
        <span
          className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-5002 flex-shrink-0"
          aria-hidden="true"
        ></span>
        <span className="text-gray-100 leading-relaxed">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#ffeedd]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-rose-500 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <Image
          src={urlForImage(value)}
          alt={value.alt || "Event image"}
          width={800}
          height={400}
          className="rounded-lg my-4 w-full"
        />
      );
    },
  },
};

async function EventPage({ params }) {
  const slug = params.slug;
  const event = await getEventBySlug(slug);

  if (!event) {
    return (
      <>
        <Nav />
        <main className="bg-[#090909] relative text-gray-50 px-2 py-10">
          <div className="max-w-screen-md mx-auto">
            <h1 className="text-3xl font-semibold mb-4 border-l-4 pl-3 border-rose-5002">
              Event Not Found
            </h1>
            <p>The event you{"'"}re looking for could not be found.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const heroImage = event.eventImg ? urlForImage(event.eventImg) : null;

  const prizeLabel = (idx) => {
    const labels = ["Winner", "1st Runner Up", "2nd Runner Up"];
    return labels[idx] || `Position ${idx + 1}`;
  };

  return (
    <>
      <Nav />

      <main className="bg-[#020210] relative text-gray-50 px-4 py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                Kriti Event Spotlight
              </div>
              <h1 className="mt-5 text-4xl font-semibold text-white md:text-5xl">
                {event.eventName}
              </h1>
              {event.eventSlogan && (
                <p className="mt-3 text-lg text-white/80 italic">
                  “{event.eventSlogan}”
                </p>
              )}
              {event.eventDesc && (
                <p className="mt-6 text-base leading-relaxed text-white/70">
                  {event.eventDesc}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {event.prizes?.length ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M7 4h10a2 2 0 0 1 2 2v3a5 5 0 0 1-5 5v2h2a1 1 0 1 1 0 2h-2v2h3a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h3v-2H8a1 1 0 1 1 0-2h2v-2a5 5 0 0 1-5-5V6a2 2 0 0 1 2-2Zm0 2v3a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V6H7Z" />
                    </svg>
                    Prize pool ready
                  </span>
                ) : null}
                {event.contacts?.length ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.37-.277.54-.739.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                    Reach out anytime
                  </span>
                ) : null}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={event.eventName}
                  width={1200}
                  height={900}
                  priority
                  className="h-full max-h-[420px] w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-rose-500/40 via-transparent to-rose-5002/40 p-8 text-center">
                  <span className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
                    Visual coming soon
                  </span>
                  <p className="text-lg text-white/80">
                    Organising team will upload the official poster shortly.
                  </p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-right text-xs uppercase tracking-[0.2em] text-white/70">
                Kriti {new Date().getFullYear()}
              </div>
            </div>
          </div>

          {/* Rules Section */}
          {event.rules && (
            <section className="rounded-3xl border border-white/10 bg-[#0b0f1a] p-8 shadow-inner shadow-black/40">
              <div className="flex items-center gap-3 text-[#ffeedd]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75A2.25 2.25 0 0 0 14.25 4.5h-4.5A2.25 2.25 0 0 0 7.5 6.75V10.5m9 0h3.375c.621 0 1.125.504 1.125 1.125V15a2.25 2.25 0 0 1-2.25 2.25H15m1.5-6.75h-9m0 0H4.125C3.504 10.5 3 11.004 3 11.625V15a2.25 2.25 0 0 0 2.25 2.25H9m6 0v1.875c0 .621-.504 1.125-1.125 1.125h-3.75A1.125 1.125 0 0 1 9 19.125V17.25m6 0H9"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Official Guidelines
                  </p>
                  <h2 className="text-2xl font-semibold">Rules &amp; Format</h2>
                </div>
              </div>
              <div className="prose prose-invert mt-6 max-w-none">
                <PortableText
                  value={event.rules}
                  components={portableTextComponents}
                />
              </div>
            </section>
          )}

          {/* Prizes Section */}
          {event.prizes && event.prizes.length > 0 && (
            <section className="grid gap-5 md:grid-cols-2">
              {event.prizes.map((prize, idx) => (
                <div
                  key={`${prize}-${idx}`}
                  className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/50">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 font-semibold text-lg text-[#ffeedd]">
                      {idx + 1}
                    </span>
                    {prizeLabel(idx)}
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {typeof prize === "string" && prize.match(/^[₹Rs]/i)
                      ? prize
                      : typeof prize === "number"
                        ? `₹${prize}`
                        : prize}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Contacts Section */}
          {event.contacts && event.contacts.length > 0 && (
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M2.25 6.75C2.25 15.008 8.992 21.75 17.25 21.75H19.5A2.25 2.25 0 0 0 21.75 19.5v-1.372a1.125 1.125 0 0 0-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a.75.75 0 0 1-.807.254 12.04 12.04 0 0 1-7.143-7.143.75.75 0 0 1 .254-.807l1.293-.97a1.125 1.125 0 0 0 .417-1.173L7.966 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Event Coordinators
                  </p>
                  <h2 className="text-2xl font-semibold text-white">
                    Contact Information
                  </h2>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {event.contacts.map((contact, idx) => {
                  contact.name = contact?.name.trim();
                  contact.phone = contact?.phone.trim();

                  return (
                    <article
                      key={`${contact.name}-${idx}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#080b13] p-4 text-sm"
                    >
                      <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                        {contact.name?.[0]?.toUpperCase() || "?"}
                      </span>
                      <div>
                        <p className="text-base font-semibold text-white">
                          {contact.name}
                        </p>
                        <a
                          href={`tel:+91${contact.phone}`}
                          className="mt-1 inline-flex items-center gap-1 text-sm text-rose-500 hover:text-rose-500/80"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
                            <path d="M3 5.25C3 4.007 4.007 3 5.25 3h1.372c.516 0 .966.351 1.091.852l.796 2.985a1.125 1.125 0 0 1-.417 1.173l-1.293.97c-.376.282-.542.769-.38 1.21a12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l2.985.796c.5.125.852.575.852 1.091V18.75A2.25 2.25 0 0 1 18.75 21h-1.5C8.268 21 3 15.732 3 9.75V5.25Z" />
                          </svg>
                          +91 {contact.phone}
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default EventPage;
