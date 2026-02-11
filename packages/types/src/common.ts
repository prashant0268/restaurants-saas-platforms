export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  location?: GeoPoint;
  label?: string;
}

export interface PhoneNumber {
  countryCode: string;
  number: string;
}

export interface DateRange {
  start: Timestamp;
  end: Timestamp;
}

export interface PaginationParams {
  limit: number;
  offset?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  hasMore: boolean;
  cursor?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export interface Money {
  amount: number;
  currency: Currency;
}
