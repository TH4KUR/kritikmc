import { formatInr } from "@/app/lib/paymentConfig";

const STATUS_BADGES = {
  confirmed: { text: "Payment Confirmed", tone: "bg-emerald-500" },
  "under-review": { text: "Pending Verification", tone: "bg-amber-500" },
  "awaiting-payment": { text: "Action Needed", tone: "bg-rose-500" },
  "not-found": { text: "Not Found", tone: "bg-gray-500" },
};

export function normaliseEntries(delegate) {
  if (!delegate) return [];

  const eventsArray = Array.isArray(delegate.events)
    ? delegate.events
    : delegate?.events
      ? [delegate.events]
      : [];

  const rows = [
    { label: "Delegate ID", value: delegate.delegateid },
    { label: "Name", value: delegate.name },
    { label: "Email", value: delegate.email },
    { label: "Mobile Number", value: delegate.mobileno },
    { label: "College", value: delegate.collegename },
    {
      label: "Academic Year",
      value:
        delegate.collegeyear === null || delegate.collegeyear === undefined
          ? null
          : delegate.collegeyear,
    },
  ];

  if (eventsArray.length) {
    rows.push({ label: "Events", value: eventsArray, isList: true });
  }

  if (delegate.hastopay !== null && delegate.hastopay !== undefined) {
    rows.push({
      label: "Amount Due",
      value: formatInr(delegate.hastopay),
    });
  }

  return rows.filter(
    (row) => row.value !== null && row.value !== undefined && row.value !== ""
  );
}

export function determineStatus(delegate) {
  if (!delegate) return "not-found";
  if (delegate.paymentconfirmed) return "confirmed";
  if (delegate.paymentss || delegate.screenshotbucketpath) return "under-review";
  // else
  return "awaiting-payment";
}

export function getStatusBadge(status) {
  return STATUS_BADGES[status] || STATUS_BADGES["not-found"];
}

export function statusCopy(status, delegateId) {
  const badge = getStatusBadge(status);
  const payLink = delegateId
    ? `/payment/v2?delegateId=${encodeURIComponent(delegateId)}`
    : "/payment/v2";

  switch (status) {
    case "confirmed":
      return {
        badge,
        heading: "Registration Confirmed",
        body: "Your payment is verified and your registration is complete. See you at the conference!",
        actions: [
          {
            label: "Go to Home",
            href: "/",
            style: "primary",
            external: false,
          },
          {
            label: "View Confirmation Summary",
            href: "/success?status=confirmed",
            style: "outline",
            external: false,
          },
        ],
      };
    case "under-review":
      return {
        badge,
        heading: "Screenshot Received",
        body: "We have your payment screenshot and it is currently being reviewed. If you now have the UPI reference ID, verify instantly from the payment portal.",
        actions: [
          {
            label: "Verify with UPI Reference ID",
            href: payLink,
            style: "primary",
            external: false,
          },
          {
            label: "Contact Support",
            href: "tel:+918700621534",
            style: "outline",
            external: true,
          },
        ],
      };
    case "awaiting-payment":
      return {
        badge,
        heading: "Payment Pending",
        body: "We have recorded your registration. Complete the payment using the portal to secure your slot.",
        actions: [
          {
            label: "Go to Payment Portal",
            href: payLink,
            style: "primary",
            external: false,
          },
          {
            label: "Need Help?",
            href: "tel:+918700621534",
            style: "outline",
            external: true,
          },
        ],
      };
    default:
      return {
        badge,
        heading: "Delegate ID not found",
        body: "We could not locate a registration with the details provided. Double-check your entries or try another email, mobile number, or delegate ID.",
        actions: [
          {
            label: "Need Help?",
            href: "tel:+918700621534",
            style: "outline",
            external: true,
          },
        ],
      };
  }
}
