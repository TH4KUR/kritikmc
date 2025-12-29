import Link from "next/link";
import Nav from "@/app/components/Nav";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import StatusLookupForm from "./components/StatusLookupForm";
import ResetLookupButton from "./components/ResetLookupButton";
import EditableDetails from "./components/EditableDetails";
import { determineStatus, normaliseEntries, statusCopy } from "./utils";
import { buildMetadata } from "@/app/lib/metadata";
import { fetchDelegatesWithFilters } from "@/app/lib/delegateRecords";
import getEventsData from "@/app/lib/getEventsData";

export const metadata = buildMetadata({
  title: "Check Registration Status",
  description:
    "Look up your Kriti registration, payment confirmation, and delegate details using your ID, email, or mobile number.",
  path: "/payment/status",
  keywords: [
    "kriti payment status",
    "delegate ID lookup",
    "kmc registration status",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TABLE_LABELS = {
  workshop_delegates: "Workshop Registration",
  active_delegates: "Conference Registration",
  passive_delegates: "Conference Registration",
  unconfirmed_delegates: "Conference Registration",
};

const deriveScreenshotUrl = (delegate) => {
  if (!delegate) return null;

  if (delegate.paymentss) {
    return delegate.paymentss;
  }

  if (delegate.screenshotbucketpath) {
    if (delegate.screenshotbucketpath.startsWith("http")) {
      return delegate.screenshotbucketpath;
    }

    const normalizedPath = delegate.screenshotbucketpath
      .replace(/^paymentss\//, "")
      .replace(/^\//, "");

    if (normalizedPath) {
      const {
        data: { publicUrl: derivedUrl },
      } = supabaseAdmin.storage.from("paymentss").getPublicUrl(normalizedPath);

      return derivedUrl || null;
    }
  }

  return null;
};

export default async function StatusPage({ searchParams }) {
  const rawDelegateIdQuery = (searchParams?.delegateId || "").toString().trim();
  const emailQuery = (searchParams?.email || "")
    .toString()
    .trim()
    .toLowerCase();
  const mobileQuery = (searchParams?.mobileno || "").toString().trim();
  const noticeParam = (searchParams?.notice || "")
    .toString()
    .trim()
    .toLowerCase();

  const delegateIdFromQuery = rawDelegateIdQuery
    ? rawDelegateIdQuery.toUpperCase()
    : "";
  const trimmedEmail = emailQuery || undefined;
  const trimmedMobile = mobileQuery || undefined;

  const hasDelegateIdQuery = Boolean(delegateIdFromQuery);
  const hasEmailQuery = Boolean(trimmedEmail);
  const hasMobileQuery = Boolean(trimmedMobile);
  const effectiveDelegateId = delegateIdFromQuery;
  const hasQuery = Boolean(
    effectiveDelegateId || trimmedEmail || trimmedMobile
  );
  const defaultDelegateIdForForm = delegateIdFromQuery;
  const headingText =
    noticeParam === "already-registered"
      ? "ALREADY REGISTERED"
      : noticeParam === "details-updated"
        ? "Details Updated"
        : "Registration Status";

  let delegates = [];
  let fetchError = null;
  let eventsCatalog = [];

  const filters = [];

  if (effectiveDelegateId) {
    filters.push((query) => query.eq("delegateid", effectiveDelegateId));
  }

  if (trimmedEmail) {
    filters.push((query) => query.ilike("email", trimmedEmail));
  }

  if (trimmedMobile) {
    filters.push((query) => query.eq("mobileno", trimmedMobile));
  }

  if (filters.length) {
    const { delegates: fetchedDelegates, error } =
      await fetchDelegatesWithFilters(
        filters,
        "delegateid,name,email,mobileno,collegename,collegeyear,events,participationtype,paymentconfirmed,screenshotbucketpath,paymentss,upitransactionid"
      );

    console.log("status res:", fetchedDelegates, error);
    delegates = (fetchedDelegates || []).map(({ delegate, table }) => ({
      delegate,
      table,
      screenshotUrl: deriveScreenshotUrl(delegate),
    }));
    fetchError = error;
  }

  if (delegates.length) {
    try {
      eventsCatalog = await getEventsData();
    } catch (err) {
      console.error("Failed to load events catalog", err);
      eventsCatalog = [];
    }
  }

  const entries = delegates
    .map(({ delegate, table, screenshotUrl }) => {
      const status = determineStatus(delegate);
      return {
        delegate,
        table,
        status,
        copy: statusCopy(status, delegate?.delegateid || effectiveDelegateId),
        details: normaliseEntries(delegate),
        screenshotUrl,
      };
    })
    .reverse();

  const hasMultiple = entries.length > 1;

  const fallbackCopy = statusCopy(
    determineStatus(null),
    effectiveDelegateId || ""
  );

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bgSecondary/[0.01] py-12 px-4">
        <div className="mx-auto w-full max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">{headingText}</h1>
            <p className="mt-3 text-base text-gray-600">
              Enter your delegate ID, registered email, or mobile number to
              check payment progress and next steps.
            </p>
          </header>

          {noticeParam === "details-updated" && (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-800">
              Contact information updated successfully. We sent a confirmation
              email to your registered inbox.
            </div>
          )}

          {!hasQuery && (
            <StatusLookupForm defaultDelegateId={defaultDelegateIdForForm} />
          )}

          {fetchError && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              We were unable to retrieve your registration right now. Please
              retry in a moment.
            </div>
          )}

          {hasQuery ? (
            <div className="space-y-6">
              {entries.length ? (
                <div className="space-y-4">
                  {hasMultiple && (
                    <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                      Multiple registrations found. Expand a card below to view
                      details for each registration type.
                    </div>
                  )}

                  {entries.map(
                    (
                      { delegate, table, copy, details, screenshotUrl },
                      index
                    ) => (
                      <details
                        key={`${table}-${delegate?.delegateid || effectiveDelegateId}`}
                        className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100"
                        open={!hasMultiple}
                      >
                        <summary className="flex cursor-pointer items-center gap-3 bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800">
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="text-xs uppercase tracking-wide text-gray-500">
                              {TABLE_LABELS[table] || "Registration"}
                            </span>
                            <span className="text-base text-gray-900">
                              {delegate?.delegateid ||
                                effectiveDelegateId ||
                                "Registration"}
                            </span>
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${copy.badge.tone}`}
                          >
                            {copy.badge.text}
                          </span>
                          <span className="text-xs text-gray-500">
                            Click to toggle
                          </span>
                        </summary>

                        <div className="p-6">
                          <div className="mb-6 text-center">
                            <h2 className="text-2xl font-semibold text-gray-900">
                              {copy.heading}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                              {copy.body}
                            </p>
                          </div>

                          {delegate && (
                            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                              {details.map(({ label, value, isList }) => (
                                <div
                                  key={label}
                                  className="rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3"
                                >
                                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    {label}
                                  </dt>
                                  <dd className="mt-1 text-sm font-medium text-gray-800">
                                    {isList && Array.isArray(value) ? (
                                      <div className="flex flex-wrap gap-2">
                                        {value.map((entry) => (
                                          <span
                                            key={`${label}-${entry}`}
                                            className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent text-wrap"
                                          >
                                            {entry}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      value
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </div>
                          )}

                          {delegate && !delegate.paymentconfirmed && (
                            <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                              Your delegate ID is securely stored and will be
                              displayed here once your payment is verified.
                            </p>
                          )}

                          {delegate?.upitransactionid && (
                            <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                              Verified using UPI reference ID
                              <span className="ml-2 font-semibold">
                                {delegate.upitransactionid}
                              </span>
                              .
                            </div>
                          )}

                          {screenshotUrl && (
                            <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                                  Uploaded Payment Proof
                                </h3>
                                <a
                                  href={screenshotUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-semibold text-accent hover:text-accent/80"
                                >
                                  Open Full Image
                                </a>
                              </div>
                              <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={screenshotUrl}
                                  alt="Uploaded payment proof"
                                  className="max-h-96 w-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          )}

                          {delegate && (
                            <EditableDetails
                              delegate={delegate}
                              eventsCatalog={eventsCatalog}
                            />
                          )}

                          {copy.actions?.length ? (
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                              {copy.actions.map((action) =>
                                action.external ? (
                                  <a
                                    key={action.label}
                                    href={action.href}
                                    className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                                      action.style === "primary"
                                        ? "bg-accent text-white hover:bg-accent/90"
                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {action.label}
                                  </a>
                                ) : (
                                  <Link
                                    key={action.label}
                                    href={action.href}
                                    className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                                      action.style === "primary"
                                        ? "bg-accent text-white hover:bg-accent/90"
                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                  >
                                    {action.label}
                                  </Link>
                                )
                              )}
                            </div>
                          ) : null}
                        </div>
                      </details>
                    )
                  )}
                </div>
              ) : (
                <section className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-gray-100">
                  <div className="mb-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${fallbackCopy.badge.tone}`}
                    >
                      {fallbackCopy.badge.text}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                      {fallbackCopy.heading}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      {fallbackCopy.body}
                    </p>
                  </div>
                  {fallbackCopy.actions?.length ? (
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                      {fallbackCopy.actions.map((action) =>
                        action.external ? (
                          <a
                            key={action.label}
                            href={action.href}
                            className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                              action.style === "primary"
                                ? "bg-accent text-white hover:bg-accent/90"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {action.label}
                          </a>
                        ) : (
                          <Link
                            key={action.label}
                            href={action.href}
                            className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                              action.style === "primary"
                                ? "bg-accent text-white hover:bg-accent/90"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {action.label}
                          </Link>
                        )
                      )}
                    </div>
                  ) : null}
                </section>
              )}

              {hasQuery && (
                <div className="mt-2 flex justify-center">
                  <ResetLookupButton />
                </div>
              )}
            </div>
          ) : (
            <section className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-8 text-center text-sm text-gray-600">
              Provide your delegate ID, email, or mobile number above to view
              payment updates and download your receipt once verified.
            </section>
          )}
        </div>
      </main>
    </>
  );
}
