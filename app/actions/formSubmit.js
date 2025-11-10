"use server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../lib/supabase/supabaseAdmin";
import { redirect } from "next/navigation";
import { base64 } from "zod";

export async function formSubmit(formData) {
  let rawFormData;

  cookies().delete("delegateid");

  let { data, error } = await supabaseAdmin
    .from("counters")
    .select("count")
    .eq("name", "activedelegates");

  console.log("count res:", data, error);
  const count = data[0].count;

  const updatRes = await supabaseAdmin
    .from("counters")
    .update({ count: count + 1 })
    .eq("name", "activedelegates");

  console.log("update count res:", updatRes);
  const delegateid = `KAD-${String(count).padStart(4, "0")}`;
  rawFormData = {
    delegateid,
    name: formData?.get("student_name")?.trim(),
    mobileno: formData?.get("student_number"),
    email: formData?.get("student_email")?.trim(),
    collegeyear: formData?.get("college_year") || 0,
    iskmcstudent: formData?.get("kmc_student") === "true",
    kmcrollno: formData?.get("kmc_rollno")?.trim(),
    ispgstudent: formData?.get("is_pg_student") === "true",
    collegename:
      formData?.get("college_name")?.trim() || "Kakatiya Medical College",
    events: [
      ...(formData?.get("debate") ? ["debate"] : []),
      ...(formData?.get("jeopardy") ? ["jeopardy"] : []),
      ...(formData?.get("medExhibition") ? ["medExhibition"] : []),
      ...(formData?.get("paperPresentation") ? ["paperPresentation"] : []),
      ...(formData?.get("posterPresentation") ? ["posterPresentation"] : []),
      ...(formData?.get("symposium") ? ["symposium"] : []),
      ...(formData?.get("hackathon") ? ["hackathon"] : []),
    ],
  };

  cookies().set({
    name: "delegateid",
    value: delegateid,
    secure: true,
    expires: Date.now() + 30 * 60 * 1000,
  });
  ({ data, error } = await supabaseAdmin
    .from("activedelegates")
    .insert(rawFormData));

  console.log("raw error:", error);
  if (error) {
    if (error.message.includes("duplicate")) {
      const regex = /\((?<left>.*?)\)=\((?<right>.*?)\)/g;
      const match = regex.exec(error.details);

      console.error(`Error while processing active delegates: ${error}`);
      redirect(
        `${process.env.HOST_URL}/error?msg=duplicate&field=${match[1]}&value=${match[2]}`
      );
    }
    await supabaseAdmin
      .from("counters")
      .update({ count })
      .eq("name", "activedelegates");
  } else {
    redirect(`${process.env.HOST_URL}/payment/v2?delagateId=${delegateid}`);
  }

  // Deleting existing cookie
}
