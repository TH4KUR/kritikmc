export const ACTIVE_KMC_FEE = 400;
export const ACTIVE_NON_KMC_FEE = 600;
export const ACTIVE_PG_FEE = ACTIVE_NON_KMC_FEE;
export const PASSIVE_DELEGATE_FEE = 200;
export const WORKSHOP_FEE = 550;

export function calculateActiveDelegateFee({
  isKmcStudent = false,
  isPgStudent = false,
} = {}) {
  if (isKmcStudent) return ACTIVE_KMC_FEE;
  if (isPgStudent) return ACTIVE_PG_FEE;
  return ACTIVE_NON_KMC_FEE;
}
