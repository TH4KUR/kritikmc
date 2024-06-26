"use client";
import { Field, Label, Description, Input } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";
const InputNumber = () => {
  return (
    <Field className="flex flex-col">
      <Label className="text-base font-medium text-black">
        Whatsapp Mobile Number <span className=" text-red-600">*</span>
      </Label>
      <Description className="text-sm text-black/75">
        Needed to send confirmation.
      </Description>
      <div className="relative mt-1 flex">
        <span className="flex items-center justify-center min-h-full rounded-tl-lg rounded-bl-lg border-l-2 border-t-2 border-b-2 border-gray-400/40x py-2 px-3 bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 fill-green-800/90 h-full"
            viewBox="0 0 256 256"
          >
            <path
              d="M128,32A96,96,0,0,0,44.89,176.07L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47A96,96,0,1,0,128,32Zm24,152a80,80,0,0,1-80-80,32,32,0,0,1,32-32l16,32-12.32,18.47a48.19,48.19,0,0,0,25.85,25.85L152,136l32,16A32,32,0,0,1,152,184Z"
              opacity="0.2"
            ></path>
            <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.62-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
          </svg>
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
          className={
            "peer relative block w-full bg-bgInput rounded-tr-lg rounded-br-lg  py-1.5 px-3 text-sm/6 border-2 border-black disabled:border-2 disabled:border-black text-black focus:outline-none focus:ring focus:valid:border-green-500 focus:valid:ring-green-500/20 valid:border-green-500/80 invalid:border-red-600/80 focus:invalid:border-red-600/80 focus:invalid:ring-red-500/20 focus:border-blue-800/45 focus:ring-blue-500/20"
          }
        />
        <div className="absolute right-0 inset-y-0 pe-2 invisible peer-valid:visible">
          <Checkmark className="  w-5 h-full  fill-green-600" />
        </div>
      </div>
    </Field>
  );
};

export default InputNumber;
