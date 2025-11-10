"use server";
import { formSubmit } from "./formSubmit";

export async function formSubmitPassiveDelegates(formData) {
  formData.set("participation_type", "passive");
  return formSubmit(formData);
}
