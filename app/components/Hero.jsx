import Link from "next/link";
import DesktopHero from "./DesktopHero";
import Image from "next/image";

const HERO_HIGHLIGHTS = [
  { label: "20+ events", description: "Academic & cultural showcases" },
  { label: "₹3L+ prizes", description: "Scholarships and awards" },
  { label: "National speakers", description: "Leaders in healthcare" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden md:h-[95vh] bg-[#090909]">
      <div className="relative isolate flex min-h-screen flex-col justify-end gap-6 overflow-hidden rounded-b-[32px] bg-bgSecondary md:hidden">
        <Image
          fill
          priority
          src="/desktop_hero.jpg"
          sizes="100vh"
          alt="Delegates gathered at the Kriti medical conference"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/70 to-black/90" />
        <div className="relative z-10 flex flex-col gap-5 px-5 pt-12 pb-40 text-white sm:px-7">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7C9CF]">
            Kriti 2025
          </span>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            The most awaited medical conference of the year is back!
          </h1>
          <p className="text-base leading-relaxed text-white/85">
            Join us at Kakatiya Medical College to connect with pioneers,
            explore breakthrough ideas, and shape the future of healthcare.
          </p>
          <div className="flex flex-wrap gap-3 text-[0.7rem] font-semibold uppercase tracking-wide text-white/80">
            {HERO_HIGHLIGHTS.map((highlight) => (
              <span
                key={highlight.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"
              >
                {highlight.label}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={"/registration"}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-3 text-base font-semibold tracking-wide text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Register Now
            </Link>
            <Link
              href={"/events"}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/50 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Browse Events
            </Link>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            Registrations are open · Limited delegate slots
          </p>
        </div>
      </div>
      <DesktopHero highlights={HERO_HIGHLIGHTS} />
    </section>
  );
};

export default Hero;
