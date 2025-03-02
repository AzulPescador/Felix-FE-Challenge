import {
  VERIFICATION_STATUSES,
  ID_TYPES,
  COUNTRY_CODES,
} from '../constants/user.constants';

export type VerificationStatus =
  (typeof VERIFICATION_STATUSES)[keyof typeof VERIFICATION_STATUSES];
export type IdType = (typeof ID_TYPES)[keyof typeof ID_TYPES];
export type CountryCode = (typeof COUNTRY_CODES)[keyof typeof COUNTRY_CODES];
export interface UserDetails {
  whatsapp_number: string;
  first_name: string;
  last_name: string;
  country_code: CountryCode;
  verification_status: VerificationStatus;
  id_type?: IdType;
  id_number?: string;
}
