/* eslint-disable @next/next/no-img-element */
"use client";
import { urlForImage } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

const badgeStyles = {
  "Chief Guest": {
    border: "border-amber-400/40",
    text: "text-amber-200",
    bg: "bg-amber-400/15",
  },
  "Guest Speaker": {
    border: "border-sky-400/40",
    text: "text-sky-200",
    bg: "bg-sky-400/15",
  },
};

const SpeakerCard = ({ data }) => {
  const description = data.speakerdesc || "";
  const variant = badgeStyles[data.speakertype] || {
    border: "border-emerald-400/40",
    text: "text-emerald-200",
    bg: "bg-emerald-400/15",
  };

  return (
    <motion.article
      viewport={{ once: true, amount: 0.4 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex h-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/20 shadow-xl shadow-black/20 backdrop-blur lg:flex-row"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden lg:aspect-square lg:h-full lg:max-w-[280px]">
        <Image
          height={480}
          width={720}
          src={urlForImage(data.speakerimg)}
          alt={`Portrait of ${data.speakername}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
        <span
          className={`absolute bottom-4 left-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur ${variant.border} ${variant.bg} ${variant.text}`}
        >
          {data.speakertype}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 text-slate-100 lg:p-8">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold leading-tight md:text-2xl">
            {data.speakername}
          </h3>
          {data.designation ? (
            <p className="text-sm font-medium text-slate-200/80">
              {data.designation}
            </p>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-slate-200/80 md:text-[0.95rem]">
          {description.length > 520
            ? `${description.slice(0, 520)}…`
            : description}
        </p>
      </div>
    </motion.article>
  );
};

export default SpeakerCard;
