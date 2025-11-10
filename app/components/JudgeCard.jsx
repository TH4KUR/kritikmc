"use client";
import React from "react";
import { motion } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

const JudgeCard = ({ data }) => {
  const description = data.judgedesc || "";

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
          src={urlForImage(data.judgeimg)}
          alt={`Portrait of ${data.judgename}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full border border-violet-400/40 bg-violet-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-100 backdrop-blur">
          Judge
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 text-slate-100 lg:p-8">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold leading-tight md:text-2xl">
            {data.judgename}
          </h3>
          {data.judgetitle ? (
            <p className="text-sm font-medium text-slate-200/80">
              {data.judgetitle}
            </p>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-slate-200/80 md:text-[0.95rem]">
          {description.length > 480
            ? `${description.slice(0, 480)}…`
            : description}
        </p>
      </div>
    </motion.article>
  );
};

export default JudgeCard;
