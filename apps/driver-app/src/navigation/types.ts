import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// --- Auth Stack ---
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  DocumentUpload: { documentType?: string } | undefined;
};

// --- Home Stack ---
export type HomeStackParamList = {
  Home: undefined;
  AvailableOrders: undefined;
};

// --- Delivery Stack ---
export type DeliveryStackParamList = {
  ActiveDelivery: { deliveryId: string };
  OrderDetail: { orderId: string; deliveryId: string };
  DeliveryConfirmation: { deliveryId: string };
};

// --- Earnings Stack ---
export type EarningsStackParamList = {
  Earnings: undefined;
  EarningsDetail: { period: 'daily' | 'weekly' | 'monthly'; date: string };
};

// --- History Stack ---
export type HistoryStackParamList = {
  DeliveryHistory: undefined;
};

// --- Profile Stack ---
export type ProfileStackParamList = {
  Profile: undefined;
  VehicleInfo: undefined;
  Documents: undefined;
  Settings: undefined;
};

// --- Main Tab Navigator ---
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  DeliveryTab: NavigatorScreenParams<DeliveryStackParamList> | undefined;
  EarningsTab: NavigatorScreenParams<EarningsStackParamList>;
  HistoryTab: NavigatorScreenParams<HistoryStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

// --- Root Navigator ---
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// --- Screen Props ---
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type DeliveryScreenProps<T extends keyof DeliveryStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DeliveryStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type EarningsScreenProps<T extends keyof EarningsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<EarningsStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type HistoryScreenProps<T extends keyof HistoryStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HistoryStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type ProfileScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
