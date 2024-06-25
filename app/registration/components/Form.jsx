"use client";
import { useState } from "react";
import { Description, Field, Input, Label } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputCollege from "./InputCollege";
import InputCollegeYear from "./InputCollegeYear";
import InputNumber from "./InputNumber";
import InputEvents from "./InputEvents";

const eventsData = [
  { eventName: "Debate", eventSlug: "debate" },
  { eventName: "Med Exhibition", eventSlug: "medExhib" },
  { eventName: "Case Presentation", eventSlug: "casePres" },
  { eventName: "Jeopary", eventSlug: "jeopardy" },
  { eventName: "Hackathon", eventSlug: "hackathon" },
  { eventName: "Symposium", eventSlug: "symposium" },
];
const Form = () => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    for (const [key, value] of formData) {
      console.log(`${key}:${value}`);
    }
    console.log(formData);
  }
  return (
    <form onSubmit={onSubmit} className=" *:mb-6 px-5">
      <InputName />
      <InputEmail />
      <InputCollege enabled={isStudentOfKmc} setEnabled={setIsStudentOfKmc} />
      <InputCollegeYear />
      <InputNumber />
      <InputEvents events={eventsData} />

      <div className="w-full flex justify-center items-center mb-[0!important] pb-5">
        <button
          className="text-center py-2 px-4 bg-accent w-full text-white font-semibold rounded-lg"
          type="submit"
        >
          Proceed to Pay {isStudentOfKmc ? "₹300" : "₹400"}
        </button>
      </div>
    </form>
  );
};

export default Form;
