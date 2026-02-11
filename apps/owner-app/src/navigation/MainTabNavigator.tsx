import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import {
  MainTabParamList,
  OrdersStackParamList,
  MenuStackParamList,
  AnalyticsStackParamList,
  SettingsStackParamList,
} from './types';

// Screens
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { LiveOrdersScreen } from '../screens/orders/LiveOrdersScreen';
import { OrderDetailScreen } from '../screens/orders/OrderDetailScreen';
import { OrderHistoryScreen } from '../screens/orders/OrderHistoryScreen';
import { MenuManagementScreen } from '../screens/menu/MenuManagementScreen';
import { EditMenuItemScreen } from '../screens/menu/EditMenuItemScreen';
import { CategoriesScreen } from '../screens/menu/CategoriesScreen';
import { AnalyticsScreen } from '../screens/analytics/AnalyticsScreen';
import { RevenueScreen } from '../screens/analytics/RevenueScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { RestaurantProfileScreen } from '../screens/settings/RestaurantProfileScreen';
import { OperatingHoursScreen } from '../screens/settings/OperatingHoursScreen';
import { DeliverySettingsScreen } from '../screens/settings/DeliverySettingsScreen';
import { NotificationsScreen } from '../screens/settings/NotificationsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Orders Stack
const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();

const OrdersNavigator: React.FC = () => (
  <OrdersStack.Navigator>
    <OrdersStack.Screen
      name="LiveOrders"
      component={LiveOrdersScreen}
      options={{ title: 'Live Orders' }}
    />
    <OrdersStack.Screen
      name="OrderDetail"
      component={OrderDetailScreen}
      options={{ title: 'Order Details' }}
    />
    <OrdersStack.Screen
      name="OrderHistory"
      component={OrderHistoryScreen}
      options={{ title: 'Order History' }}
    />
  </OrdersStack.Navigator>
);

// Menu Stack
const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const MenuNavigator: React.FC = () => (
  <MenuStack.Navigator>
    <MenuStack.Screen
      name="MenuManagement"
      component={MenuManagementScreen}
      options={{ title: 'Menu' }}
    />
    <MenuStack.Screen
      name="EditMenuItem"
      component={EditMenuItemScreen}
      options={{ title: 'Edit Item' }}
    />
    <MenuStack.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{ title: 'Categories' }}
    />
  </MenuStack.Navigator>
);

// Analytics Stack
const AnalyticsStack = createNativeStackNavigator<AnalyticsStackParamList>();

const AnalyticsNavigator: React.FC = () => (
  <AnalyticsStack.Navigator>
    <AnalyticsStack.Screen
      name="AnalyticsOverview"
      component={AnalyticsScreen}
      options={{ title: 'Analytics' }}
    />
    <AnalyticsStack.Screen
      name="Revenue"
      component={RevenueScreen}
      options={{ title: 'Revenue' }}
    />
  </AnalyticsStack.Navigator>
);

// Settings Stack
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsNavigator: React.FC = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="SettingsMain"
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
    <SettingsStack.Screen
      name="RestaurantProfile"
      component={RestaurantProfileScreen}
      options={{ title: 'Restaurant Profile' }}
    />
    <SettingsStack.Screen
      name="OperatingHours"
      component={OperatingHoursScreen}
      options={{ title: 'Operating Hours' }}
    />
    <SettingsStack.Screen
      name="DeliverySettings"
      component={DeliverySettingsScreen}
      options={{ title: 'Delivery Settings' }}
    />
    <SettingsStack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ title: 'Notifications' }}
    />
  </SettingsStack.Navigator>
);

// Tab icon placeholder
const TabIcon: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <Text style={{ color, fontSize: 20 }}>
    {name === 'Dashboard' && '\u{1F3E0}'}
    {name === 'Orders' && '\u{1F4CB}'}
    {name === 'Menu' && '\u{1F374}'}
    {name === 'Analytics' && '\u{1F4CA}'}
    {name === 'Settings' && '\u2699\uFE0F'}
  </Text>
);

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => <TabIcon name={route.name} color={color} />,
        tabBarActiveTintColor: '#E23744',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5EA',
          paddingBottom: 4,
          height: 56,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{ tabBarBadge: undefined }}
      />
      <Tab.Screen name="Menu" component={MenuNavigator} />
      <Tab.Screen name="Analytics" component={AnalyticsNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};
