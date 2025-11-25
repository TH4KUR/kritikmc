import Link from "next/link";
import { cookies } from "next/headers";
import Checkmark from "../registration/components/icons/Checkmark";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { buildMetadata } from "@/app/lib/metadata";

export const metadata = buildMetadata({
  title: "Registration Successful",
  description:
    "Your Kriti registration has been received. Review your delegate details and next steps after payment verification.",
  path: "/success",
  keywords: ["kriti registration success", "delegate confirmation", "kmc registration"],
});

function decodeRegistrationData(rawValue) {
  if (!rawValue) return null;

  try {
    const json = Buffer.from(rawValue, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch (error) {
    console.error("Failed to decode registration data cookie", error);
    return null;
  }
}

function buildDetailEntries(registrationData) {
  if (!registrationData) return [];

  const normalized = {
    delegateId: registrationData.delegateId || registrationData.delegateid,
    name: registrationData.name || registrationData.studentName,
    email: registrationData.email || registrationData.studentEmail,
    mobileNumber:
      registrationData.mobileNumber ||
      registrationData.mobileno ||
      registrationData.studentNumber,
    college:
      registrationData.college ||
      registrationData.collegename ||
      registrationData.studentCollege,
    collegeYear:
      registrationData.collegeYear ?? registrationData.collegeyear ?? null,
    events: Array.isArray(registrationData.events)
      ? registrationData.events
      : registrationData.events
        ? [registrationData.events]
        : [],
  };

  if (registrationData.passiveDelegate) {
    normalized.events = [
      ...(normalized.events || []),
      "Passive Delegate Registration",
    ];
  }

  if (registrationData.ambossWorkshop) {
    normalized.events = [...(normalized.events || []), "AMBOSS Workshop"];
  }

  const entries = [];

  if (normalized.delegateId) {
    entries.push({ label: "Delegate ID", value: normalized.delegateId });
  }

  if (normalized.name) {
    entries.push({ label: "Name", value: normalized.name });
  }

  if (normalized.email) {
    entries.push({ label: "Email", value: normalized.email });
  }

  if (normalized.mobileNumber) {
    entries.push({ label: "Mobile Number", value: normalized.mobileNumber });
  }

  if (normalized.college) {
    entries.push({ label: "College", value: normalized.college });
  }

  if (
    normalized.collegeYear !== null &&
    normalized.collegeYear !== undefined &&
    normalized.collegeYear !== ""
  ) {
    entries.push({ label: "Academic Year", value: normalized.collegeYear });
  }

  const events = Array.isArray(normalized.events)
    ? normalized.events.filter(Boolean)
    : [];

  if (events.length > 0) {
    entries.push({ label: "Events", value: events, isList: true });
  }

  return entries;
}

export default function SuccessPage({ searchParams }) {
  const cookieStore = cookies();
  const registrationCookie = cookieStore.get("registrationData")?.value || null;
  const paymentStatusCookie = cookieStore.get("paymentStatus")?.value || null;

  const registrationData = decodeRegistrationData(registrationCookie);
  const statusParam = searchParams?.status?.toLowerCase?.();
  const status = (
    statusParam ||
    paymentStatusCookie ||
    "pending"
  ).toLowerCase();

  const isConfirmed = status === "confirmed";
  const detailEntries = buildDetailEntries(registrationData);

  const heading = isConfirmed ? "Payment Verified" : "Payment Proof Received";

  const subheading = isConfirmed
    ? "Your registration has been confirmed. Welcome aboard!"
    : "Thank you for uploading your payment screenshot. Our team will confirm it shortly.";

  const reminder = isConfirmed
    ? "You will also receive a confirmation email with the next steps."
    : "For the fastest confirmation, try verifying using your UPI reference ID whenever you have it handy.";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-br from-sky-100 to-emerald-100 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full shadow-lg ${
                isConfirmed ? "bg-emerald-500" : "bg-amber-500"
              }`}
            >
              <Checkmark className="size-10 fill-white" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">{heading}</h1>
            <p className="mt-3 text-base text-gray-700">{subheading}</p>
            <p className="mt-2 text-sm font-medium text-gray-600">{reminder}</p>
          </div>

          <section className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-emerald-500/10">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Registration Details
            </h2>
            {detailEntries.length > 0 ? (
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {detailEntries.map(({ label, value, isList }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-gray-800">
                      {isList && Array.isArray(value) ? (
                        <div className="flex flex-wrap gap-2">
                          {value.map((item) => (
                            <span
                              key={`${label}-${item}`}
                              className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-6 text-center text-sm text-emerald-800">
                We could not load your registration details. Please return to
                the payment portal or contact support for assistance.
              </div>
            )}
          </section>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Go to Home
            </Link>
            <Link
              href="/payment/v2"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Back to Payment Portal
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
