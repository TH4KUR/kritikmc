"use server";
import { supabaseAdmin } from "../lib/supabase/supabaseAdmin";
import { redirect } from "next/navigation";
import {
  calculateActiveDelegateFee,
  PASSIVE_DELEGATE_FEE,
  WORKSHOP_FEE,
} from "@/app/lib/paymentConfig";

const PARTICIPATION_TYPES = new Set(["active", "passive", "workshop"]);
const COUNTER_CONFIG = {
  active: { counterName: "activedelegates", prefix: "KAD" },
  passive: { counterName: "passivedelegates", prefix: "KPD" },
  workshop: { counterName: "workshopdelegates", prefix: "KWD" },
};

export async function formSubmit(formData) {
  let rawFormData;
  let data;
  let error;

  const rawParticipationType = (formData?.get("participation_type") || "")
    .toString()
    .trim()
    .toLowerCase();

  const participationtype = PARTICIPATION_TYPES.has(rawParticipationType)
    ? rawParticipationType
    : "active";

  const { counterName, prefix } =
    COUNTER_CONFIG[participationtype] || COUNTER_CONFIG.active;

  let reservedCount = null;
  let attempts = 0;

  while (attempts < 3 && reservedCount === null) {
    ({ data, error } = await supabaseAdmin
      .from("counters")
      .select("count")
      .eq("name", counterName));

    console.log("count res:", data, error);
    if (error) {
      throw error;
    }

    const currentCount = data?.[0]?.count ?? 0;
    const nextCount = currentCount + 1;

    const counterUpdate = data?.length
      ? await supabaseAdmin
          .from("counters")
          .update({ count: nextCount })
          .eq("name", counterName)
          .eq("count", currentCount)
          .select("count")
      : await supabaseAdmin
          .from("counters")
          .insert({ name: counterName, count: nextCount })
          .select("count");

    console.log("update count res:", counterUpdate);
    if (counterUpdate.error) {
      throw counterUpdate.error;
    }

    if (Array.isArray(counterUpdate.data) && counterUpdate.data.length > 0) {
      reservedCount = currentCount;
      break;
    }

    attempts += 1;
  }

  if (reservedCount === null) {
    throw new Error("Unable to reserve delegate ID. Please try again.");
  }

  const delegateid = `${prefix}-${String(reservedCount).padStart(4, "0")}`;
  const isKmcStudent = formData?.get("kmc_student") === "true";
  const isPgStudent = formData?.get("is_pg_student") === "true";
  const rawCollegeYear = formData?.get("college_year");
  const parsedCollegeYear = Number(rawCollegeYear);
  const collegeYearValue =
    rawCollegeYear === null ||
    rawCollegeYear === undefined ||
    rawCollegeYear === "" ||
    Number.isNaN(parsedCollegeYear)
      ? null
      : parsedCollegeYear;

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
    collegeyear: collegeYearValue,
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
    await supabaseAdmin
      .from("counters")
      .update({ count: reservedCount })
      .eq("name", counterName);

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
    redirect(`${process.env.HOST_URL}/payment/status`);
  } else {
    redirect(
      `${process.env.HOST_URL}/payment/v2?delegateId=${encodeURIComponent(delegateid)}`
    );
  }
}
