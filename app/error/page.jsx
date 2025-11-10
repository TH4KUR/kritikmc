import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { supabaseAdmin } from "../lib/supabase/supabaseAdmin";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const msg = searchParams?.msg;
  const rawField = searchParams?.field;
  const value = searchParams?.value;

  const allowedFields = ["email", "mobileno"];
  const field = allowedFields.includes(rawField) ? rawField : null;

  let delegateData = [];
  let delegateError = null;

  if (field && value) {
    const { data, error } = await supabaseAdmin
      .from("activedelegates")
      .select("delegateid,name,email,mobileno,events")
      .eq(field, value);
    delegateData = data || [];
    delegateError = error;
    if (delegateError) {
      console.error("Delegate lookup failed", delegateError);
    }
  }

  const delegate = delegateData?.[0];
  const shouldShowLookupPrompt =
    msg === "Please enter your details to retrieve your registration";
  const hasLookupParams = Boolean(field && value);
  const hasDelegate = Boolean(delegate);

  let headerTitle = "Registration Already Exists";
  let headerDescription = "We found an existing registration with your details";

  if (hasDelegate) {
    headerTitle = "Registration Already Exists";
    headerDescription = "We found an existing registration with your details";
  } else if (shouldShowLookupPrompt || !hasLookupParams) {
    headerTitle = "Find Your Registration";
    headerDescription =
      "Use the payment status dashboard to look up your delegate ID by email or mobile number.";
  } else if (delegateError) {
    headerTitle = "Lookup Temporarily Unavailable";
    headerDescription =
      "We ran into an issue retrieving your details. Please try again.";
  } else {
    headerTitle = "Registration Not Found";
    headerDescription =
      "We couldn’t find a registration with the information provided.";
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          {/* Error Card */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Header with Icon */}
            <div className="bg-yellow-700 px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {headerTitle}
                  </h1>
                  <p className="text-white/90 text-sm mt-1">
                    {headerDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              {(() => {
                if (field && value && delegate) {
                  return (
                    <div className="space-y-6">
                      {/* Info Section */}
                      <div className="bg-blue-900/40 border border-blue-700/50 rounded-lg p-5">
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
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
                          <div className="flex-1">
                            <h3 className="font-semibold text-blue-300 mb-1">
                              Duplicate Registration Detected
                            </h3>
                            <p className="text-sm text-blue-200">
                              A registration already exists with the{" "}
                              <span className="font-semibold">
                                {field === "mobileno"
                                  ? "mobile number"
                                  : "email"}
                              </span>
                              :{" "}
                              <span className="font-mono bg-blue-800/50 px-2 py-0.5 rounded text-blue-100">
                                {value}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Delegate Information */}
                      {delegate && (
                        <div className="bg-gray-900/60 rounded-lg p-5 border border-gray-700">
                          <h3 className="font-semibold text-gray-200 mb-3 flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            Your Registration Details
                          </h3>
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-400 min-w-[100px]">
                                Delegate ID:
                              </span>
                              <span className="text-base font-semibold text-white/70 bg-rose-800 px-3 py-1 rounded">
                                {delegate.delegateid}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-400 min-w-[100px]">
                                Name:
                              </span>
                              <span className="text-sm font-medium text-gray-200">
                                {delegate.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-400 min-w-[100px]">
                                Email:
                              </span>
                              <span className="text-sm font-mono text-gray-200">
                                {delegate.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-400 min-w-[100px]">
                                Mobile:
                              </span>
                              <span className="text-sm font-mono text-gray-200">
                                {delegate.mobileno}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-400 min-w-[100px]">
                                Events:
                              </span>
                              <span className="text-sm font-mono text-gray-200">
                                {(delegate.events || []).join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Section */}
                      <div className="bg-green-900/40 border border-green-700/50 rounded-lg p-5">
                        <h3 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Next Steps
                        </h3>
                        <p className="text-sm text-green-200 mb-4">
                          Complete your registration by submitting your payment
                          proof below
                        </p>
                        <Link
                          href={`/payment/v2?delegateId=${delegate?.delegateid || ""}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          Continue to Payment Portal
                        </Link>
                      </div>

                      {/* Help Section */}
                      <div className="border-t border-gray-700 pt-6">
                        <p className="text-sm text-gray-400 text-center">
                          Need assistance?{" "}
                          <a
                            href="tel:+918700621534"
                            className="text-rose-500 font-medium hover:underline"
                          >
                            Contact Support: +91 8700621534
                          </a>
                        </p>
                      </div>
                    </div>
                  );
                } else if (shouldShowLookupPrompt || !field || !value) {
                  return (
                    <div className="space-y-6 text-center">
                      <div className="bg-blue-900/40 border border-blue-700/50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-blue-100 mb-2">
                          Check Registration Status
                        </h2>
                        <p className="text-sm text-blue-200">
                          We have consolidated registration lookups into the
                          payment status dashboard. Search using your delegate
                          ID, registered email, or mobile number to view your
                          latest status instantly.
                        </p>
                      </div>
                      <Link
                        href="/payment/status"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Open Status Dashboard
                      </Link>
                      <div className="text-sm text-gray-400">
                        Trouble accessing your details?{" "}
                        <a
                          href="tel:+918700621534"
                          className="text-rose-500 font-medium hover:underline"
                        >
                          Contact Support: +91 8700621534
                        </a>
                      </div>
                    </div>
                  );
                } else if (field && value && delegateError) {
                  return (
                    <div className="space-y-6 text-center">
                      <div className="bg-red-900/40 border border-red-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-200 mb-2">
                          Lookup Temporarily Unavailable
                        </h3>
                        <p className="text-sm text-red-200">
                          We ran into an unexpected issue while retrieving your
                          registration. Please try again in a moment or use the
                          support contact below.
                        </p>
                      </div>
                      <div className="text-sm text-gray-400">
                        Need help?{" "}
                        <a
                          href="tel:+918700621534"
                          className="text-rose-500 font-medium hover:underline"
                        >
                          Contact Support: +91 8700621534
                        </a>
                      </div>
                    </div>
                  );
                } else if (field && value && !delegate) {
                  return (
                    <div className="space-y-6 text-center">
                      <div className="bg-red-900/40 border border-red-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-200 mb-2">
                          No Registration Found
                        </h3>
                        <p className="text-sm text-red-200">
                          We could not locate a registration using the provided
                          details. Please double-check your information or try
                          another lookup method.
                        </p>
                      </div>
                      <Link
                        href="/payment/status"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Try Status Dashboard
                      </Link>
                    </div>
                  );
                } else {
                  return (
                    <div className="text-center py-8">
                      <div className="bg-red-900/40 border border-red-700/50 rounded-lg p-6 inline-block">
                        <svg
                          className="w-16 h-16 text-red-400 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-red-300 mb-2">
                          An Error Occurred
                        </h3>
                        <p className="text-sm text-red-200 mb-4">
                          {msg || "Something went wrong. Please try again."}
                        </p>
                        <Link
                          href="/"
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                          </svg>
                          Return to Home
                        </Link>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
