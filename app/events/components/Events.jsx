"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Arrow from "@/app/components/icons/Arrow";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.1 } },
};

const slugify = (value = "", fallback = "event") => {
  const safe = value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return safe || fallback;
};

function Events({ data = [] }) {
  const cardRefs = useRef({});
  const [activeSlug, setActiveSlug] = useState(null);

  const events = useMemo(
    () =>
      data.map((event, index) => ({
        ...event,
        slug: `${slugify(event?.eventName, `event-${index + 1}`)}`,
        index,
      })),
    [data]
  );

  const scrollToSlug = useCallback((slug) => {
    if (!slug) return;
    const node = cardRefs.current[slug];
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    if (!events.length) return;

    const url = new URL(window.location.href);
    const paramSlug = url.searchParams.get("eventId");
    const hashSlug = url.hash?.replace("#", "");

    const initialSlug = events.find((item) => item.slug === paramSlug)
      ? paramSlug
      : events.find((item) => item.slug === hashSlug)
        ? hashSlug
        : events[0]?.slug;

    if (!initialSlug) return;

    setActiveSlug(initialSlug);

    requestAnimationFrame(() => {
      setTimeout(() => scrollToSlug(initialSlug), 150);
    });
  }, [events, scrollToSlug]);

  useEffect(() => {
    if (!events.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.dataset?.slug) {
          setActiveSlug((prev) =>
            prev === visible.target.dataset.slug
              ? prev
              : visible.target.dataset.slug
          );
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.3, 0.5, 0.7],
      }
    );

    events.forEach((event) => {
      const node = cardRefs.current[event.slug];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [events]);

  useEffect(() => {
    if (!activeSlug) return;
    const url = new URL(window.location.href);
    if (url.hash === `#${activeSlug}` && !url.searchParams.get("eventId")) {
      return;
    }

    url.hash = activeSlug;
    url.searchParams.delete("eventId");
    window.history.replaceState({}, "", url.toString());
  }, [activeSlug]);

  const handleChipClick = (slug) => {
    setActiveSlug(slug);
    scrollToSlug(slug);
  };

  if (!events.length) {
    return null;
  }

  return (
    <section id="events" className="relative pb-24 pt-10">
      <div className="mx-auto mb-12 w-full max-w-5xl rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md px-4 py-4 shadow-xl">
        <div className="flex flex-col gap-3 pb-3 border-b border-white/10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent2">
              Events
            </p>
            <h2 className="text-lg font-semibold text-white">
              Explore all competitions & workshops
            </h2>
          </div>
          <span className="text-xs text-gray-400">
            Click a badge to jump to the event
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 pb-2">
          {events.map((event) => (
            <motion.button
              key={event.slug}
              type="button"
              onClick={() => handleChipClick(event.slug)}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                activeSlug === event.slug
                  ? "bg-accent text-white shadow-xl shadow-accent/30"
                  : "bg-white/10 text-gray-200 hover:bg-white/20"
              }`}
            >
              {event.eventName}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        {events.map((event) => {
          const imageSrc = event?.eventImg ? urlForImage(event.eventImg) : null;

          return (
            <motion.article
              key={event.slug}
              id={event.slug}
              data-slug={event.slug}
              ref={(node) => {
                if (node) {
                  cardRefs.current[event.slug] = node;
                }
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.35, once: true }}
              className="group scroll-mt-28 overflow-hidden rounded-3xl border border-white/5 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-md"
            >
              <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-accent/40 via-accent2/30 to-accent/10 md:min-h-full">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={`${event.eventName} banner`}
                      fill
                      className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                      priority={event.index < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,#1e293b,#090909)]">
                      <span className="text-sm uppercase tracking-[0.4em] text-white/50">
                        Image Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6 p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      #{String(event.index + 1).padStart(2, "0")}
                    </span>
                    {event.eventSlogan ? (
                      <span className="text-xs italic text-gray-300">
                        {event.eventSlogan}
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {event.eventName}
                    </h3>
                    {event.eventDesc ? (
                      <p className="text-sm leading-relaxed text-gray-200 md:text-base">
                        {event.eventDesc}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/events/${event.eventName
                        ?.toLowerCase()
                        .replaceAll(" ", "-")}`}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-accent/90 focus:outline-none focus:ring-4 focus:ring-accent/40"
                    >
                      {event.eventName?.toLowerCase() !== "amboss workshop"
                        ? "Prizes & Rules"
                        : "More information"}
                      <Arrow size={18} color="#fff" />
                    </Link>
                    <motion.a
                      href="#events"
                      onClick={() => {
                        if (events[0]?.slug) {
                          handleChipClick(events[0].slug);
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition-all hover:border-accent hover:text-accent lg:inline-flex"
                    >
                      Back to top
                    </motion.a>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
                    <p className="font-semibold text-white">
                      Event Coordinator
                    </p>
                    <p>{event.eventCoordinator || "To be announced"}</p>
                    {event.eventCoordinatorContact ? (
                      <p className="mt-1 text-gray-300">
                        Contact: +91 {event.eventCoordinatorContact}
                      </p>
                    ) : null}
                    {event.eventName === "Marrow's Jeopardy" ? (
                      <div className="mt-3 space-y-1 text-gray-300">
                        <p>Event Coordinator 2: Dr. B Roshni</p>
                        <p>Contact: +91 9515681977</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default Events;
