import SupabaseUploader from "./components/SupabaseUploader";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import Image from "next/image";
import DelegateIdForm from "./components/DelegateIdForm";
import Nav from "@/app/components/Nav";
import { buildMetadata } from "@/app/lib/metadata";

export const metadata = buildMetadata({
  title: "Kriti Payment Portal",
  description:
    "Confirm your Kriti registration by uploading payment proof or submitting your UPI reference ID in the payment portal.",
  path: "/payment/v2",
  keywords: ["kriti payment portal", "upload payment proof", "kmc registration payment"],
  robots: {
    index: false,
    follow: false,
  },
});

export default async function Home({ searchParams: { delegateId } }) {
  let data, error, unclaimedCountx;
  const rawDelegateId = (delegateId ?? "").toString().trim();
  const delId = rawDelegateId ? rawDelegateId.toUpperCase() : null;
  const formatRupees = (value, fallback = "NA") => {
    if (value === null || value === undefined) return fallback;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return fallback;
    return `₹${numeric}`;
  };

  try {
    // Only fetch data if we have a delegate ID
    if (delId) {
      const res = await supabaseAdmin
        .from("activedelegates")
        .select(
          "delegateid,name,mobileno,email,collegename,collegeyear,events,paymentconfirmed,screenshotbucketpath,upitransactionid,hastopay"
        )
        .eq("delegateid", delId);

      ({ count: unclaimedCountx } = await supabaseAdmin
        .from("transactions")
        .select("*", { count: "exact" })
        .eq("isused", false));
      console.log("supabase data:", data);
      data = res?.data?.[0] || null;
      error = res?.error;
      if (error) throw new Error(error.message);
      console.log(data, delId);
      if (!data) throw new Error("No data returned by supabase.. Check ID.");
    }
  } catch (err) {
    console.log("error occurred: ", err);
  }

  const amountDueNumber = Number(data?.hastopay ?? NaN);
  const hasValidAmount =
    Number.isFinite(amountDueNumber) && amountDueNumber > 0;
  const upiLink = data?.delegateid
    ? (() => {
        const params = new URLSearchParams({
          pa: "77878301@ubin",
          pn: "KritiKMC",
          cu: "INR",
        });
        if (hasValidAmount) {
          params.set("am", amountDueNumber.toString());
        }
        params.set("tn", data.delegateid);
        params.set("tr", data.delegateid);
        return `upi://pay?${params.toString()}`;
      })()
    : null;
  const qrDownloadHref = "/payment_qr.jpg";
  const qrDownloadName = data?.delegateid
    ? `${data.delegateid}-kriti-payment-qr.jpg`
    : "kriti-payment-qr.jpg";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bgSecondary/5 py-12 px-4">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-3 text-gray-800">
            Payment Portal
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Complete your registration by uploading payment proof
          </p>

          {/* Show Delegate ID Form if no ID is found */}
          {!delId && (
            <div className="max-w-md mx-auto">
              <DelegateIdForm />
            </div>
          )}

          {/* Show payment content only if delegate ID exists */}
          {delId && !data && !error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
              <h2 className="text-xl font-semibold mb-2">Delegate Not Found</h2>
              <p className="text-sm mb-3">
                We couldn&apos;t find a registration for the delegate ID
                <span className="font-semibold"> {delId}</span>. Please
                double-check the ID or visit the status page to review your
                registration details.
              </p>
              <a
                href={`/payment/status?delegateId=${encodeURIComponent(delId)}`}
                className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Check Registration Status
              </a>
            </div>
          )}

          {delId && error && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
              <h2 className="text-xl font-semibold mb-2">
                Unable to load delegate details
              </h2>
              <p className="text-sm mb-3">
                We ran into an issue while fetching your registration
                information. Please refresh the page, or try again in a few
                minutes.
              </p>
              <a
                href={`/payment/status?delegateId=${encodeURIComponent(delId)}`}
                className="inline-flex items-center rounded-full border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
              >
                Go to Status Page
              </a>
            </div>
          )}

          {delId && data && !data.paymentconfirmed && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-5">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Delegate Information
              </h2>
              {(() => {
                const rows = [
                  { label: "Delegate ID", value: data.delegateid },
                  { label: "Name", value: data.name },
                  { label: "Email", value: data.email },
                  { label: "Mobile Number", value: data.mobileno },
                  { label: "College", value: data.collegename },
                  {
                    label: "Academic Year",
                    value:
                      data.collegeyear === null ||
                      data.collegeyear === undefined
                        ? "NA"
                        : data.collegeyear,
                  },
                  {
                    label: "Events",
                    value: Array.isArray(data.events)
                      ? data.events.join(", ")
                      : data.events || "NA",
                  },
                  {
                    label: "Amount Due",
                    value: formatRupees(data.hastopay),
                  },
                ];

                return (
                  <div className="space-y-3">
                    {rows.map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-8">
                        <span className="font-medium text-gray-600 min-w-[120px]">
                          {label}
                        </span>
                        <span className="text-gray-800 font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {delId && data && data.paymentconfirmed && (
            <div className="border border-green-200 bg-green-50 rounded-lg p-6 text-green-800">
              <h2 className="text-xl font-semibold mb-2">
                Payment Already Confirmed
              </h2>
              <p className="text-sm mb-4">
                Our records show that the payment for delegate ID
                <span className="font-semibold"> {data.delegateid}</span> has
                already been verified. If you believe this is an error, please
                contact the organising team.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`/payment/status?delegateId=${encodeURIComponent(data.delegateid)}`}
                  className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                >
                  View Registration Status
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=918700621534&text=Hi%20I%20want%20help%20with%20Kriti%20Registration%20in...."
                  className="inline-flex items-center rounded-full border border-green-200 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                >
                  Contact Support
                </a>
              </div>
            </div>
          )}

          {delId && data && !data.paymentconfirmed && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 col-span-1 h-fit">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Payment Instructions
                </h2>
                <div className="space-y-3 text-base text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold">1.</span>
                    <p>Scan the QR code or use the payment details provided</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold">2.</span>
                    <p>
                      <strong>Important:</strong> Add your Delegate ID{" "}
                      <span className="bg-yellow-100 px-1 py-0.5 rounded font-mono text-xs">
                        {data?.delegateid || ""}
                      </span>{" "}
                      in the UPI payment remarks/comments section
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold">3.</span>
                    <p>Complete the payment through your preferred UPI app</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold">4.</span>
                    <p>
                      Take a screenshot of the payment confirmation showing
                      transaction details
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold">5.</span>
                    <p>
                      Choose one of the verification methods below - UPI
                      Transaction ID (faster) or screenshot upload (slower)
                    </p>
                  </div>
                </div>

                {/* Payment QR Code Image */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                    Scan to Pay
                  </p>
                  <div className="bg-red-200 border border-red-500 text-red-900 px-3 py-1 rounded mx-auto w-fit">
                    AMOUNT TO PAY: {formatRupees(data.hastopay, "₹0")}
                  </div>
                  <div className="relative w-full aspect-square max-w-sm mx-auto">
                    <Image
                      src="/payment_qr.jpg"
                      alt="Kriti Payment QR Code"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <a
                      href={qrDownloadHref}
                      download={qrDownloadName}
                      className="inline-flex items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      Download QR
                    </a>
                    {upiLink && (
                      <a
                        href={upiLink}
                        className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90"
                      >
                        Open UPI Apps
                      </a>
                    )}
                  </div>
                  {upiLink && (
                    <p className="mt-2 text-xs text-center text-gray-500 break-all">
                      {upiLink}
                    </p>
                  )}
                </div>
              </div>
              {/* Left Column - Delegate Info & Payment Instructions */}

              <div className="space-y-6">
                <SupabaseUploader
                  delegateId={data.delegateid || "unknown"}
                  unclaimedCountx={unclaimedCountx}
                  amountDue={data.hastopay}
                />
                {data.screenshotbucketpath && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    We&apos;ve already received a payment screenshot for this
                    delegate. You can still verify instantly using your UPI
                    reference ID above if you now have it handy.
                  </div>
                )}
              </div>
              {/* Payment Instructions */}

              {/* Right Column - Upload Section */}
            </div>
          )}

          {/* Help Section */}
          {delId && data && !data.paymentconfirmed && (
            <div className="mt-8 bg-amber-100 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">
                    Need Help?
                  </h3>
                  <p className="text-sm text-amber-800">
                    For any queries regarding payment or registration, contact:{" "}
                    <a
                      href="https://api.whatsapp.com/send?phone=918700621534&text=Hi%20I%20want%20help%20with%20Kriti%20Registration%20in...."
                      className="font-medium underline hover:text-amber-900"
                    >
                      +91 8700621534
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
