"use client";
import { Description, Field, Input, Label } from "@headlessui/react";
import Checkmark from "./icons/Checkmark";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputCollege from "./InputCollege";
import InputCollegeYear from "./InputCollegeYear";

const Form = () => {
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
      <InputCollege />
      <InputCollegeYear />
      <button>submit</button>
    </form>
  );
};

export default Form;
