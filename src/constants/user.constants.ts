export const VERIFICATION_STATUSES = {
  UNVERIFIED: 'Unverified',
  PENDING: 'Pending',
  VERIFIED: 'Verified',
} as const;

export const ID_TYPES = {
  PASSPORT: 'Passport',
  NATIONAL_ID: 'National ID',
  DRIVERS_LICENSE: 'Drivers License',
} as const;

export const COUNTRY_CODES = {
  UNITED_STATES: 'US',
  MEXICO: 'MX',
  GUATEMALA: 'GT',
  EL_SALVADOR: 'SV',
  HONDURAS: 'HN',
  ARGENTINA: 'AR',
} as const;
