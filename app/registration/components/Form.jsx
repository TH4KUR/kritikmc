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
  { eventName: "Debate", eventSlug: "debate" },
  { eventName: "Med Exhibition", eventSlug: "medExhibition" },
  { eventName: "Paper Presentation", eventSlug: "paperPresentation" },
  { eventName: "Poster Presentation", eventSlug: "posterPresentation" },
  { eventName: "Marrow's Jeopardy", eventSlug: "jeopardy" },
  { eventName: "Hackathon", eventSlug: "hackathon" },
  { eventName: "Symposium", eventSlug: "symposium" },
];

const Form = ({ events = fallbackEvents }) => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);

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

  return (
    <form
      action={formSubmit}
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
    </form>
  );
};

export default Form;
