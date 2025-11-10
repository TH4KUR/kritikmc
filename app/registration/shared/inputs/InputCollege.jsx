"use client";
import { Input, Checkbox, Field, Label, Description } from "@headlessui/react";
import Checkmark from "../../components/icons/Checkmark";

function InputCollege({ enabled, setEnabled }) {
  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
  };

  return (
    <>
      <Field className="group flex items-center gap-3 rounded-2xl border border-slate-300 bg-white/85 px-4 py-3 shadow-sm transition hover:border-accent/50">
        <Checkbox
          checked={enabled}
          onChange={toggle}
          name="kmc_student"
          value="true"
          className="flex size-6 items-center justify-center rounded-lg border border-slate-400 bg-white text-white transition data-[checked]:border-transparent data-[checked]:bg-accent"
        >
          <svg className="size-4 stroke-white" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 8l3 3 5-7.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
        <Label className="text-sm font-medium text-slate-700">
          I am a student of KMC Warangal <span className="text-red-600">*</span>
        </Label>
      </Field>
      {!enabled ? (
        <Field className="mt-4 flex flex-col gap-1.5">
          <Label className="text-sm font-semibold text-slate-700">
            College Name <span className="text-red-600">*</span>
          </Label>
          <Description className="text-sm text-slate-500">
            Please enter your college&apos;s full name.
          </Description>
          <div className="relative mt-1">
            <Input
              data-typing={false}
              type="text"
              placeholder="Kakatiya Medical College"
              required
              name="college_name"
              minLength={5}
              className="peer relative block w-full rounded-2xl border border-slate-300 bg-white/90 py-3 px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 valid:border-emerald-400 valid:ring-emerald-200 invalid:border-rose-400 focus:invalid:border-rose-400 focus:invalid:ring-rose-200 disabled:bg-slate-100 disabled:text-slate-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center opacity-0 transition-opacity peer-valid:opacity-100">
              <Checkmark className="h-5 w-5 fill-emerald-500" />
            </div>
          </div>
        </Field>
      ) : (
        <Field className="mt-4 flex flex-col gap-1.5">
          <Label className="text-sm font-semibold text-slate-700">
            KMC Hall Ticket Number <span className="text-red-600">*</span>
          </Label>
          <Description className="text-sm text-slate-500">
            Please enter the roll number allotted to you.
          </Description>
          <div className="relative mt-1">
            <Input
              data-typing={false}
              type="text"
              inputMode="numeric"
              placeholder="e.g. 21KMC123"
              required
              name="kmc_rollno"
              minLength={4}
              className="peer relative block w-full rounded-2xl border border-slate-300 bg-white/90 py-3 px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 valid:border-emerald-400 valid:ring-emerald-200 invalid:border-rose-400 focus:invalid:border-rose-400 focus:invalid:ring-rose-200 disabled:bg-slate-100 disabled:text-slate-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center opacity-0 transition-opacity peer-valid:opacity-100">
              <Checkmark className="h-5 w-5 fill-emerald-500" />
            </div>
          </div>
        </Field>
      )}
    </>
  );
}

export default InputCollege;
