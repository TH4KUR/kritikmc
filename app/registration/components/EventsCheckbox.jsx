"use client";
import { useState } from "react";

import { Checkbox, Field, Label } from "@headlessui/react";
const EventsCheckbox = ({
  eventName,
  eventSlug,
  name = "events",
  checked,
  defaultChecked = false,
  onToggle,
}) => {
  const isControlled = typeof checked === "boolean";
  const [enabled, setEnabled] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : enabled;

  const handleChange = (next) => {
    if (!isControlled) {
      setEnabled(next);
    }
    onToggle?.(next);
  };

  return (
    <Field className="group flex items-center gap-3 rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 shadow-sm transition hover:border-accent/50">
      <Checkbox
        checked={resolvedChecked}
        onChange={handleChange}
        name={name}
        value={eventSlug}
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
      <Label className="text-sm font-medium text-slate-700 md:text-base">
        {eventName}
      </Label>
    </Field>
  );
};

export default EventsCheckbox;
