export const ACTIVE_KMC_FEE = 400;
export const ACTIVE_NON_KMC_FEE = 600;
export const PASSIVE_DELEGATE_FEE = 200;
export const WORKSHOP_FEE = 550;

export function calculateActiveDelegateFee({
  isKmcStudent = false,
  isPgStudent = false,
} = {}) {
  if (isKmcStudent) return ACTIVE_KMC_FEE;
  return ACTIVE_NON_KMC_FEE;
}

export function formatInr(amount) {
  if (amount === null || amount === undefined) return "";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch (error) {
    return `₹${amount}`;
  }
}
