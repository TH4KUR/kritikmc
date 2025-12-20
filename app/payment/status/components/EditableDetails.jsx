"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import InputEvents from "@/app/registration/components/InputEvents";
import {
  deriveEditableDiff,
  hasPendingChanges,
  maskEmail,
  normaliseEventsInput,
  sanitizeEditablePayload,
} from "../utils/editableFields";

const initialStateFromDelegate = (delegate) => ({
  name: delegate?.name || "",
  email: delegate?.email || "",
  mobileno: delegate?.mobileno || "",
  events: normaliseEventsInput(delegate?.events || []),
});

export default function EditableDetails({ delegate, eventsCatalog = [] }) {
  const router = useRouter();
  const originalValues = useMemo(
    () => initialStateFromDelegate(delegate),
    [delegate]
  );

  const participationType = (delegate?.participationtype || "")
    .toString()
    .toLowerCase();
  const canEditEvents = participationType === "active";

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(originalValues.name);
  const [email, setEmail] = useState(originalValues.email);
  const [mobileno, setMobileno] = useState(originalValues.mobileno);
  const [selectedEvents, setSelectedEvents] = useState(originalValues.events);
  const [formError, setFormError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [pendingChanges, setPendingChanges] = useState(null);
  const [modalError, setModalError] = useState("");
  const [loading, setLoading] = useState({ sending: false, verifying: false });
  const [successState, setSuccessState] = useState(false);

  const draftState = useMemo(
    () => ({ name, email, mobileno, events: selectedEvents }),
    [name, email, mobileno, selectedEvents]
  );

  const dirty = useMemo(
    () => hasPendingChanges(originalValues, draftState),
    [originalValues, draftState]
  );

  useEffect(() => {
    setName(originalValues.name);
    setEmail(originalValues.email);
    setMobileno(originalValues.mobileno);
    setSelectedEvents(originalValues.events);
  }, [originalValues]);

  const resetForm = () => {
    setName(originalValues.name);
    setEmail(originalValues.email);
    setMobileno(originalValues.mobileno);
    setSelectedEvents(originalValues.events);
    setFormError("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setOtpSent(false);
    setMaskedEmail("");
    setOtpValue("");
    setModalError("");
    setPendingChanges(null);
    setLoading({ sending: false, verifying: false });
    setSuccessState(false);
  };

  const prepareChanges = () => {
    setFormError("");
    try {
      const diff = deriveEditableDiff(originalValues, draftState);
      if (!Object.keys(diff).length) {
        throw new Error("No changes detected yet.");
      }
      const sanitized = sanitizeEditablePayload(diff);
      setPendingChanges(sanitized);
      setOtpSent(false);
      setMaskedEmail("");
      setOtpValue("");
      setSuccessState(false);
      setModalOpen(true);
      setModalError("");
    } catch (error) {
      setFormError(error?.message || "Unable to prepare changes.");
    }
  };

  const requestOtp = async () => {
    if (!pendingChanges) return;
    setLoading((state) => ({ ...state, sending: true }));
    setModalError("");
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          delegateId: delegate.delegateid,
          changes: pendingChanges,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to send OTP.");
      }
      setOtpSent(true);
      setMaskedEmail(data.maskedEmail || maskEmail(delegate.email));
    } catch (error) {
      setModalError(error?.message || "Unable to send OTP.");
    } finally {
      setLoading((state) => ({ ...state, sending: false }));
    }
  };

  const verifyOtp = async () => {
    if (!pendingChanges) return;
    if (!otpValue.trim()) {
      setModalError("Enter the six-digit OTP to continue.");
      return;
    }
    setLoading((state) => ({ ...state, verifying: true }));
    setModalError("");
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          delegateId: delegate.delegateid,
          otp: otpValue.trim(),
          changes: pendingChanges,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to verify OTP.");
      }
      setSuccessState(true);
      setTimeout(() => {
        closeModal();
        router.push(
          `/payment/status?delegateId=${encodeURIComponent(
            delegate.delegateid
          )}&notice=details-updated`
        );
        router.refresh();
      }, 1200);
    } catch (error) {
      setModalError(error?.message || "Failed to update details.");
    } finally {
      setLoading((state) => ({ ...state, verifying: false }));
    }
  };

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Need to update your details?
          </h3>
          <p className="text-sm text-gray-600">
            {canEditEvents
              ? "Edit your name, email, mobile number, or events. We\'ll send an OTP to your registered email before applying changes."
              : "Edit your name, email, or mobile number. We\'ll send an OTP to your registered email before applying changes."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              resetForm();
            }
            setIsEditing((prev) => !prev);
          }}
          className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit details"}
        </button>
      </div>

      {isEditing && (
        <div className="mt-6 space-y-4">
          <div>
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="editable-name"
            >
              Full name
            </label>
            <input
              id="editable-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="editable-email"
            >
              Email
            </label>
            <input
              id="editable-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="editable-mobile"
            >
              Mobile number
            </label>
            <input
              id="editable-mobile"
              value={mobileno}
              onChange={(event) => setMobileno(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="10-digit number"
            />
          </div>

          {canEditEvents && (
            <div>
              <InputEvents
                events={eventsCatalog}
                disableFilters
                selectedEvents={selectedEvents}
                onSelectedEventsChange={setSelectedEvents}
                legendText="Select your events"
                helperText="Use the checkboxes below to manage every event linked to your registration."
                checkboxName={undefined}
              />
            </div>
          )}

          {formError && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-800">
              {formError}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={prepareChanges}
              disabled={!dirty}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                dirty
                  ? "bg-accent hover:bg-accent/90"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              Review &amp; Verify
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {successState ? (
              <div className="text-center">
                <p className="text-3xl">🎉</p>
                <h4 className="mt-3 text-lg font-semibold text-gray-900">
                  Details updated!
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Redirecting you to the updated status page.
                </p>
              </div>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-gray-900">
                  Verify via OTP
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  We&apos;ll send a one-time password to your registered email
                  to confirm these changes.
                </p>

                {otpSent && (
                  <div className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    OTP sent to <strong>{maskedEmail}</strong>. Enter it below
                    to continue.
                  </div>
                )}

                {modalError && (
                  <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-800">
                    {modalError}
                  </div>
                )}

                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={requestOtp}
                    disabled={loading.sending}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading.sending ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"
                          aria-hidden="true"
                        />
                        Sending…
                      </span>
                    ) : (
                      <>{otpSent ? "Resend OTP" : "Send OTP"}</>
                    )}
                  </button>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpValue}
                    onChange={(event) => setOtpValue(event.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-center text-lg tracking-widest focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />

                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={!otpSent || loading.verifying}
                    className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                      otpSent
                        ? "bg-accent hover:bg-accent/90"
                        : "cursor-not-allowed bg-gray-300"
                    }`}
                  >
                    {loading.verifying ? "Verifying…" : "Submit & Update"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
