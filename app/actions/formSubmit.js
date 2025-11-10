"use server";
import { supabaseAdmin } from "../lib/supabase/supabaseAdmin";
import { redirect } from "next/navigation";
import {
  calculateActiveDelegateFee,
  PASSIVE_DELEGATE_FEE,
  WORKSHOP_FEE,
} from "@/app/lib/paymentConfig";

const PARTICIPATION_TYPES = new Set(["active", "passive", "workshop"]);

export async function formSubmit(formData) {
  let rawFormData;

  const rawParticipationType = (formData?.get("participation_type") || "")
    .toString()
    .trim()
    .toLowerCase();

  const participationtype = PARTICIPATION_TYPES.has(rawParticipationType)
    ? rawParticipationType
    : "active";

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
  const isKmcStudent = formData?.get("kmc_student") === "true";
  const isPgStudent = formData?.get("is_pg_student") === "true";

  let dueAmount;
  if (participationtype === "passive") {
    dueAmount = PASSIVE_DELEGATE_FEE;
  } else if (participationtype === "workshop") {
    dueAmount = WORKSHOP_FEE;
  } else {
    dueAmount = calculateActiveDelegateFee({
      isKmcStudent,
      isPgStudent,
    });
  }

  rawFormData = {
    delegateid,
    name: formData?.get("student_name")?.trim(),
    mobileno: formData?.get("student_number"),
    email: formData?.get("student_email")?.trim(),
    collegeyear: formData?.get("college_year") || 0,
    iskmcstudent: isKmcStudent,
    kmcrollno: formData?.get("kmc_rollno")?.trim(),
    ispgstudent: isPgStudent,
    collegename:
      formData?.get("college_name")?.trim() || "Kakatiya Medical College",
    events:
      participationtype === "active"
        ? [
            ...(formData?.get("debate") ? ["debate"] : []),
            ...(formData?.get("jeopardy") ? ["jeopardy"] : []),
            ...(formData?.get("medExhibition") ? ["medExhibition"] : []),
            ...(formData?.get("paperPresentation")
              ? ["paperPresentation"]
              : []),
            ...(formData?.get("posterPresentation")
              ? ["posterPresentation"]
              : []),
            ...(formData?.get("symposium") ? ["symposium"] : []),
            ...(formData?.get("hackathon") ? ["hackathon"] : []),
          ]
        : [],
    participationtype,
    hastopay: dueAmount,
  };

  ({ data, error } = await supabaseAdmin
    .from("activedelegates")
    .insert(rawFormData));

  console.log("raw error:", error);
  if (error) {
    if (error.message.includes("duplicate")) {
      const regex = /\((?<left>.*?)\)=\((?<right>.*?)\)/g;
      const match = regex.exec(error.details);

      console.error(`Error while processing active delegates: ${error}`);
      if (match?.groups?.left && match?.groups?.right) {
        const lookupField = match.groups.left;
        const lookupValue = match.groups.right;
        const sanitizedValue =
          lookupField === "email" ? lookupValue.toLowerCase() : lookupValue;

        redirect(
          `${process.env.HOST_URL}/payment/status?${lookupField}=${encodeURIComponent(
            sanitizedValue
          )}`
        );
      } else {
        redirect(`${process.env.HOST_URL}/payment/status`);
      }
    }
    await supabaseAdmin
      .from("counters")
      .update({ count })
      .eq("name", "activedelegates");
  } else {
    redirect(`${process.env.HOST_URL}/payment/status?delegateId=${delegateid}`);
  }
}
