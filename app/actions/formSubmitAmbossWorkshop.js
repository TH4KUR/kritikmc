"use server";
import { formSubmit } from "./formSubmit";

export async function formSubmitPassiveAmbossWorkshop(formData) {
  formData.set("participation_type", "workshop");
  return formSubmit(formData);
}
