"use client";
import { useState } from "react";

import { Checkbox, Field, Label } from "@headlessui/react";
const EventsCheckbox = ({ eventName, eventSlug }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Field className="flex items-center gap-2">
      <Checkbox
        checked={enabled}
        onChange={setEnabled}
        name={eventSlug}
        value={"true"}
        className="group block size-5 rounded border-2 border-black/50 bg-white data-[checked]:bg-blue-700 data-[checked]:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all "
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100 transition-all"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      <Label className={"text-sm md:text-base font-medium"}>{eventName}</Label>
    </Field>
  );
};

export default EventsCheckbox;
