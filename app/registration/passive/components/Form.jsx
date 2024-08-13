"use client";
import { useState } from "react";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputCollege from "./InputCollege";
import InputCollegeYear from "./InputCollegeYear";
import InputNumber from "./InputNumber";
import InputUgPg from "./InputUgPg";
import { formSubmitPassiveDelegates } from "@/app/actions/formSubmitPassiveDelegates";

const Form = () => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);

  return (
    <form
      action={formSubmitPassiveDelegates}
      className=" *:mb-6 px-5 max-w-xl mx-auto"
    >
      <InputName />
      <InputEmail />
      <InputUgPg
        enabled={isPgStudent}
        setEnabled={setIsPgStudent}
        setDisabled={setIsPgStudent}
      />

      {!isPgStudent ? (
        <>
          <InputCollege
            enabled={isStudentOfKmc}
            setEnabled={setIsStudentOfKmc}
            setDisabled={setIsStudentOfKmc}
          />
          <InputCollegeYear />
        </>
      ) : (
        ""
      )}
      <InputNumber />

      <div className="w-full flex justify-center items-center mb-[0!important] pb-5">
        <button
          className="text-center py-2 px-4 bg-accent w-full text-white font-semibold rounded-lg"
          type="submit"
        >
          Proceed to Pay ₹200
        </button>
      </div>
    </form>
  );
};

export default Form;
