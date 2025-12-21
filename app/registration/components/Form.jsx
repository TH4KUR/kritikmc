"use client";
import { useState } from "react";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputCollege from "./InputCollege";
import InputCollegeYear from "./InputCollegeYear";
import InputNumber from "./InputNumber";
import InputEvents from "./InputEvents";
import InputUgPg from "./InputUgPg";
import { formSubmit } from "@/app/actions/formSubmit";
import { calculateActiveDelegateFee } from "@/app/lib/paymentConfig";

const fallbackEvents = [
  {
    eventName: "Debate",
    eventSlug: "debate",
    kmcExclusive: false,
    pgsAllowed: true,
  },
  {
    eventName: "Med Exhibition",
    eventSlug: "medExhibition",
    kmcExclusive: true,
    pgsAllowed: false,
  },
  {
    eventName: "Paper Presentation",
    eventSlug: "paperPresentation",
    kmcExclusive: false,
    pgsAllowed: true,
  },
  {
    eventName: "Poster Presentation",
    eventSlug: "posterPresentation",
    kmcExclusive: false,
    pgsAllowed: true,
  },
  {
    eventName: "Marrow's Jeopardy",
    eventSlug: "jeopardy",
    kmcExclusive: false,
    pgsAllowed: true,
  },
  {
    eventName: "Hackathon",
    eventSlug: "hackathon",
    kmcExclusive: false,
    pgsAllowed: true,
  },
  {
    eventName: "Symposium",
    eventSlug: "symposium",
    kmcExclusive: false,
    pgsAllowed: true,
  },
];

const Form = ({ events = fallbackEvents, enforcePgOnly = false }) => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);
  const [showUgClosedModal, setShowUgClosedModal] = useState(false);

  const handlePgToggle = (next) => {
    setIsPgStudent(next);
    if (next) {
      setIsStudentOfKmc(false);
    }
  };

  const feeAmount = calculateActiveDelegateFee({
    isKmcStudent: isStudentOfKmc,
    isPgStudent,
  });

  const handleSubmit = (event) => {
    if (enforcePgOnly && !isPgStudent) {
      event.preventDefault();
      setShowUgClosedModal(true);
      return;
    }
  };

  return (
    <form
      action={formSubmit}
      onSubmit={handleSubmit}
      className="mx-auto mt-6 max-w-3xl space-y-8 px-4 sm:px-6"
    >
      <input type="hidden" name="participation_type" value="active" />
      <section className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm">
        <header className="flex items-center gap-3 border-b border-white/40 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-4 sm:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-base font-semibold text-accent">
            1
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Personal details
            </h2>
            <p className="text-sm text-slate-500">
              Share how we can get in touch with you.
            </p>
          </div>
        </header>
        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-6 md:grid-cols-2">
            <InputName />
            <InputEmail />
          </div>
          <InputNumber />
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm">
        <header className="flex items-center gap-3 border-b border-white/40 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-4 sm:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-base font-semibold text-accent">
            2
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Academic details
            </h2>
            <p className="text-sm text-slate-500">
              Help us tailor the experience for you.
            </p>
          </div>
        </header>
        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          <InputUgPg enabled={isPgStudent} setEnabled={handlePgToggle} />
          {!isPgStudent && (
            <>
              <InputCollegeYear />
              <InputCollege
                enabled={isStudentOfKmc}
                setEnabled={setIsStudentOfKmc}
              />
            </>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm">
        <header className="flex items-center gap-3 border-b border-white/40 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-4 sm:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-base font-semibold text-accent">
            3
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Event selection
            </h2>
            <p className="text-sm text-slate-500">
              Choose every competition you plan to participate in.
            </p>
          </div>
        </header>
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <InputEvents
            events={events}
            isStudentOfKmc={isStudentOfKmc}
            isPgStudent={isPgStudent}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-accent/30 bg-accent/10 p-6 shadow-inner sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-accent">
              Payment summary
            </h3>
            <p className="text-sm text-slate-600">
              Active delegate fee adjusts automatically based on your choices.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-2xl font-bold text-slate-900">
              ₹{feeAmount}
            </span>
            <button
              className="w-full rounded-2xl bg-gradient-to-r from-accent to-accent/80 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:scale-[1.02] hover:from-accent/90 hover:to-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto"
              type="submit"
            >
              Proceed to Pay ₹{feeAmount}
            </button>
          </div>
        </div>
      </section>

      {showUgClosedModal && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <div className="sticky left-1/2 top-1/2 w-full max-w-md md:-translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,11.32L204.69,56H51.31l18.35-18.34A8,8,0,0,0,58.34,26.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L51.31,72H204.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,229.66,58.34Z"></path>
                  <path d="M197.66,154.34a8,8,0,0,0-11.32,0L128,212.69,69.66,154.34a8,8,0,0,0-11.32,11.32l64,64a8,8,0,0,0,11.32,0l64-64A8,8,0,0,0,197.66,154.34Z"></path>
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  UG registrations are now closed
                </h3>
                <p className="text-sm text-slate-600">
                  Active registration is currently open only for PG students.
                  Select the PG option above or reach out to the organising team
                  if you believe this is an error.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUgClosedModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
