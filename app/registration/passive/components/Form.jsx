"use client";
import { useState } from "react";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputCollege from "./InputCollege";
import InputCollegeYear from "./InputCollegeYear";
import InputNumber from "./InputNumber";
import InputUgPg from "./InputUgPg";
import { formSubmit } from "@/app/actions/formSubmit";
import { PASSIVE_DELEGATE_FEE } from "@/app/lib/paymentConfig";

const Form = () => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);
  const feeAmount = PASSIVE_DELEGATE_FEE;

  const handlePgToggle = (next) => {
    setIsPgStudent(next);
    if (next) {
      setIsStudentOfKmc(false);
    }
  };

  return (
    <form
      action={formSubmit}
      className="mx-auto mt-6 max-w-3xl space-y-8 px-4 sm:px-6"
    >
      <input type="hidden" name="participation_type" value="passive" />
      <section className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm">
        <header className="flex items-center gap-3 border-b border-white/40 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-4 sm:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-base font-semibold text-accent">
            1
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Contact details
            </h2>
            <p className="text-sm text-slate-500">
              Let us know how to reach you with delegate updates.
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
              Academic profile
            </h2>
            <p className="text-sm text-slate-500">
              Share your study track so we can tailor session content.
            </p>
          </div>
        </header>
        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          <InputUgPg enabled={isPgStudent} setEnabled={handlePgToggle} />
          {!isPgStudent && (
            <>
              <InputCollege
                enabled={isStudentOfKmc}
                setEnabled={setIsStudentOfKmc}
              />
              <InputCollegeYear />
            </>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-accent/30 bg-accent/10 p-6 shadow-inner sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-accent">
              Payment summary
            </h3>
            <p className="text-sm text-slate-600">
              Passive delegates enjoy full spectator access to every Kriti
              event.
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
