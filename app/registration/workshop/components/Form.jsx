"use client";
import { useState } from "react";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputCollege from "./InputCollege";
import InputCollegeYear from "./InputCollegeYear";
import InputNumber from "./InputNumber";
import InputUgPg from "./InputUgPg";
import { formSubmit } from "@/app/actions/formSubmit";
import { WORKSHOP_FEE } from "@/app/lib/paymentConfig";

const Form = () => {
  const [isStudentOfKmc, setIsStudentOfKmc] = useState(false);
  const [isPgStudent, setIsPgStudent] = useState(false);

  return (
    <form action={formSubmit} className=" *:mb-6 px-5 max-w-xl mx-auto">
      <input type="hidden" name="participation_type" value="workshop" />
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
          Proceed to Pay ₹{WORKSHOP_FEE}
        </button>
      </div>
    </form>
  );
};

export default Form;
