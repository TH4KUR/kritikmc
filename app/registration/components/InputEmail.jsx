"use client";
import { Field, Label, Description, Input } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";

const InputEmail = ({ value = "", disabled = false }) => {
  return (
    <Field className="flex flex-col gap-1.5">
      <Label className="text-sm font-semibold text-slate-700">
        Email Address <span className="text-red-600">*</span>
      </Label>
      <Description className="text-sm text-slate-500">
        We&apos;ll send confirmation and updates to this inbox.
      </Description>
      <div className="relative mt-1">
        <Input
          type="email"
          name="student_email"
          id="student_email"
          autoComplete="email"
          value={value}
          disabled={disabled}
          placeholder="hello@kritikmc.com"
          className="peer relative block w-full rounded-2xl border border-slate-300 bg-white/90 py-3 px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 valid:border-emerald-400 valid:ring-emerald-200 invalid:border-rose-400 focus:invalid:border-rose-400 focus:invalid:ring-rose-200 disabled:bg-slate-100 disabled:text-slate-500"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        />
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center opacity-0 transition-opacity peer-valid:opacity-100">
          <Checkmark className="h-5 w-5 fill-emerald-500" />
        </div>
      </div>
    </Field>
  );
};

export default InputEmail;
