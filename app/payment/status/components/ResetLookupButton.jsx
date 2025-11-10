"use client";
import { useRouter } from "next/navigation";

export default function ResetLookupButton() {
  const router = useRouter();
  const handleClick = () => {
    router.replace("/payment/status");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
    >
      Check another registration
    </button>
  );
}
