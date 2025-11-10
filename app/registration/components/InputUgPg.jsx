"use client";
import { Checkbox, Field, Label, Description } from "@headlessui/react";

function InputUgPg({ enabled, setEnabled }) {
  return (
    <>
      <Field className="group flex items-center gap-3 rounded-2xl border border-slate-300 bg-white/85 px-4 py-3 shadow-sm transition hover:border-accent/50">
        <Checkbox
          checked={enabled}
          onChange={setEnabled}
          name="is_pg_student"
          value={"true"}
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
          Are you a PG student?
          <span className="text-red-600">*</span>
        </Label>
      </Field>
    </>
  );
}
export default InputUgPg;
