export type Locale = 'en' | 'es' | 'pl';

export interface addr {
  street: string;
  state: string;
}

export type Addr1 = {
  building: string;
  city: string;
  country: string;
};
export type Addr2 = {
  building: string;
  country: string;
  zipcode: string;
};
export type Addr3 = {
  apartment: string;
  city: string;
  zipcode: string;
};
export type Addr4 = {
  city: string;
  country: string;
  zipcode: string;
};

export type Address = addr & Addr2 & Addr3 & Addr4;

export interface User {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  address: Address;
}

export type info = {
  count: number;
  page: number;
  locale: Locale;
  errors: number;
  next: number | null;
  prev: number | null;
};
