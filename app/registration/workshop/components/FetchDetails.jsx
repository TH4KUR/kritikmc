"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FetchDetails = ({
  initialDelegateId = "",
  errorMessage = "",
  allowPassiveDefault = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [delegateId, setDelegateId] = useState(initialDelegateId);
  const [allowPassive, setAllowPassive] = useState(
    Boolean(allowPassiveDefault)
  );

  useEffect(() => {
    setAllowPassive(Boolean(allowPassiveDefault));
  }, [allowPassiveDefault]);

  const trimmedId = delegateId.trim();

  const fetchHref = (() => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("delegateId");
    if (trimmedId) params.set("delegateId", trimmedId);
    if (allowPassive) params.set("allowPassive", "true");
    else params.delete("allowPassive");
    const qs = params.toString();
    return qs ? `/registration/workshop?${qs}` : "/registration/workshop";
  })();

  const fetchDisabled = !trimmedId;

  const handleAllowPassiveToggle = (checked) => {
    setAllowPassive(checked);
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (trimmedId) params.set("delegateId", trimmedId);
    if (checked) params.set("allowPassive", "true");
    else params.delete("allowPassive");
    const qs = params.toString();
    router.replace(
      qs ? `/registration/workshop?${qs}` : "/registration/workshop"
    );
  };

  return (
    <section className="mx-auto mt-4 w-full max-w-xl px-5">
      <div className="rounded-3xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">
            At least a passive registration is required for workshop
            registration
          </p>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 shadow-sm">
            Required
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
            Enter your active/passive delegate ID to auto-fill and continue, or
            select the “Add my passive registration too” option below to proceed
            without an existing ID.
          </p>
          {errorMessage ? (
            <p className="rounded-2xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-slate-100 bg-white/70 px-6 py-5">
          <span className="text-xs font-bold tracking-[0.3em] text-slate-500">
            OR
          </span>
        </div>

        <div className="px-6 pb-5">
          <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-900">
                Add my passive registration too for ₹300
              </p>
              <p className="text-xs text-amber-800">
                You can proceed without an existing ID by creating a passive
                registration along with this workshop registration.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-3 py-2 text-amber-900 shadow-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-amber-400 text-amber-600 focus:ring-amber-300"
                checked={allowPassive}
                onChange={(event) =>
                  handleAllowPassiveToggle(event.target.checked)
                }
              />
              <span className="text-sm font-semibold">Enable form</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FetchDetails;
