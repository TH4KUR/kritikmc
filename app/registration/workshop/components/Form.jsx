"use client";
import { useState, useEffect } from "react";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputUgPg from "./InputUgPg";
import InputNumber from "../../components/InputNumber";
import { formSubmit } from "@/app/actions/formSubmit";
import {
  WORKSHOP_FEE,
  ALREADY_REGISTERED_WORKSHOP_FEE,
} from "@/app/lib/paymentConfig";
import InputCollegeYear from "../../components/InputCollegeYear";
import InputCollege from "../../components/InputCollege";

const Form = ({ details = null }) => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handlePgToggle = (next) => {
    setIsPgStudent(next);
    if (next) {
      setIsStudentOfKmc(false);
    }
  };

  useEffect(() => {
    const hasPrefill = Boolean(details);
    setDisabled(hasPrefill);
    setIsPgStudent(Boolean(details?.ispgstudent));
    setIsStudentOfKmc(Boolean(details?.iskmcstudent));
  }, [details]);

  const payableAmount = details
    ? ALREADY_REGISTERED_WORKSHOP_FEE
    : WORKSHOP_FEE;
  const delegateId = details?.delegateid;
  return (
    <>
      <form
        action={formSubmit}
        className="mx-auto mt-6 max-w-3xl space-y-8 px-4 sm:px-6"
      >
        <input type="hidden" name="participation_type" value="workshop" />
        {delegateId ? (
          <input type="hidden" name="existing_delegate_id" value={delegateId} />
        ) : null}
        <div className="space-y-8">
          <section className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm">
            <header className="flex items-center gap-3 border-b border-white/40 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-4 sm:px-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-base font-semibold text-accent">
                1
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Participant details
                  </h3>
                  <p className="text-sm text-slate-500">
                    Share how we can get in touch with you.
                  </p>
                </div>
                {delegateId ? (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Prefilled
                  </span>
                ) : null}
              </div>
            </header>
            <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
              <div className="grid gap-6 md:grid-cols-2">
                <InputName disabled={disabled} value={details?.name ?? ""} />
                <InputEmail disabled={disabled} value={details?.email ?? ""} />
              </div>
              <InputUgPg
                enabled={isPgStudent}
                setEnabled={handlePgToggle}
                disabled={disabled}
              />
            </div>
          </section>

          {!isPgStudent ? (
            <section className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm">
              <header className="flex items-center gap-3 border-b border-white/40 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-4 sm:px-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-base font-semibold text-accent">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    College details
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tell us about your institute to help us keep records tidy.
                  </p>
                </div>
              </header>
              <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                <InputCollege
                  enabled={isStudentOfKmc}
                  setEnabled={setIsStudentOfKmc}
                  disabled={disabled}
                  collegeName={details?.collegename ?? ""}
                  kmcRollNumber={details?.kmcrollno ?? ""}
                />
                <InputCollegeYear
                  defaultValue={details?.collegeyear ?? ""}
                  disabled={disabled}
                />
              </div>
            </section>
          ) : null}

          <section className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm">
            <header className="flex items-center gap-3 border-b border-white/40 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-4 sm:px-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-base font-semibold text-accent">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Contact & payment
                </h3>
                <p className="text-sm text-slate-500">
                  We’ll confirm on WhatsApp and apply discounts automatically
                  when eligible.
                </p>
              </div>
            </header>
            <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
              <InputNumber
                disabled={disabled}
                value={
                  details?.mobileno !== undefined && details?.mobileno !== null
                    ? details.mobileno.toString()
                    : ""
                }
              />

              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-accent">
                      Payment summary
                    </p>
                    <p className="text-xs text-slate-600">
                      {delegateId
                        ? "Discount applied for existing delegates."
                        : "Standard workshop fee applies."}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <div className="flex items-center gap-2 text-slate-600">
                      {delegateId ? (
                        <>
                          <span className="text-sm line-through">
                            ₹{WORKSHOP_FEE}
                          </span>
                          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                            20% off
                          </span>
                        </>
                      ) : null}
                    </div>
                    <span className="text-2xl font-bold text-slate-900">
                      ₹{payableAmount}
                    </span>
                    <button
                      className="w-full rounded-2xl bg-gradient-to-r from-accent to-accent/80 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:scale-[1.02] hover:from-accent/90 hover:to-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto"
                      type="submit"
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>
    </>
  );
};

export default Form;
