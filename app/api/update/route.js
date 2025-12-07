import crypto from "crypto";
import { NextResponse } from "next/server";
import { ID_TO_TABLE, fetchDelegateById } from "@/app/lib/delegateRecords";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import {
  areEventsEqual,
  sanitizeEditablePayload,
} from "@/app/payment/status/utils/editableFields";

const OTP_TABLE = "delegate_otps";

function hashOtp(otp) {
  return crypto.createHash("sha256").update(String(otp)).digest("hex");
}

function assertAllowedTable(delegateId) {
  const prefix = delegateId.split("-")[0]?.toUpperCase();
  const table = ID_TO_TABLE[prefix];
  if (!table) {
    throw new Error("Unsupported delegate ID prefix.");
  }
  return table;
}

function payloadMatches(storedPayload, requestedPayload) {
  if (!storedPayload || !requestedPayload) return false;

  const storedKeys = Object.keys(storedPayload);
  const requestedKeys = Object.keys(requestedPayload);
  if (storedKeys.length !== requestedKeys.length) return false;

  return storedKeys.every((key) => {
    if (!requestedPayload.hasOwnProperty(key)) return false;
    if (key === "events") {
      return areEventsEqual(storedPayload[key], requestedPayload[key]);
    }
    if (key === "mobileno") {
      return storedPayload[key] === requestedPayload[key];
    }
    return (
      String(storedPayload[key]).toLowerCase() ===
      String(requestedPayload[key]).toLowerCase()
    );
  });
}

async function fetchPendingOtp(delegateId) {
  const { data, error } = await supabaseAdmin
    .from(OTP_TABLE)
    .select("id, otp_hash, payload, expires_at, used")
    .eq("delegateid", delegateId)
    .eq("used", false)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error("Unable to verify OTP right now. Please retry.");
  }

  return data?.[0] || null;
}

async function markOtpAsUsed(id) {
  await supabaseAdmin
    .from(OTP_TABLE)
    .update({ used: true, used_at: new Date().toISOString() })
    .eq("id", id);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const delegateId = body?.delegateId?.toString().trim().toUpperCase();
    const otp = body?.otp?.toString().trim();
    const requestedChanges = body?.changes || {};

    if (!delegateId) {
      throw new Error("Delegate ID is required.");
    }

    if (!otp) {
      throw new Error("OTP is required.");
    }

    const sanitizedChanges = sanitizeEditablePayload(requestedChanges);
    if (!Object.keys(sanitizedChanges).length) {
      throw new Error("No valid changes detected.");
    }

    const pendingOtp = await fetchPendingOtp(delegateId);
    if (!pendingOtp) {
      throw new Error("No active OTP found. Please request a new one.");
    }

    const hashedIncomingOtp = hashOtp(otp);
    if (hashedIncomingOtp !== pendingOtp.otp_hash) {
      throw new Error("Invalid OTP provided.");
    }

    if (!payloadMatches(pendingOtp.payload, sanitizedChanges)) {
      throw new Error(
        "The provided updates differ from what was verified. Please restart the process."
      );
    }

    const { delegate, error: fetchError } = await fetchDelegateById(
      delegateId,
      "delegateid,email,mobileno,events"
    );

    if (fetchError) {
      throw new Error("Unable to load delegate record.");
    }

    if (!delegate) {
      throw new Error("Delegate not found.");
    }

    const table = assertAllowedTable(delegateId);

    const { error: updateError } = await supabaseAdmin
      .from(table)
      .update(sanitizedChanges)
      .eq("delegateid", delegateId);

    if (updateError) {
      throw new Error("Failed to update delegate details. Please retry.");
    }

    await markOtpAsUsed(pendingOtp.id);

    return NextResponse.json(
      {
        success: true,
        message: "Details updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("/update error", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unable to update records.",
      },
      { status: 400 }
    );
  }
}
