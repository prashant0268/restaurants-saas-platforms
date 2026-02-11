import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// --- Root Stack ---
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// --- Auth Stack ---
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

// --- Main Bottom Tab ---
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  OrdersTab: NavigatorScreenParams<OrdersStackParamList>;
  ReservationsTab: NavigatorScreenParams<ReservationsStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

// --- Home Stack (nested inside HomeTab) ---
export type HomeStackParamList = {
  Home: undefined;
  Search: { query?: string };
  RestaurantList: { category?: string; cuisineType?: string };
  RestaurantDetail: { restaurantId: string };
  Menu: { restaurantId: string; restaurantName: string };
  MenuItemDetail: {
    restaurantId: string;
    menuItemId: string;
    menuItemName: string;
  };
  Cart: undefined;
  Checkout: undefined;
  WriteReview: { restaurantId: string; orderId: string };
};

// --- Orders Stack ---
export type OrdersStackParamList = {
  OrderHistory: undefined;
  OrderDetail: { orderId: string };
  OrderTracking: { orderId: string };
};

// --- Reservations Stack ---
export type ReservationsStackParamList = {
  Reservations: undefined;
  BookReservation: { restaurantId: string; restaurantName: string };
};

// --- Profile Stack ---
export type ProfileStackParamList = {
  Profile: undefined;
  Addresses: undefined;
  Favorites: undefined;
  Notifications: undefined;
  Loyalty: undefined;
  Settings: undefined;
};

// --- Screen Props Helpers ---

// Root
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Auth
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

// Main Tabs
export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Home Stack
export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// Orders Stack
export type OrdersScreenProps<T extends keyof OrdersStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OrdersStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// Reservations Stack
export type ReservationsScreenProps<T extends keyof ReservationsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ReservationsStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// Profile Stack
export type ProfileScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// --- Declaration merging for useNavigation / useRoute type safety ---
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
