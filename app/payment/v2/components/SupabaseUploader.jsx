"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatInr } from "@/app/lib/paymentConfig";

export default function SupabaseUploader({
  delegateId,
  unclaimedCountx,
  amountDue,
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [unclaimedCount, setUnclaimedCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [upiError, setUpiError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [updatingCount, setUpdatingCount] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null); // 'upi' or 'upload'
  const [countStatus, setCountStatus] = useState(null);
  const formattedDueAmount =
    amountDue !== null && amountDue !== undefined ? formatInr(amountDue) : null;

  const statusColorMap = {
    success: "border-green-200 bg-green-50 text-green-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    error: "border-red-200 bg-red-50 text-red-700",
  };

  useEffect(() => {
    setUnclaimedCount(unclaimedCountx);
  }, [unclaimedCountx]);
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      setError("File size must be less than 4MB");
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpiSubmit = async (event) => {
    event.preventDefault();

    if (!upiTransactionId.trim()) {
      setUpiError("Please enter your UPI Transaction ID");
      return;
    }

    if (!delegateId || delegateId === "unknown") {
      setUpiError(
        "Unable to verify without a valid delegate ID. Please reload the payment portal."
      );
      return;
    }

    try {
      setSelectedMethod("upi");
      setUploading(true);
      setUpiError(null);
      console.log("Submitting UPI Transaction ID:", upiTransactionId);

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upiTransactionId, delegateId }),
      });
      const body = await res.json();
      setUnclaimedCount(body?.unclaimedCount || unclaimedCountx);
      // console.log("x", body);
      if (!res.ok || body.success === false) {
        setUpiError(`ERROR: ${body.error || "Failed to verify payment"}`);
        setSelectedMethod(null);
        return;
      }

      router.push(
        `/payment/status?delegateId=${encodeURIComponent(delegateId)}&status=confirmed`
      );
    } catch (error) {
      console.error("Error submitting UPI trxn ID:", error);
      setUpiError(error.message || "Failed to submit UPI Transaction ID");
      setSelectedMethod(null);
    } finally {
      setUploading(false);
    }
  };

  const updateCount = async () => {
    const previousCount = unclaimedCount;

    try {
      setUpdatingCount(true);
      setCountStatus(null);

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upiTransactionId: 1, delegateId }),
      });

      if (!res.ok) {
        throw new Error("Failed to refresh unclaimed count.");
      }

      const body = await res.json();

      if (body.success === false) {
        throw new Error(body.error || "Failed to refresh unclaimed count.");
      }

      const nextCount =
        typeof body.unclaimedCount === "number"
          ? body.unclaimedCount
          : previousCount;

      setUnclaimedCount(nextCount);

      if (nextCount === previousCount) {
        setCountStatus({
          type: "info",
          message: "No change detected.",
        });
      } else if (nextCount > previousCount) {
        const diff = nextCount - previousCount;
        setCountStatus({
          type: "success",
          message: `${diff} new unclaimed transaction${diff === 1 ? "" : "s"} found since your last refresh.`,
        });
      } else {
        const diff = previousCount - nextCount;
        setCountStatus({
          type: "warning",
          message: `${diff} transaction${diff === 1 ? " has" : "s have"} been reconciled since your last refresh.`,
        });
      }
    } catch (error) {
      setCountStatus({
        type: "error",
        message: error.message || "Failed to refresh unclaimed count.",
      });
    } finally {
      setUpdatingCount(false);
    }
  };
  const handleUploadSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    if (!delegateId || delegateId === "unknown") {
      setError(
        "Unable to upload without a valid delegate ID. Please reload the payment portal."
      );
      return;
    }

    try {
      setSelectedMethod("upload");
      setUploading(true);
      setUploadProgress(0);
      setError(null);
      setUploadedUrl(null);

      // Create FormData to send to API
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("delegateId", delegateId);

      // Upload to API endpoint
      const response = await fetch("/api/uploadss", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(50);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to upload file");
      }

      setUploadedUrl(result.url);
      setUploadProgress(100);
      router.push(
        `/payment/status?delegateId=${encodeURIComponent(delegateId)}&status=pending`
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message || "Failed to upload file");
      setSelectedMethod(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header - Choose Method */}
      <div className="bg-rose-100 rounded-lg p-4 border border-accent/20">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Choose Payment Verification Method
        </h2>
        <p className="text-sm text-gray-600">
          Select one of the methods below to verify your payment
        </p>
      </div>

      {/* Method 1: UPI Transaction ID (Fast) */}
      <form
        onSubmit={handleUpiSubmit}
        className="bg-green-50 rounded-lg shadow-md p-6 border-2 border-green-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Option 1: UPI Transaction ID
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ⚡ Faster Verification
              </span>
              <span className="text-sm text-gray-500">Recommended</span>
            </div>
            <hr className="border my-5" />
            {formattedDueAmount && (
              <p className="mt-2 text-sm font-medium text-green-800">
                Payable Amount: {formattedDueAmount}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="upi-transaction-id"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your UPI Transaction ID{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="upi-transaction-id"
            name="upi-transaction-id"
            placeholder="e.g., 123456789012"
            value={upiTransactionId}
            onChange={(e) => setUpiTransactionId(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            disabled={uploading || selectedMethod === "upload"}
          />
          <div className="mt-3 flex flex-col gap-2 text-base text-gray-800 font-medium">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-800/5 px-2 py-1 text-sm font-semibold text-green-700">
                <span className="text-sm uppercase tracking-wide text-green-600">
                  Unclaimed
                </span>
                <span className="text-lg font-bold text-green-800">
                  {unclaimedCount}
                </span>
              </span>
              <button
                type="button"
                onClick={updateCount}
                disabled={updatingCount}
                className="inline-flex items-center gap-2 rounded pb-1 text-sm font-medium text-green-700
                border
                 shadow-sm transition hover:border-b-green-700
                 disabled:cursor-not-allowed disabled:text-red-900"
              >
                {updatingCount ? (
                  <>
                    <svg
                      className="size-4 animate-spin"
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
                    Refreshing
                  </>
                ) : (
                  <>
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582M19.418 4H20v5m0 0l-2.293-2.293A8 8 0 104 15.418"
                      />
                    </svg>
                    Refresh Count
                  </>
                )}
              </button>
            </div>
            {countStatus && (
              <div
                className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                  statusColorMap[countStatus.type] || statusColorMap.info
                }`}
              >
                {countStatus.message}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You can find this in your payment confirmation screen or UPI app
            transaction history
          </p>
        </div>

        {upiError && (
          <div className="my-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start justify-between">
              <p className="text-sm text-red-600 flex-1">{upiError}</p>
              <button
                type="button"
                onClick={() => setUpiError(null)}
                className="ml-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={
            uploading || !upiTransactionId.trim() || selectedMethod === "upload"
          }
          className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold transition-all ${
            uploading || !upiTransactionId.trim() || selectedMethod === "upload"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {uploading && selectedMethod === "upi"
            ? "Submitting..."
            : "✓ Submit Transaction ID (Fast)"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-bgSecondary/5 text-gray-500 font-medium">
            OR
          </span>
        </div>
      </div>

      {/* Method 2: File Upload (Slower) */}
      <form
        onSubmit={handleUploadSubmit}
        className="bg-white rounded-lg shadow-md p-6 border-2 border-amber-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Option 2: Upload Payment Screenshot
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                🕒 Slower Verification
              </span>
              <span className="text-sm text-gray-600">
                Takes longer to process
              </span>
            </div>
            <hr className="border my-5" />

            {formattedDueAmount && (
              <p className="mt-2 text-sm font-medium text-amber-800">
                Ensure your transfer is for {formattedDueAmount}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              uploading || selectedMethod === "upi"
                ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                : selectedFile
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 hover:border-accent hover:bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading && selectedMethod === "upload" ? (
                <>
                  <svg
                    className="w-8 h-8 mb-2 text-accent animate-spin"
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
                  <p className="text-sm text-gray-600">
                    Uploading... {uploadProgress}%
                  </p>
                </>
              ) : selectedFile ? (
                <>
                  <svg
                    className="w-8 h-8 mb-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-sm text-green-600 font-medium mb-1">
                    File selected: {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">Click to change file</p>
                </>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG (MAX. 4MB)
                  </p>
                </>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading || selectedMethod === "upi"}
            />
          </label>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start justify-between">
              <p className="text-sm text-red-600 flex-1">{error}</p>
              <button
                type="button"
                onClick={() => setError(null)}
                className="ml-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {uploadedUrl && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={uploadedUrl}
              alt="Payment screenshot"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>
        )}

        <div className="text-sm text-gray-500 mb-4">
          <p>• Upload a clear screenshot of your payment</p>
          <p>• Ensure all transaction details are visible</p>
          <p>• File size should be less than 4MB</p>
        </div>

        <button
          type="submit"
          disabled={uploading || !selectedFile || selectedMethod === "upi"}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
            uploading || !selectedFile || selectedMethod === "upi"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : uploadedUrl
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white"
          }`}
        >
          {uploading && selectedMethod === "upload"
            ? "Uploading..."
            : uploadedUrl
              ? "✓ Upload Successful"
              : "Submit Payment Screenshot"}
        </button>
      </form>
    </div>
  );
}
