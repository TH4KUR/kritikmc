import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { buildMetadata } from "@/app/lib/metadata";
import { getEventBySlug } from "@/app/lib/getEventsData";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
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
      <blockquote className="border-l-4 border-accent2 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2 my-3">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start justify-start">
        <i className="before:size-[0.3rem] before:bg-slate-50 before:rounded-full before:inline-block mr-2 ml-2 self-start"></i>
        <span>{children}</span>
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
          className="text-accent hover:underline"
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
          src={urlFor(value).width(800).url()}
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
            <h1 className="text-3xl font-semibold mb-4 border-l-4 pl-3 border-accent2">
              Event Not Found
            </h1>
            <p>The event you{"'"}re looking for could not be found.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />

      <main className="bg-[#090b14] relative text-gray-50 px-2 py-10">
        <div className="max-w-screen-md mx-auto">
          {/* Event Header */}
          <h1 className="text-3xl font-semibold mb-2 border-l-4 pl-3 border-accent2">
            {event.eventName}
          </h1>

          {event.eventSlogan && (
            <p className="text-lg text-gray-300 mb-4 pl-3 italic">
              {event.eventSlogan}
            </p>
          )}

          {event.eventDesc && (
            <p className="text-gray-200 mb-6 pl-3">{event.eventDesc}</p>
          )}

          {/* Rules Section */}
          {event.rules && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#ffeedd] mb-3">
                Rules & Guidelines
              </h2>
              <div className="prose prose-invert max-w-none">
                <PortableText
                  value={event.rules}
                  components={portableTextComponents}
                />
              </div>
            </div>
          )}

          {/* Prizes Section */}
          {event.prizes && event.prizes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#ffeedd] mb-3">
                Prizes
              </h2>
              <ul className="space-y-2 list-disc">
                {event.prizes.map((prize, idx) => {
                  const labels = ["Winner", "1st Runner Up", "2nd Runner Up"];
                  return (
                    <li key={idx} className="flex items-start">
                      <i className="before:size-[0.3rem] before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                      <p>
                        <strong>{labels[idx] || `Position ${idx + 1}`}:</strong>{" "}
                        {prize.startsWith("₹") ||
                        prize.toLowerCase().includes("prize")
                          ? prize
                          : `₹${prize}`}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Contacts Section */}
          {event.contacts && event.contacts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#ffeedd] mb-3">
                Contact Information
              </h2>
              <ul className="space-y-2">
                {event.contacts.map((contact, idx) => (
                  <li key={idx} className="flex items-start">
                    <i className="before:size-[0.3rem] before:bg-slate-50 before:rounded-full before:inline-block mr-2"></i>
                    <p>
                      <strong>{contact.name}:</strong>{" "}
                      <a
                        href={`tel:+91${contact.phone}`}
                        className="text-accent hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default EventPage;
