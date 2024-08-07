"use client";
import { Checkbox, Field, Label, Description } from "@headlessui/react";

function InputUgPg({ enabled, setEnabled }) {
  return (
    <>
      <Field className="flex items-center gap-2">
        <Checkbox
          checked={enabled}
          onChange={setEnabled}
          name="is_pg_student"
          value={"true"}
          className="group block size-5 rounded border-2 border-black/50 bg-white data-[checked]:bg-blue-700 data-[checked]:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all"
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
        <Label className={"text-sm md:text-base font-medium py-1"}>
          Are you PG student?
          <span className=" text-red-600">*</span>
        </Label>
      </Field>
    </>
  );
}
export default InputUgPg;
