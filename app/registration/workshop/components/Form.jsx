"use client";
import { useState, useEffect, useCallback } from "react";
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
import InputWorkshopDay from "./InputWorkshopDay";
import { workshopDayCapacities } from "@/app/lib/registrationConfig";

const Form = ({
  details = null,
  dayOptions = workshopDayCapacities,
  allowManualDefault = false,
}) => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [allowManual, setAllowManual] = useState(
    Boolean(details) || Boolean(allowManualDefault)
  );
  const [selectedDay, setSelectedDay] = useState(() => {
    const initial = details?.daychosen || dayOptions?.[0]?.value || "";
    return initial;
  });
  const [dayStatus, setDayStatus] = useState(null);
  const [dayError, setDayError] = useState("");
  const [checkingDay, setCheckingDay] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);

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
    if (details?.daychosen) {
      setSelectedDay(details.daychosen);
    }
    if (hasPrefill || allowManualDefault) {
      setAllowManual(true);
    }
  }, [details, allowManualDefault]);

  const fetchDayCapacity = useCallback(async (day) => {
    if (!day) return;
    setCheckingDay(true);
    setDayError("");
    try {
      const response = await fetch(
        `/api/workshop/capacity?day=${encodeURIComponent(day)}`,
        { cache: "no-store" }
      );
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Unable to check capacity.");
      }
      setDayStatus(payload);
    } catch (err) {
      setDayError(err?.message || "Unable to check capacity.");
      setDayStatus(null);
    } finally {
      setCheckingDay(false);
    }
  }, []);

  useEffect(() => {
    fetchDayCapacity(selectedDay);
  }, [selectedDay, fetchDayCapacity]);

  const payableAmount = details
    ? ALREADY_REGISTERED_WORKSHOP_FEE
    : WORKSHOP_FEE;
  const delegateId = details?.delegateid;

  const isDayFull = Boolean(dayStatus?.full);

  const handleSubmit = (event) => {
    if (!allowManual) {
      event.preventDefault();
      return;
    }

    if (isDayFull) {
      event.preventDefault();
      setShowCapacityModal(true);
      return;
    }
  };

  const helperCapacityText = dayStatus
    ? dayStatus.full
      ? "Capacity reached for this day."
      : `${dayStatus.remaining} spots left for this day.`
    : "";

  return (
    <>
      <form
        action={formSubmit}
        onSubmit={handleSubmit}
        className="mx-auto mt-6 max-w-3xl space-y-8 px-4 sm:px-6"
      >
        <input type="hidden" name="participation_type" value="workshop" />
        {delegateId ? (
          <input type="hidden" name="existing_delegate_id" value={delegateId} />
        ) : null}
        <input
          type="hidden"
          name="include_passive_registration"
          value={allowManual ? "true" : "false"}
        />
        <div className="space-y-8">
          {!allowManual && !delegateId ? null : (
            <>
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
                    <InputName
                      disabled={disabled}
                      value={details?.name ?? ""}
                    />
                    <InputEmail
                      disabled={disabled}
                      value={details?.email ?? ""}
                    />
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
                        Tell us about your institute to help us keep records
                        tidy.
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
                      We’ll confirm on WhatsApp and apply discounts
                      automatically when eligible.
                    </p>
                  </div>
                </header>
                <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                  <InputWorkshopDay
                    options={dayOptions}
                    value={selectedDay}
                    onChange={setSelectedDay}
                    disabled={false}
                  />
                  {helperCapacityText && (
                    <p className="text-sm font-medium text-slate-600">
                      {helperCapacityText}
                    </p>
                  )}
                  {dayError && (
                    <p className="text-sm text-rose-600">{dayError}</p>
                  )}
                  <InputNumber
                    disabled={disabled}
                    value={
                      details?.mobileno !== undefined &&
                      details?.mobileno !== null
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
                            ? "Existing delegate pricing applied."
                            : "A passive registration will be added with this workshop registration."}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <div className="flex items-center gap-2 text-slate-600" />
                        <span className="text-2xl font-bold text-slate-900">
                          ₹{payableAmount}
                        </span>
                        <button
                          className="w-full rounded-2xl bg-gradient-to-r from-accent to-accent/80 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:scale-[1.02] hover:from-accent/90 hover:to-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto"
                          type="submit"
                          disabled={checkingDay}
                        >
                          {checkingDay
                            ? "Checking capacity..."
                            : "Proceed to Pay"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </form>

      {showCapacityModal && (
        <div className="sticky inset-0 z-50 flex h-screen items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M128,24a104,104,0,1,0,104,104A104.12,104.12,0,0,0,128,24ZM120,80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"></path>
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  This day is fully booked
                </h3>
                <p className="text-sm text-slate-600">
                  The selected workshop day has reached its capacity. Please
                  choose another available day or contact the organising team
                  for assistance.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCapacityModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
