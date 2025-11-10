"use client";
import { Field, Label, Description, Input } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";
const InputNumber = () => {
  return (
    <Field className="flex flex-col gap-1.5">
      <Label className="text-sm font-semibold text-slate-700">
        WhatsApp Mobile Number <span className="text-red-600">*</span>
      </Label>
      <Description className="text-sm text-slate-500">
        We&apos;ll confirm your registration on this number.
      </Description>
      <div className="relative mt-1">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white/90 px-4 py-2.5 shadow-sm transition focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30">
          <span className="flex items-center gap-2 text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 text-emerald-500"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
              <path
                d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84Z"
                opacity="0.2"
              ></path>
            </svg>
            <span className="text-sm font-medium text-slate-600">+91</span>
          </span>
          <Input
            data-typing={false}
            name="student_number"
            type="tel"
            autoComplete="tel-national"
            placeholder="8700621534"
            pattern="^[6-9]\d{9}$"
            required
            minLength={5}
            className="peer flex-1 border-none bg-transparent py-1 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:outline-none"
          />
          <Checkmark className="h-5 w-5 flex-shrink-0 fill-emerald-500 opacity-0 transition-opacity peer-valid:opacity-100" />
        </div>
      </div>
    </Field>
  );
};

export default InputNumber;
