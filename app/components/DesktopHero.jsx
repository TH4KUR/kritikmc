"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_HIGHLIGHTS = [
  { label: "20+ events", description: "Academic & cultural showcases" },
  { label: "₹3L+ prizes", description: "Scholarships and awards" },
  { label: "National speakers", description: "Leaders in healthcare" },
];

const DesktopHero = ({ highlights = FALLBACK_HIGHLIGHTS }) => {
  const heroHighlights = highlights?.length ? highlights : FALLBACK_HIGHLIGHTS;

  return (
    <>
      <div className="absolute inset-0 hidden md:block">
        <div className="relative h-full w-full">
          <Image
            fill
            priority
            src="/desktop_hero.jpg"
            alt="Delegates networking at the Kriti medical conference"
            sizes="(min-width: 1280px) 80vw, (min-width: 1024px) 70vw, 100vw"
            className="object-cover brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040404]/90 via-[#090909]/70 to-transparent" />
        </div>
      </div>
      <div className="relative hidden h-full w-full flex-col justify-center px-8 py-16 md:flex md:w-5/6 lg:w-2/3">
        <div className="relative z-10 flex w-full max-w-3xl flex-col gap-6 text-white">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, delay: 0.2 },
            }}
            viewport={{ once: true }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80"
          >
            Kriti 2025 · Warangal
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.4 },
            }}
            viewport={{ once: true }}
            className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            The most awaited medical conference of the year is back.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.6 },
            }}
            viewport={{ once: true }}
            className="text-base leading-relaxed text-white/85 lg:text-lg"
          >
            Join us at Kakatiya Medical College to connect with innovators,
            explore breakthrough ideas, and shape the future of healthcare
            through inspiring conversations and hands-on experiences.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.75 },
            }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide"
          >
            {heroHighlights.map((item) => (
              <li
                key={item.label}
                className="min-w-[8rem] rounded-3xl border border-white/20 bg-white/10 px-4 py-3"
              >
                <p className="text-sm text-white">{item.label}</p>
                {item.description && (
                  <p className="mt-1 text-[0.7rem] text-white/70">
                    {item.description}
                  </p>
                )}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.9 },
            }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/registration"
              className="inline-flex min-w-[12rem] items-center justify-center rounded-2xl bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-accent/40 transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent/60"
            >
              Register now
            </Link>
            <Link
              href="/events"
              className="inline-flex min-w-[12rem] items-center justify-center rounded-2xl border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Explore events
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 1.05 },
            }}
            viewport={{ once: true }}
            className="grid gap-4 text-sm text-white/80 md:grid-cols-2"
          >
            <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Registration update
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                Slots are limited and confirmations are instant via Kriti
                Payments Gateway 2.0.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Venue
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                Kakatiya Medical College · Warangal, Telangana
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DesktopHero;
