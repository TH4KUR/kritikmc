export const ALLOWED_EDIT_FIELDS = ["name", "email", "mobileno", "events"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[6-9][0-9]{9}$/;

export function normaliseEventsInput(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry || "").trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
}

export function normaliseMobile(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[^0-9]/g, "");
}

function areEventsEqualInternal(base = [], next = []) {
  if (base.length !== next.length) return false;
  const normalizedBase = [...base].map((entry) => entry.toLowerCase()).sort();
  const normalizedNext = [...next].map((entry) => entry.toLowerCase()).sort();

  return normalizedBase.every((entry, idx) => entry === normalizedNext[idx]);
}

export function areEventsEqual(base, next) {
  return areEventsEqualInternal(
    normaliseEventsInput(base),
    normaliseEventsInput(next)
  );
}

export function sanitizeEditablePayload(payload = {}) {
  const sanitized = {};

  if (Object.prototype.hasOwnProperty.call(payload, "name")) {
    const nextName = String(payload.name || "").trim();
    if (nextName.length < 3) {
      throw new Error("Please enter your full name (at least 3 characters).");
    }
    sanitized.name = nextName;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "email")) {
    const nextEmail = String(payload.email || "")
      .trim()
      .toLowerCase();
    if (!nextEmail || !EMAIL_REGEX.test(nextEmail)) {
      throw new Error("Please provide a valid email address.");
    }
    sanitized.email = nextEmail;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "mobileno")) {
    const nextMobile = normaliseMobile(payload.mobileno);
    if (!MOBILE_REGEX.test(nextMobile)) {
      throw new Error("Enter a valid 10-digit Indian mobile number.");
    }
    sanitized.mobileno = nextMobile;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "events")) {
    const eventsArray = normaliseEventsInput(payload.events);
    if (!eventsArray.length) {
      throw new Error("Select at least one event to continue.");
    }
    sanitized.events = eventsArray;
  }

  return sanitized;
}

export function deriveEditableDiff(original = {}, draft = {}) {
  const diff = {};

  if (typeof draft.name === "string") {
    const normalizedDraft = draft.name.trim();
    const baseName = String(original.name || "").trim();
    if (normalizedDraft && normalizedDraft !== baseName) {
      diff.name = normalizedDraft;
    }
  }

  if (typeof draft.email === "string") {
    const normalizedDraft = draft.email.trim().toLowerCase();
    const baseEmail = String(original.email || "")
      .trim()
      .toLowerCase();
    if (normalizedDraft && normalizedDraft !== baseEmail) {
      diff.email = normalizedDraft;
    }
  }

  if (typeof draft.mobileno === "string") {
    const normalizedDraft = normaliseMobile(draft.mobileno);
    const baseMobile = normaliseMobile(original.mobileno || "");
    if (normalizedDraft && normalizedDraft !== baseMobile) {
      diff.mobileno = normalizedDraft;
    }
  }

  if (Object.prototype.hasOwnProperty.call(draft, "events")) {
    const nextEvents = normaliseEventsInput(draft.events);
    const baseEvents = normaliseEventsInput(original.events);
    if (!areEventsEqualInternal(baseEvents, nextEvents)) {
      diff.events = nextEvents;
    }
  }

  return diff;
}

export function maskEmail(email = "") {
  if (!email.includes("@")) return email;
  const [localPart, domainPart] = email.split("@");
  const domainSections = domainPart.split(".");
  const domainRoot = domainSections.shift() || "";
  const domainSuffix = domainSections.join(".");

  let maskedLocal;
  if (localPart.length <= 4) {
    maskedLocal = `${localPart.charAt(0)}x${localPart.slice(-1)}`;
  } else {
    maskedLocal = `${localPart.slice(0, 3)}x${localPart.slice(-2)}`;
  }

  const domainVisibleEnd = domainRoot.slice(-3);
  const maskedDomain = `${domainRoot.length > 2 ? "xx" : "x"}${domainVisibleEnd}`;
  const rebuiltDomain = domainSuffix
    ? `${maskedDomain}.${domainSuffix}`
    : maskedDomain;

  return `${maskedLocal}@${rebuiltDomain}`;
}

export function hasPendingChanges(original = {}, draft = {}) {
  const diff = deriveEditableDiff(original, draft);
  return Object.keys(diff).length > 0;
}
