import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import type { ProfileScreenProps } from '../../navigation/types';
import { useAuthStore } from '../../stores/authStore';

interface ProfileMenuItem {
  key: string;
  label: string;
  subtitle?: string;
  screen: 'Addresses' | 'Favorites' | 'Notifications' | 'Loyalty' | 'Settings';
}

const MENU_ITEMS: ProfileMenuItem[] = [
  {
    key: 'addresses',
    label: 'Saved Addresses',
    subtitle: 'Manage your delivery addresses',
    screen: 'Addresses',
  },
  {
    key: 'favorites',
    label: 'Favorites',
    subtitle: 'Your favorite restaurants',
    screen: 'Favorites',
  },
  {
    key: 'notifications',
    label: 'Notifications',
    subtitle: 'Manage notification preferences',
    screen: 'Notifications',
  },
  {
    key: 'loyalty',
    label: 'Loyalty & Rewards',
    subtitle: 'View your points and rewards',
    screen: 'Loyalty',
  },
  {
    key: 'settings',
    label: 'Settings',
    subtitle: 'App preferences and account settings',
    screen: 'Settings',
  },
];

export const ProfileScreen: React.FC<ProfileScreenProps<'Profile'>> = ({
  navigation,
}) => {
  const { user, logout } = useAuthStore();

  const handleLogout = (): void => {
    logout();
    // Navigation will switch to Auth automatically via RootNavigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile header / avatar */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstName?.[0] ?? 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>
            {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
          </Text>
          <Text style={styles.userEmail}>
            {user?.email ?? 'Not logged in'}
          </Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Menu items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemLabel}>{item.label}</Text>
                {item.subtitle && (
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <Text style={styles.menuItemArrow}>{'>'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Support / Help */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>Help & Support</Text>
            </View>
            <Text style={styles.menuItemArrow}>{'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>About</Text>
            </View>
            <Text style={styles.menuItemArrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E23744',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#93959F',
    marginBottom: 12,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editProfileText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#93959F',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  menuSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: '#93959F',
    marginTop: 2,
  },
  menuItemArrow: {
    fontSize: 16,
    color: '#93959F',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E23744',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#93959F',
    paddingVertical: 16,
  },
});
