"use client";
import { Field, Label, Description, Input } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";

const InputName = ({
  value,
  defaultValue = "",
  disabled = false,
  onChange,
}) => {
  const inputProps =
    typeof onChange === "function"
      ? { value: value ?? "", onChange }
      : { defaultValue: value ?? defaultValue };

  return (
    <Field className="flex flex-col gap-1.5">
      <Label className="text-sm font-semibold text-slate-700">
        Full Name <span className="text-red-600">*</span>
      </Label>
      <Description className="text-sm text-slate-500">
        Please enter your full name as it appears on your ID.
      </Description>
      <div className="relative mt-1">
        <Input
          data-typing={false}
          name="student_name"
          type="text"
          placeholder="John Doe"
          required
          {...inputProps}
          disabled={disabled}
          autoComplete="name"
          minLength={5}
          className="peer relative block w-full rounded-2xl border border-slate-300 bg-white/90 py-3 px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 valid:border-emerald-400 valid:ring-emerald-200 invalid:border-rose-400 focus:invalid:border-rose-400 focus:invalid:ring-rose-200 disabled:bg-slate-100 disabled:text-slate-500"
        />
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center opacity-0 transition-opacity peer-valid:opacity-100">
          <Checkmark className="h-5 w-5 fill-emerald-500" />
        </div>
      </div>
    </Field>
  );
};

export default InputName;
