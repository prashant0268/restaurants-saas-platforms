import { Address, PhoneNumber, Timestamp } from './common';

export type UserRole =
  | 'customer'
  | 'owner'
  | 'staff'
  | 'driver'
  | 'marketing'
  | 'sales'
  | 'admin';

export type AuthProvider = 'email' | 'google' | 'apple' | 'phone';

export interface User {
  id: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phone?: PhoneNumber;
  photoUrl?: string;
  roles: UserRole[];
  primaryRole: UserRole;
  authProvider: AuthProvider;
  addresses?: Address[];
  defaultAddressIndex?: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
  fcmTokens?: string[];
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  currency: string;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  darkMode: boolean;
}

export interface CustomerProfile extends User {
  primaryRole: 'customer';
  favoriteRestaurants: string[];
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
}

export interface DriverProfile extends User {
  primaryRole: 'driver';
  vehicleInfo: VehicleInfo;
  documents: DriverDocuments;
  isOnline: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
    heading?: number;
    updatedAt: Timestamp;
  };
  rating: number;
  totalDeliveries: number;
  totalEarnings: number;
  bankInfo?: {
    accountLast4: string;
    routingLast4: string;
    isVerified: boolean;
  };
}

export interface VehicleInfo {
  type: 'car' | 'motorcycle' | 'bicycle' | 'scooter';
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  licensePlate?: string;
}

export interface DriverDocuments {
  driversLicense?: DocumentUpload;
  insurance?: DocumentUpload;
  vehicleRegistration?: DocumentUpload;
  backgroundCheck?: DocumentUpload;
}

export interface DocumentUpload {
  url: string;
  fileName: string;
  uploadedAt: Timestamp;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: Timestamp;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface StaffMember {
  id: string;
  userId: string;
  restaurantId: string;
  role: 'manager' | 'chef' | 'server' | 'cashier' | 'host';
  permissions: StaffPermission[];
  isActive: boolean;
  createdAt: Timestamp;
}

export type StaffPermission =
  | 'manage_orders'
  | 'manage_menu'
  | 'manage_reservations'
  | 'manage_staff'
  | 'view_analytics'
  | 'manage_settings'
  | 'respond_reviews';
