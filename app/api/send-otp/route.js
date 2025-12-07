import crypto from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { fetchDelegateById } from "@/app/lib/delegateRecords";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import {
  areEventsEqual,
  maskEmail,
  normaliseMobile,
  sanitizeEditablePayload,
} from "@/app/payment/status/utils/editableFields";

const resend = new Resend(process.env.RESEND_API_KEY);
const OTP_TABLE = "delegate_otps";
const OTP_EXPIRY_MINUTES = 10;
const FROM_EMAIL = "Kriti Registrations OTP <noreply@kritikmc.com>";

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashOtp(otp) {
  return crypto.createHash("sha256").update(String(otp)).digest("hex");
}

function hasRealChanges(existing, updates) {
  return Object.entries(updates).some(([field, value]) => {
    if (field === "events") {
      return !areEventsEqual(existing.events, value);
    }

    if (field === "mobileno") {
      return normaliseMobile(existing.mobileno) !== value;
    }

    return (
      String(existing[field] || "")
        .trim()
        .toLowerCase() !== value
    );
  });
}

async function upsertOtpRecord({ delegateId, email, payload, otp, expiresAt }) {
  await supabaseAdmin.from(OTP_TABLE).delete().eq("delegateid", delegateId);

  const { error } = await supabaseAdmin.from(OTP_TABLE).insert({
    delegateid: delegateId,
    email,
    payload,
    otp_hash: hashOtp(otp),
    expires_at: expiresAt,
  });

  if (error) {
    throw new Error("Unable to store OTP. Please try again.");
  }
}

async function sendOtpEmail({ email, otp, delegateId, expiresAt }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Email service not configured. Contact support.");
  }

  const formattedExpiry = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(expiresAt));

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your Kriti registration update",
    html: `
      <p>Hi there,</p>
      <p>Use the following one-time password to confirm the changes requested for delegate ID <strong>${delegateId}</strong>.</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
      <p>This OTP expires at <strong>${formattedExpiry}</strong>. If you did not request this update, ignore this email.</p>
      <p>– Team Kriti</p>
    `,
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const delegateId = body?.delegateId?.toString().trim().toUpperCase();
    const requestedChanges = body?.changes || {};

    if (!delegateId) {
      throw new Error("Delegate ID is required.");
    }

    const sanitizedChanges = sanitizeEditablePayload(requestedChanges);
    if (!Object.keys(sanitizedChanges).length) {
      throw new Error("No valid changes detected.");
    }

    const { delegate, error: delegateError } = await fetchDelegateById(
      delegateId,
      "delegateid,email,mobileno,events"
    );

    if (delegateError) {
      throw new Error("Unable to locate delegate record.");
    }

    if (!delegate) {
      throw new Error("No delegate found for the provided ID.");
    }

    if (!delegate.email) {
      throw new Error(
        "No email is associated with this delegate. Contact support."
      );
    }

    if (!hasRealChanges(delegate, sanitizedChanges)) {
      throw new Error("Those details already match your current record.");
    }

    const expiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    ).toISOString();
    const otp = generateOtp();

    await upsertOtpRecord({
      delegateId,
      email: delegate.email,
      payload: sanitizedChanges,
      otp,
      expiresAt,
    });

    await sendOtpEmail({
      email: delegate.email,
      otp,
      delegateId,
      expiresAt,
    });

    return NextResponse.json(
      {
        success: true,
        maskedEmail: maskEmail(delegate.email),
        expiresAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("/send-otp error", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to send OTP.",
      },
      { status: 400 }
    );
  }
}
