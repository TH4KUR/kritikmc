"use client";
import { useState } from "react";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputCollege from "./InputCollege";
import InputCollegeYear from "./InputCollegeYear";
import InputNumber from "./InputNumber";
import InputEvents from "./InputEvents";
import { formSubmit } from "@/app/actions/formSubmit";
import InputUgPg from "./InputUgPg";

const eventsData = [
  { eventName: "Debate", eventSlug: "debate" },
  { eventName: "Med Exhibition", eventSlug: "medExhibition" },
  { eventName: "Paper Presentation", eventSlug: "paperPresentation" },
  { eventName: "Poster Presentation", eventSlug: "posterPresentation" },
  { eventName: "Marrow's Jeopardy", eventSlug: "jeopardy" },
  { eventName: "Hackathon", eventSlug: "hackathon" },
  { eventName: "Symposium", eventSlug: "symposium" },
];
const Form = () => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);

  return (
    <form action={formSubmit} className=" *:mb-6 px-5 max-w-xl mx-auto">
      <InputName />
      <InputEmail />
      <InputUgPg
        enabled={isPgStudent}
        setEnabled={setIsPgStudent}
        setDisabled={setIsPgStudent}
      />

      {!isPgStudent ? (
        <InputCollege
          enabled={isStudentOfKmc}
          setEnabled={setIsStudentOfKmc}
          setDisabled={setIsStudentOfKmc}
        />
      ) : (
        ""
      )}
      <InputNumber />
      <InputEvents
        events={eventsData}
        isStudentOfKmc={isStudentOfKmc}
        isPgStudent={isPgStudent}
      />

      <div className="w-full flex justify-center items-center mb-[0!important] pb-5">
        <button
          className="text-center py-2 px-4 bg-accent w-full text-white font-semibold rounded-lg"
          type="submit"
        >
          Proceed to Pay{" "}
          {isPgStudent ? "₹600" : isStudentOfKmc ? "₹300" : "₹400"}
        </button>
      </div>
    </form>
  );
};

export default Form;
