"use client";
import { Input, Checkbox, Field, Label, Description } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";

function InputCollege({ enabled, setEnabled }) {
  return (
    <>
      <Field className="flex items-center gap-2">
        <Checkbox
          checked={enabled}
          onChange={setEnabled}
          name="kmc_student"
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
        <Label className={"text-sm md:text-base font-medium py-4"}>
          Yes, I am a student of KMC Warangal{" "}
          <span className=" text-red-600">*</span>
        </Label>
      </Field>
      {!enabled ? (
        <Field className="flex flex-col">
          <Label className="text-sm/6 md:text-lg font-semibold text-black">
            College Name <span className=" text-red-600">*</span>
          </Label>
          <Description className="text-sm/6 md:text-base  text-black/70">
            Please enter your College&apos;s name.
          </Description>
          <div className="relative mt-1">
            <Input
              data-typing={false}
              type="text"
              placeholder="Kakatiya Medical College"
              required
              name="college_name"
              minLength={5}
              className={
                "peer autofill:bg-inherit relative block w-full bg-bgInput rounded-lg  py-1.5 px-3 text-sm/6 border-2 border-black disabled:border-2 disabled:border-black text-black focus:outline-none focus:ring focus:valid:border-green-500 focus:valid:ring-green-500/20 valid:border-green-500/80 invalid:border-red-600/80 invalid:ring-red-500/20 focus:border-blue-800/45 focus:ring-blue-500/20"
              }
            />
            <div className="absolute right-0 inset-y-0 pe-2 invisible peer-valid:visible">
              <Checkmark className="w-5 h-full fill-green-600" />
            </div>
          </div>
        </Field>
      ) : (
        <Field className="flex flex-col">
          <Label className="text-sm/6 md:text-lg font-semibold text-black">
            KMC Roll Number <span className=" text-red-600">*</span>
          </Label>
          <Description className="text-sm/6 md:text-base  text-black/70">
            Please enter the roll number alloted to you.
          </Description>
          <div className="relative mt-1">
            <Input
              data-typing={false}
              type="text"
              placeholder="Kakatiya Medical College"
              required
              name="kmc_roll_number"
              minLength={5}
              className={
                "peer autofill:bg-inherit relative block w-full bg-bgInput rounded-lg  py-1.5 px-3 text-sm/6 border-2 border-black disabled:border-2 disabled:border-black text-black focus:outline-none focus:ring focus:valid:border-green-500 focus:valid:ring-green-500/20 valid:border-green-500/80 invalid:border-red-600/80 invalid:ring-red-500/20 focus:border-blue-800/45 focus:ring-blue-500/20"
              }
            />
            <div className="absolute right-0 inset-y-0 pe-2 invisible peer-valid:visible">
              <Checkmark className="w-5 h-full fill-green-600" />
            </div>
          </div>
        </Field>
      )}
    </>
  );
}
export default InputCollege;
