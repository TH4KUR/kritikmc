import { Field, Label, Description, Select } from "@headlessui/react";

export default function InputWorkshopDay({
  options = [],
  value,
  onChange,
  disabled = false,
}) {
  return (
    <Field className="flex flex-col gap-1.5 bg-green-100 border border-green-400 px-4 py-3 rounded">
      <Label className="text-sm font-semibold text-slate-700">
        Select workshop day <span className="text-red-600">*</span>
      </Label>
      <Description className="text-sm text-slate-500">
        Choose the day you plan to attend.
      </Description>
      <div className="relative mt-1">
        <Select
          name="workshop_day"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          disabled={disabled}
          className="block w-full appearance-none rounded-2xl border border-slate-300 bg-white/90 py-3 px-4 text-sm text-slate-900 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 invalid:border-rose-400 focus:invalid:border-rose-400 focus:invalid:ring-rose-200 *:text-slate-700 disabled:bg-slate-100 disabled:text-slate-500"
          required
        >
          <option value="" disabled hidden>
            Choose one below
          </option>
          {options.map(({ value: dayValue, label }) => (
            <option key={dayValue} value={dayValue}>
              {label}
            </option>
          ))}
        </Select>
        <svg
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 fill-slate-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
    </Field>
  );
}
