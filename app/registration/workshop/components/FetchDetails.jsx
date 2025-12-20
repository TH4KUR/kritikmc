"use client";
import Link from "next/link";
import React, { useState } from "react";

const FetchDetails = ({ initialDelegateId = "", errorMessage = "" }) => {
  const [delegateId, setDelegateId] = useState(initialDelegateId);
  const trimmedId = delegateId.trim();
  const fetchHref = trimmedId
    ? `/registration/workshop?delegateId=${encodeURIComponent(trimmedId)}`
    : "/registration/workshop";
  const fetchDisabled = !trimmedId;

  return (
    <section className="mx-auto mt-4 w-full max-w-xl px-5">
      <div className="rounded-3xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">
            Claim 20% off by entering your active/passive delegate id
          </p>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 shadow-sm">
            20% off
          </span>
        </div>

        <div className="flex flex-col gap-3 px-4 py-4">
          <label
            htmlFor="delegateId"
            className="text-sm font-semibold text-slate-700"
          >
            Enter your delegate ID
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              id="delegateId"
              name="delegateId"
              value={delegateId}
              onChange={(event) => setDelegateId(event.target.value)}
              placeholder="KAD-0123"
              className="flex-1 rounded-2xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <Link
              href={fetchHref}
              aria-disabled={fetchDisabled}
              className={`inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/30 ${fetchDisabled ? "cursor-not-allowed opacity-60" : ""}`}
              tabIndex={fetchDisabled ? -1 : 0}
            >
              Fetch details &rarr;
            </Link>
          </div>
          <p className="text-sm text-slate-500 font-medium px-3">
            Claim 20% off and We will pre-fill your registration from your
            existing record based on your delegate id.
          </p>
          {errorMessage ? (
            <p className="rounded-2xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FetchDetails;
