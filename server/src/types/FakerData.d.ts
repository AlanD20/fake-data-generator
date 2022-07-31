export type LocaleState = 'en' | 'pl' | 'es';

export interface FakerDataState {
  page: number;
  size: number;
  seed: number;
  error: number;
  locale?: LocaleState;
}

export interface addr {
  street: string;
  state: string;
}

export type Address = addr &
  (
    | {
        building: string;
        city: string;
        country: string;
      }
    | {
        building: string;
        country: string;
        zipcode: string;
      }
    | {
        apartment: string;
        city: string;
        zipcode: string;
      }
    | {
        city: string;
        country: string;
        zipcode: string;
      }
  );

export interface UserData {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: Address;
  phone: string;
}
export interface InfoGenerator {
  count: number;
  page: number;
  locale: string;
  errors: number;
  next: number | null;
  prev: number | null;
}
export interface Generator {
  data: UserData[];
  info: InfoGenerator;
}

export type UserAddressKeys = keyof Address;
export type UserDataKeys = keyof UserData;
