import { LocaleState } from '@/types/FakerData';

export const COUNTRIES: { [key: string]: LocaleState } = {
  US: 'en',
  PL: 'pl',
  ES: 'es',
};
export const DEF_LOCALE: LocaleState = COUNTRIES.US;
export const MAX_SEED = 32768;
export const DEF_ERROR = 0;
export const DEF_SEED = 0;

export const MAX_PAGE = 100;
export const MAX_SIZE = 50;
export const DEF_PAGE = 0;
export const DEF_SIZE = 10;

export const MIN_USER_INFO_LENGTH = 5;
export const MAX_USER_INFO_LENGTH = 50;
