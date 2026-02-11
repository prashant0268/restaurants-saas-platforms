import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MainTabParamList,
  HomeStackParamList,
  OrdersStackParamList,
  ReservationsStackParamList,
  ProfileStackParamList,
} from './types';

// Home screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/home/SearchScreen';
import { RestaurantListScreen } from '../screens/home/RestaurantListScreen';

// Restaurant screens
import { RestaurantDetailScreen } from '../screens/restaurant/RestaurantDetailScreen';
import { MenuScreen } from '../screens/restaurant/MenuScreen';
import { MenuItemDetailScreen } from '../screens/restaurant/MenuItemDetailScreen';

// Cart screens
import { CartScreen } from '../screens/cart/CartScreen';
import { CheckoutScreen } from '../screens/cart/CheckoutScreen';

// Order screens
import { OrderHistoryScreen } from '../screens/orders/OrderHistoryScreen';
import { OrderDetailScreen } from '../screens/orders/OrderDetailScreen';
import { OrderTrackingScreen } from '../screens/orders/OrderTrackingScreen';

// Reservation screens
import { ReservationsScreen } from '../screens/reservations/ReservationsScreen';
import { BookReservationScreen } from '../screens/reservations/BookReservationScreen';

// Profile screens
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { AddressesScreen } from '../screens/profile/AddressesScreen';
import { FavoritesScreen } from '../screens/profile/FavoritesScreen';
import { NotificationsScreen } from '../screens/profile/NotificationsScreen';
import { LoyaltyScreen } from '../screens/profile/LoyaltyScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';

// Reviews
import { WriteReviewScreen } from '../screens/reviews/WriteReviewScreen';

// --- Home Stack ---
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <HomeStack.Screen
        name="RestaurantList"
        component={RestaurantListScreen}
        options={{ title: 'Restaurants' }}
      />
      <HomeStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Menu"
        component={MenuScreen}
        options={({ route }) => ({ title: route.params.restaurantName })}
      />
      <HomeStack.Screen
        name="MenuItemDetail"
        component={MenuItemDetailScreen}
        options={({ route }) => ({ title: route.params.menuItemName })}
      />
      <HomeStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Your Cart' }}
      />
      <HomeStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: 'Checkout' }}
      />
      <HomeStack.Screen
        name="WriteReview"
        component={WriteReviewScreen}
        options={{ title: 'Write a Review' }}
      />
    </HomeStack.Navigator>
  );
};

// --- Orders Stack ---
const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();

const OrdersStackNavigator: React.FC = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ title: 'My Orders' }}
      />
      <OrdersStack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: 'Order Details' }}
      />
      <OrdersStack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{ title: 'Track Order' }}
      />
    </OrdersStack.Navigator>
  );
};

// --- Reservations Stack ---
const ReservationsStack =
  createNativeStackNavigator<ReservationsStackParamList>();

const ReservationsStackNavigator: React.FC = () => {
  return (
    <ReservationsStack.Navigator>
      <ReservationsStack.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{ title: 'My Reservations' }}
      />
      <ReservationsStack.Screen
        name="BookReservation"
        component={BookReservationScreen}
        options={{ title: 'Book a Table' }}
      />
    </ReservationsStack.Navigator>
  );
};

// --- Profile Stack ---
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'My Profile' }}
      />
      <ProfileStack.Screen
        name="Addresses"
        component={AddressesScreen}
        options={{ title: 'Saved Addresses' }}
      />
      <ProfileStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
      <ProfileStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <ProfileStack.Screen
        name="Loyalty"
        component={LoyaltyScreen}
        options={{ title: 'Loyalty & Rewards' }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </ProfileStack.Navigator>
  );
};

// --- Main Bottom Tabs ---
const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E23744',
        tabBarInactiveTintColor: '#93959F',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          // TODO: Add tab bar icon
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStackNavigator}
        options={{
          tabBarLabel: 'Orders',
          // TODO: Add tab bar icon
        }}
      />
      <Tab.Screen
        name="ReservationsTab"
        component={ReservationsStackNavigator}
        options={{
          tabBarLabel: 'Reservations',
          // TODO: Add tab bar icon
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          // TODO: Add tab bar icon
        }}
      />
    </Tab.Navigator>
  );
};
