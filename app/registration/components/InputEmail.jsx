"use client";
import { Field, Label, Description, Input } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";

const InputEmail = () => {
  return (
    <Field className="flex flex-col">
      <Label className="text-base md:text-lg font-semibold text-black">
        Email Address <span className=" text-red-600">*</span>
      </Label>
      <Description className="text-sm md:text-base text-black/75">
        Will be used for communication.
      </Description>
      <div className="relative mt-1">
        <Input
          type="email"
          name="student_email"
          id="student_email"
          autoComplete="email"
          placeholder="hello@kritikmc.com"
          className={
            "peer relative block w-full bg-bgInput rounded-lg  py-1.5 px-3 text-sm/6 md:text-base border-2  text-black focus:outline-none focus:ring focus:ring-black/15 focus:border-black/45 valid:border-green-500/80 default:border-black invalid:border-red-600/80 focus:invalid:border-red-600/80 focus:invalid:ring-red-500/20 focus:valid:border-green-500 focus:valid:ring-green-500/20"
          }
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        />
        <div className="absolute right-0 inset-y-0 pe-2 invisible peer-valid:visible">
          <Checkmark className="  w-5 h-full  fill-green-600" />
        </div>
      </div>
    </Field>
  );
};

export default InputEmail;
