import { cookies } from "next/headers";
import SupabaseUploader from "./components/SupabaseUploader";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import Image from "next/image";
import DelegateIdForm from "./components/DelegateIdForm";
import Nav from "@/app/components/Nav";

export default async function Home({ searchParams: { delegateId } }) {
  let data, error, unclaimedCountx;
  let delId = null;

  try {
    delId = cookies()?.get("delegateid")?.value || delegateId;

    // Only fetch data if we have a delegate ID
    if (delId) {
      const res = await supabaseAdmin
        .from("activedelegates")
        .select("delegateid,name,mobileno,email,collegename,collegeyear,events")
        .eq("delegateid", delId);

      ({ count: unclaimedCountx } = await supabaseAdmin
        .from("transactions")
        .select("*", { count: "exact" })
        .eq("isused", false));

      data = res.data[0];
      error = res.error;
      console.log(data, delId);
    }
  } catch (err) {
    console.log("error occurred: ", err);
  }

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
          {delId && data && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-5">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Delegate Information
              </h2>
              <div className="space-y-3">
                {Object.keys(data).map((key, i) => {
                  return (
                    <div key={i} className="flex items-start gap-8">
                      <span className="font-medium text-gray-600 min-w-[120px]">
                        {key.toLocaleUpperCase()}
                      </span>
                      <span className="text-gray-800 font-mono">
                        {Array.isArray(data[key])
                          ? data[key].join(", ")
                          : data[key] || "NA"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {delId && data && (
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
                        {data?.[0] ? Object.values(data[0])[0] : ""}
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
                  <div className="relative w-full aspect-square max-w-sm mx-auto">
                    <Image
                      src="/Payment_Image_1.jpg"
                      alt="Payment QR Code"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
              {/* Left Column - Delegate Info & Payment Instructions */}

              <div className="space-y-6">
                <SupabaseUploader
                  delegateId={data.delegateid || "unknown"}
                  unclaimedCountx={unclaimedCountx}
                />
              </div>
              {/* Payment Instructions */}

              {/* Right Column - Upload Section */}
            </div>
          )}

          {/* Help Section */}
          {delId && data && (
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
                      href="tel:+918700621534"
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
