"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DelegateIdForm() {
  const [delegateId, setDelegateId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!delegateId.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Redirect to the same page with delegate ID as search param
    router.push(`/payment/v2?delegateId=${delegateId.trim()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enter Your Delegate ID
        </h2>
        <p className="text-gray-600 text-sm">
          Please enter your delegate ID to access the payment portal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="delegate-id"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Delegate ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="delegate-id"
            value={delegateId}
            onChange={(e) => setDelegateId(e.target.value)}
            placeholder="Enter your delegate ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-center text-lg font-mono"
            required
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-2">
            Your delegate ID was sent to you via email after registration
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !delegateId.trim()}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
            isSubmitting || !delegateId.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white transform hover:scale-105 shadow-md hover:shadow-lg"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Continue to Payment Portal"
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Don&apos;t have a delegate ID?{" "}
          <a
            href="/registration"
            className="text-accent font-medium hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
