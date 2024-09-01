"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function formSubmitPassiveAmbossWorkshop(formData) {
  // Deleting existing cookie
  cookies().delete("registrationData");
  cookies().delete("username");
  // const counterRes = await counter.up("kritikmc", "delegates");

  const rawFormData = {
    studentName: formData.get("student_name"),
    studentNumber: formData.get("student_number"),
    studentEmail: formData.get("student_email"),
    collegeYear: formData.get("college_year"),
    isKmcStudent: formData.get("kmc_student") === "true" ? true : false,
    isPgStudent: formData.get("is_pg_student"),
    studentCollege: formData?.get("college_name") || "Kakatiya Medical College",
    ambossWorkshop: true,
  };
  const rawFormDataBase64 = Buffer.from(JSON.stringify(rawFormData)).toString(
    "base64"
  );

  cookies().set({
    name: "username",
    value: formData.get("student_name").split(" ")[0],
    secure: true,
    expires: Date.now() + 30 * 60 * 1000,
  });
  cookies().set({
    name: "registrationData",
    value: rawFormDataBase64,
    secure: true,
    expires: Date.now() + 30 * 60 * 1000,
  });

  redirect(`${process.env.HOST_URL}/payment?rel=amboss`);
}
