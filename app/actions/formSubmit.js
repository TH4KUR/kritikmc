"use server";
import { supabaseAdmin } from "../lib/supabase/supabaseAdmin";
import { redirect } from "next/navigation";
import {
  calculateActiveDelegateFee,
  PASSIVE_DELEGATE_FEE,
  WORKSHOP_FEE,
} from "@/app/lib/paymentConfig";
import { fetchDelegateWithFilters } from "@/app/lib/delegateRecords";

const PARTICIPATION_TYPES = new Set(["active", "passive", "workshop"]);
const UNCONFIRMED_TABLE = "unconfirmed_delegates";
const UNCONFIRMED_COUNTER = {
  counterName: "unconfirmeddelegates",
  prefix: "KUNC",
};

const parseOptionalNumber = (value) => {
  if (value === null || value === undefined) return null;
  const trimmed = value.toString().trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
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

  const isKmcStudent = formData?.get("kmc_student") === "true";
  const isPgStudent = formData?.get("is_pg_student") === "true";
  const collegeYearValue = parseOptionalNumber(formData?.get("college_year"));
  const mobileNumberValue = parseOptionalNumber(
    formData?.get("student_number")
  );
  const kmcRollValue = parseOptionalNumber(formData?.get("kmc_rollno"));
  const nameValue = formData?.get("student_name")?.trim();
  const emailValue = formData?.get("student_email")?.trim();
  const normalizedEmailLookup = emailValue ? emailValue.toLowerCase() : "";
  const collegeNameValue =
    formData?.get("college_name")?.trim() || "Kakatiya Medical College";

  if (mobileNumberValue === null) {
    throw new Error("A valid 10-digit mobile number is required.");
  }

  const statusBase = `${process.env.HOST_URL || ""}/payment/status`;

  if (normalizedEmailLookup) {
    const { delegate, error: existingEmailError } =
      await fetchDelegateWithFilters(
        [(query) => query.ilike("email", normalizedEmailLookup)],
        "delegateid,email"
      );

    if (existingEmailError) {
      throw existingEmailError;
    }

    if (delegate) {
      const query = new URLSearchParams({
        email: normalizedEmailLookup,
        notice: "already-registered",
      });
      redirect(`${statusBase}?${query.toString()}`);
    }
  }

  if (mobileNumberValue !== null) {
    const { delegate, error: existingMobileError } =
      await fetchDelegateWithFilters(
        [(query) => query.eq("mobileno", mobileNumberValue)],
        "delegateid,mobileno"
      );

    if (existingMobileError) {
      throw existingMobileError;
    }

    if (delegate) {
      const query = new URLSearchParams({
        mobileno: String(mobileNumberValue),
        notice: "already-registered",
      });
      redirect(`${statusBase}?${query.toString()}`);
    }
  }

  const { counterName, prefix } = UNCONFIRMED_COUNTER;

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

  const selectedEvents = Array.from(formData?.getAll("events") || [])
    .map((value) => value?.toString().trim())
    .filter(Boolean);

  const uniqueSelectedEvents = Array.from(new Set(selectedEvents));

  rawFormData = {
    delegateid,
    name: nameValue,
    mobileno: mobileNumberValue,
    email: emailValue,
    collegeyear: collegeYearValue,
    iskmcstudent: isKmcStudent,
    kmcrollno: kmcRollValue,
    ispgstudent: isPgStudent,
    collegename: collegeNameValue,
    events: participationtype === "active" ? uniqueSelectedEvents : [],
    participationtype,
    hastopay: dueAmount,
  };

  ({ data, error } = await supabaseAdmin
    .from(UNCONFIRMED_TABLE)
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
