"use client";
import { Field, Label, Description, Input } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";
const InputName = () => {
  return (
    <Field className="flex flex-col">
      <Label className="text-base font-medium text-black">
        Full Name <span className=" text-red-600">*</span>
      </Label>
      <Description className="text-sm text-black/75">
        Please enter your full name.
      </Description>
      <div className="relative mt-1">
        <Input
          data-typing={false}
          name="student_name"
          type="text"
          placeholder="John Doe"
          required
          autoComplete="name"
          minLength={5}
          className={
            "peer autofill:!bg-bg relative block w-full bg-bgInput rounded-lg  py-1.5 px-3 text-sm/6 border-2 border-black disabled:border-2 disabled:border-black text-black focus:outline-none focus:ring focus:valid:border-green-500 focus:valid:ring-green-500/20 valid:border-green-500/80 invalid:border-red-600/80 invalid:ring-red-500/20 focus:border-blue-800/45 focus:ring-blue-500/20"
          }
        />
        <div className="absolute right-0 inset-y-0 pe-2 invisible peer-valid:visible">
          <Checkmark className="  w-5 h-full  fill-green-600" />
        </div>
      </div>
    </Field>
  );
};

export default InputName;
