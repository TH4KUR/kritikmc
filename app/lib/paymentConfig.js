export const ACTIVE_NON_KMC_FEE = 600;
export const ACTIVE_KMC_FEE = 500;
export const ACTIVE_PG_FEE = 1000;
export const PASSIVE_DELEGATE_FEE = 300;
export const WORKSHOP_FEE = 1300;
export const ALREADY_REGISTERED_WORKSHOP_FEE = 1000;

export function calculateActiveDelegateFee({
  isKmcStudent = false,
  isPgStudent = false,
} = {}) {
  if (isKmcStudent) return ACTIVE_KMC_FEE;
  if (isPgStudent) return ACTIVE_PG_FEE;
  return ACTIVE_NON_KMC_FEE;
}
