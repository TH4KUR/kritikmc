import Link from "next/link";
import Nav from "@/app/components/Nav";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import StatusLookupForm from "./components/StatusLookupForm";
import ResetLookupButton from "./components/ResetLookupButton";
import { determineStatus, normaliseEntries, statusCopy } from "./utils";
import { buildMetadata } from "@/app/lib/metadata";

export const metadata = buildMetadata({
  title: "Check Registration Status",
  description:
    "Look up your Kriti registration, payment confirmation, and delegate details using your ID, email, or mobile number.",
  path: "/payment/status",
  keywords: ["kriti payment status", "delegate ID lookup", "kmc registration status"],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StatusPage({ searchParams }) {
  const rawDelegateIdQuery = (searchParams?.delegateId || "").toString().trim();
  const emailQuery = (searchParams?.email || "")
    .toString()
    .trim()
    .toLowerCase();
  const mobileQuery = (searchParams?.mobileno || "").toString().trim();

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

  let delegate = null;
  let fetchError = null;
  let screenshotUrl = null;

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
    let query = supabaseAdmin
      .from("activedelegates")
      .select(
        "delegateid,name,email,mobileno,collegename,collegeyear,events,participationtype,paymentconfirmed,screenshotbucketpath,paymentss,upitransactionid"
      )
      .limit(1);
    filters.forEach((applyFilter) => {
      query = applyFilter(query);
    });

    const { data, error } = await query;

    console.log("status res:", data, error);
    delegate = data?.[0] || null;
    fetchError = error;

    if (delegate?.paymentss) {
      screenshotUrl = delegate.paymentss;
    } else if (delegate?.screenshotbucketpath) {
      if (delegate.screenshotbucketpath.startsWith("http")) {
        screenshotUrl = delegate.screenshotbucketpath;
      } else {
        const normalizedPath = delegate.screenshotbucketpath
          .replace(/^paymentss\//, "")
          .replace(/^\//, "");
        if (normalizedPath) {
          const {
            data: { publicUrl: derivedUrl },
          } = supabaseAdmin.storage
            .from("paymentss")
            .getPublicUrl(normalizedPath);
          screenshotUrl = derivedUrl || null;
        }
      }
    }
  }

  const status = determineStatus(delegate);
  const copy = statusCopy(status, delegate?.delegateid || effectiveDelegateId);
  const details = normaliseEntries(delegate);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bgSecondary/[0.01] py-12 px-4">
        <div className="mx-auto w-full max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Registration Status
            </h1>
            <p className="mt-3 text-base text-gray-600">
              Enter your delegate ID, registered email, or mobile number to
              check payment progress and next steps.
            </p>
          </header>

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
            <section className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-gray-100">
              <div className="mb-6 text-center">
                <span
                  className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${copy.badge.tone}`}
                >
                  {copy.badge.text}
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                  {copy.heading}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{copy.body}</p>
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
                                className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
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

              {hasQuery && (
                <div className="mt-4 flex justify-center">
                  <ResetLookupButton />
                </div>
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
            </section>
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
