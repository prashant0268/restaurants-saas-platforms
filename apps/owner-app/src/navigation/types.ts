import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Orders Stack
export type OrdersStackParamList = {
  LiveOrders: undefined;
  OrderDetail: { orderId: string };
  OrderHistory: undefined;
};

// Menu Stack
export type MenuStackParamList = {
  MenuManagement: undefined;
  EditMenuItem: { itemId?: string; categoryId?: string };
  Categories: undefined;
};

// Analytics Stack
export type AnalyticsStackParamList = {
  AnalyticsOverview: undefined;
  Revenue: undefined;
};

// Staff Stack
export type StaffStackParamList = {
  StaffList: undefined;
  StaffDetail: { staffId: string };
};

// Reviews Stack
export type ReviewsStackParamList = {
  ReviewsList: undefined;
  ReviewDetail: { reviewId: string };
};

// Settings Stack
export type SettingsStackParamList = {
  SettingsMain: undefined;
  RestaurantProfile: undefined;
  OperatingHours: undefined;
  DeliverySettings: undefined;
  Notifications: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Dashboard: undefined;
  Orders: NavigatorScreenParams<OrdersStackParamList>;
  Menu: NavigatorScreenParams<MenuStackParamList>;
  Analytics: NavigatorScreenParams<AnalyticsStackParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Screen props helpers
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type OrdersScreenProps<T extends keyof OrdersStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OrdersStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type MenuScreenProps<T extends keyof MenuStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MenuStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type AnalyticsScreenProps<T extends keyof AnalyticsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AnalyticsStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type StaffScreenProps<T extends keyof StaffStackParamList> =
  NativeStackScreenProps<StaffStackParamList, T>;

export type ReviewsScreenProps<T extends keyof ReviewsStackParamList> =
  NativeStackScreenProps<ReviewsStackParamList, T>;

export type SettingsScreenProps<T extends keyof SettingsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SettingsStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;
