"use client";
import { useState } from "react";
import Bullet from "./icons/Bullet";
import Caret from "./icons/Caret";
import Link from "next/link";
import getAnnouncements from "../lib/getAnnouncements";

const Announcements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    if (announcements.length) {
      setIsOpen(true);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getAnnouncements();
      setAnnouncements(res ?? []);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      setError("Unable to load updates right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f2c7cc63] px-4 py-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-[#f7d9df] bg-white/80 p-6 shadow-sm shadow-rose-100">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 text-[#2b1c1d]">
            <span className="rounded-2xl bg-accent/10 p-3 text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="size-6"
              >
                <path
                  d="M240,120a40,40,0,0,1-40,40H160V80h40A40,40,0,0,1,240,120Z"
                  opacity="0.2"
                ></path>
                <path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z"></path>
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Important updates
              </p>
              <h3 className="text-lg font-semibold text-[#2b1c1d] md:text-2xl">
                Announcements & deadlines
              </h3>
              <p className="text-sm text-[#5c4447]">
                Stay on top of last-minute changes, registration reminders, and
                resources curated by the Kriti team.
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent transition hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={loading}
          >
            {loading
              ? "Fetching updates..."
              : isOpen
                ? "Hide updates"
                : "Show updates"}
            <Caret
              className={`size-4 transition ${isOpen ? "-rotate-90" : "rotate-90"}`}
            />
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading && !announcements.length && (
          <div className="mt-6 grid gap-3">
            {[0, 1, 2].map((skeleton) => (
              <div
                key={skeleton}
                className="h-12 animate-pulse rounded-2xl bg-[#fbeef0]"
              ></div>
            ))}
          </div>
        )}

        {isOpen && !loading && (
          <div className="mt-6 space-y-4">
            {announcements.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[#f7d9df] bg-white px-4 py-4 text-sm text-[#5c4447]">
                No announcements yet. Check back soon for the latest updates.
              </p>
            ) : (
              <ul className="space-y-4 text-sm md:text-base">
                {announcements.map((announcement, index) => (
                  <li
                    key={`${announcement?.text}-${index}`}
                    className="flex flex-col gap-3 rounded-2xl border border-[#f7d9df] bg-white/90 p-4 shadow-sm md:flex-row md:items-center md:gap-4"
                  >
                    <div className="flex items-center gap-2 text-accent">
                      <Bullet size={7} className="shrink-0" />
                      <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                        Update {index + 1}
                      </span>
                    </div>
                    <p className="text-[#2f1d21] md:flex-1">
                      {announcement.text}
                    </p>
                    {announcement.link ? (
                      <Link
                        className="text-sm font-semibold text-blue-700 underline-offset-2 hover:underline"
                        href={announcement.link}
                        target="_blank"
                      >
                        View resource
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;
