"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Sample archive data - replace with your actual data
const archiveItems = [
  {
    id: 1,
    name: "Medical Research 2022",
    description:
      "Groundbreaking studies on cardiovascular health and innovative treatment approaches.",
    image: "/placeholder.svg?height=200&width=400",
  },
];

export default function ArchivesGrid({ archivesData }) {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4">
      <div className="grid grid-cols-1 gap-6 items-center justify-items-center">
        {archivesData.map(
          ({ archivesName: name, archivesDesc: description, archiveId }, i) => (
            <Link
              href={`/archives/${archiveId}`}
              key={i}
              className="relative flex flex-col my-6 bg-white/10 shadow-sm border border-gray-200 rounded-lg hover:bg-white/5 transition-all w-96"
            >
              <div className="mx-3 mb-0 border-b border-gray-200 pt-3 pb-2 px-1">
                <span className="text-sm text-gray-400 font-medium">
                  Archive
                </span>
              </div>

              <div className="p-4">
                <h5 className="mb-2 text-gray-200 text-xl font-semibold">
                  {name}
                </h5>
                <p className="text-gray-300 leading-normal font-light">
                  {description.split(" ").slice(0, 11).join(" ")}...
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
