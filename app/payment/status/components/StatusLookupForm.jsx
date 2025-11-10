"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const steps = ["delegateId", "email", "mobileno"];

function nextStep(currentStep) {
  const currentIndex = steps.indexOf(currentStep);
  if (currentIndex === -1) return steps[0];
  return steps[(currentIndex + 1) % steps.length];
}

export default function StatusLookupForm({ defaultDelegateId = "" }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [delegateId, setDelegateId] = useState(defaultDelegateId || "");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [activeStep, setActiveStep] = useState(steps[0]);

  useEffect(() => {
    const paramDelegateId = searchParams?.get("delegateId") || "";
    const paramEmail = searchParams?.get("email") || "";
    const paramMobile = searchParams?.get("mobileno") || "";

    if (paramDelegateId) setDelegateId(paramDelegateId.toUpperCase());
    if (paramEmail) setEmail(paramEmail);
    if (paramMobile) setMobileno(paramMobile);

    if (paramDelegateId) {
      setActiveStep("delegateId");
    } else if (paramEmail) {
      setActiveStep("email");
    } else if (paramMobile) {
      setActiveStep("mobileno");
    }
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingEntries = searchParams
      ? Array.from(searchParams.entries())
      : [];
    const currentQuery = new URLSearchParams(existingEntries);

    currentQuery.delete("delegateId");
    currentQuery.delete("email");
    currentQuery.delete("mobileno");

    const nextDelegateId = delegateId.trim();
    const nextEmail = email.trim();
    const nextMobile = mobileno.trim();

    if (!nextDelegateId && !nextEmail && !nextMobile) {
      return;
    }

    if (nextDelegateId) {
      currentQuery.set("delegateId", nextDelegateId);
    }

    if (nextEmail) {
      currentQuery.set("email", nextEmail.toLowerCase());
    }

    if (nextMobile) {
      currentQuery.set("mobileno", nextMobile);
    }

    const queryString = currentQuery.toString();
    const target = queryString
      ? `/payment/status?${queryString}`
      : "/payment/status";
    router.push(target);
  };

  const handleCycle = () => {
    setActiveStep((prev) => nextStep(prev));
  };

  const handleInputFocus = (field) => {
    setActiveStep(field);
  };

  const isReady = Boolean(delegateId.trim() || email.trim() || mobileno.trim());

  return (
    <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="delegateId"
          >
            Delegate ID (preferred)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="delegateId"
              name="delegateId"
              value={delegateId}
              onChange={(event) =>
                setDelegateId(event.target.value.toUpperCase())
              }
              onFocus={() => handleInputFocus("delegateId")}
              placeholder="e.g., KAD-0123"
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                activeStep === "delegateId"
                  ? "border-accent"
                  : "border-gray-300 focus:border-accent"
              }`}
            />
          </div>
          <p className="text-xs text-gray-500">
            Enter your delegate ID to locate your registration instantly.
          </p>
        </div>

        <div className="text-center text-base font-semibold uppercase tracking-wide text-gray-500">
          or provide one of the contact details below
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email (optional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => handleInputFocus("email")}
              placeholder="you@example.com"
              className={`rounded-lg border px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                activeStep === "email"
                  ? "border-accent"
                  : "border-gray-300 focus:border-accent"
              }`}
            />
            <p className="text-xs text-gray-500">
              We&apos;ll match the registration linked to this email.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="mobileno"
            >
              Mobile Number (optional)
            </label>
            <input
              id="mobileno"
              name="mobileno"
              value={mobileno}
              onChange={(event) => setMobileno(event.target.value)}
              onFocus={() => handleInputFocus("mobileno")}
              placeholder="10-digit number"
              className={`rounded-lg border px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                activeStep === "mobileno"
                  ? "border-accent"
                  : "border-gray-300 focus:border-accent"
              }`}
            />
            <p className="text-xs text-gray-500">
              Use the 10-digit number shared during registration.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={!isReady}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition ${
              isReady
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Check Status
          </button>

          <button
            type="button"
            onClick={handleCycle}
            className="text-xs font-semibold uppercase tracking-wide text-accent"
          >
            Cycle lookup options
          </button>
        </div>
      </form>
      <p className="mt-3 text-xs text-gray-500">
        Any single field works—delegate ID, email, or mobile. Use the one you
        have handy and we&apos;ll pull up your status.
      </p>
    </section>
  );
}
