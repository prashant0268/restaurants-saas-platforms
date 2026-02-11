import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { AvailableOrdersScreen } from '../screens/home/AvailableOrdersScreen';
import { ActiveDeliveryScreen } from '../screens/delivery/ActiveDeliveryScreen';
import { OrderDetailScreen } from '../screens/delivery/OrderDetailScreen';
import { DeliveryConfirmationScreen } from '../screens/delivery/DeliveryConfirmationScreen';
import { EarningsScreen } from '../screens/earnings/EarningsScreen';
import { EarningsDetailScreen } from '../screens/earnings/EarningsDetailScreen';
import { DeliveryHistoryScreen } from '../screens/history/DeliveryHistoryScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { VehicleInfoScreen } from '../screens/profile/VehicleInfoScreen';
import { DocumentsScreen } from '../screens/profile/DocumentsScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import type {
  MainTabParamList,
  HomeStackParamList,
  DeliveryStackParamList,
  EarningsStackParamList,
  HistoryStackParamList,
  ProfileStackParamList,
} from './types';

// --- Home Stack ---
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen
      name="AvailableOrders"
      component={AvailableOrdersScreen}
      options={{ headerShown: true, title: 'Available Orders' }}
    />
  </HomeStack.Navigator>
);

// --- Delivery Stack ---
const DeliveryStack = createNativeStackNavigator<DeliveryStackParamList>();

const DeliveryStackNavigator: React.FC = () => (
  <DeliveryStack.Navigator screenOptions={{ headerShown: false }}>
    <DeliveryStack.Screen name="ActiveDelivery" component={ActiveDeliveryScreen} />
    <DeliveryStack.Screen
      name="OrderDetail"
      component={OrderDetailScreen}
      options={{ headerShown: true, title: 'Order Details' }}
    />
    <DeliveryStack.Screen
      name="DeliveryConfirmation"
      component={DeliveryConfirmationScreen}
      options={{ headerShown: true, title: 'Confirm Delivery' }}
    />
  </DeliveryStack.Navigator>
);

// --- Earnings Stack ---
const EarningsStack = createNativeStackNavigator<EarningsStackParamList>();

const EarningsStackNavigator: React.FC = () => (
  <EarningsStack.Navigator screenOptions={{ headerShown: false }}>
    <EarningsStack.Screen name="Earnings" component={EarningsScreen} />
    <EarningsStack.Screen
      name="EarningsDetail"
      component={EarningsDetailScreen}
      options={{ headerShown: true, title: 'Earnings Detail' }}
    />
  </EarningsStack.Navigator>
);

// --- History Stack ---
const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();

const HistoryStackNavigator: React.FC = () => (
  <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
    <HistoryStack.Screen name="DeliveryHistory" component={DeliveryHistoryScreen} />
  </HistoryStack.Navigator>
);

// --- Profile Stack ---
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen
      name="VehicleInfo"
      component={VehicleInfoScreen}
      options={{ headerShown: true, title: 'Vehicle Information' }}
    />
    <ProfileStack.Screen
      name="Documents"
      component={DocumentsScreen}
      options={{ headerShown: true, title: 'Documents' }}
    />
    <ProfileStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: true, title: 'Settings' }}
    />
  </ProfileStack.Navigator>
);

// --- Main Tab Navigator ---
const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#737373',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
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
        name="DeliveryTab"
        component={DeliveryStackNavigator}
        options={{
          tabBarLabel: 'Delivery',
          // TODO: Add tab bar icon
        }}
      />
      <Tab.Screen
        name="EarningsTab"
        component={EarningsStackNavigator}
        options={{
          tabBarLabel: 'Earnings',
          // TODO: Add tab bar icon
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryStackNavigator}
        options={{
          tabBarLabel: 'History',
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
