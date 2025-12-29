const STATUS_BADGES = {
  confirmed: { text: "Payment Confirmed", tone: "bg-emerald-500" },
  "under-review": { text: "Pending Verification", tone: "bg-amber-500" },
  "awaiting-payment": { text: "Action Needed", tone: "bg-rose-500" },
  "not-found": { text: "Not Found", tone: "bg-gray-500" },
};

export function normaliseEntries(delegate) {
  if (!delegate) return [];

  const formatRupees = (value) => {
    if (value === null || value === undefined) return null;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return null;
    return `₹${numeric}`;
  };

  const participationLabels = {
    active: "Active Delegate",
    passive: "Passive Delegate",
    workshop: "Workshop Delegate",
    workshop_default: "Workshop Delegate",
    workshop_discounted: "Workshop Delegate",
  };

  const normaliseParticipation = (value) => {
    if (!value) return null;
    const key = String(value).trim().toLowerCase();
    return participationLabels[key] || value;
  };

  const eventsArray = Array.isArray(delegate.events)
    ? delegate.events
    : delegate?.events
      ? [delegate.events]
      : [];

  const rows = [
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

  const participation = normaliseParticipation(delegate.participationtype);
  if (participation) {
    rows.push({ label: "Participation Type", value: participation });
  }

  if (eventsArray.length) {
    rows.push({ label: "Events", value: eventsArray, isList: true });
  }

  if (delegate.hastopay !== null && delegate.hastopay !== undefined) {
    const formattedAmount = formatRupees(delegate.hastopay);
    if (formattedAmount) {
      rows.push({
        label: "Amount Due",
        value: formattedAmount,
      });
    }
  }

  if (delegate.paymentconfirmed) {
    rows.unshift({ label: "Delegate ID", value: delegate.delegateid });
  } else {
    rows.unshift({ label: "Delegate ID", value: "PAYMENT REQUIRED" });
  }

  return rows.filter(
    (row) => row.value !== null && row.value !== undefined && row.value !== ""
  );
}

export function determineStatus(delegate) {
  if (!delegate) return "not-found";
  if (delegate.paymentconfirmed) return "confirmed";
  if (delegate.paymentss || delegate.screenshotbucketpath)
    return "under-review";
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
        body: "We have your payment proof and it is currently being reviewed. Once verified, your delegate ID will appear here automatically.",
        actions: [
          {
            label: "Instant Verify with Upi Ref Id",
            href: payLink,
            style: "primary",
            external: false,
          },
          {
            label: "Contact Support",
            href: "https://api.whatsapp.com/send?phone=918700621534&text=Hi%20I%20want%20help%20with%20Kriti%20Registration%20in....",
            style: "outline",
            external: true,
          },
        ],
      };
    case "awaiting-payment":
      return {
        badge,
        heading: "Payment Pending",
        body: "We have recorded your registration. Complete the payment using the portal to secure your slot—your delegate ID unlocks once payment clears.",
        actions: [
          {
            label: "Go to Payment Portal",
            href: payLink,
            style: "primary",
            external: false,
          },
          {
            label: "Need Help?",
            href: "https://api.whatsapp.com/send?phone=918700621534&text=Hi%20I%20want%20help%20with%20Kriti%20Registration%20in....",
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
            href: "https://api.whatsapp.com/send?phone=918700621534&text=Hi%20I%20want%20help%20with%20Kriti%20Registration%20in....",
            style: "outline",
            external: true,
          },
        ],
      };
  }
}
