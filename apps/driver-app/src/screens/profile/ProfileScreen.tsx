import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import type { ProfileScreenProps } from '../../navigation/types';

interface MenuItemProps {
  label: string;
  sublabel?: string;
  icon: string;
  onPress: () => void;
  showBadge?: boolean;
  badgeColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  sublabel,
  icon,
  onPress,
  showBadge,
  badgeColor,
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuContent}>
      <Text style={styles.menuLabel}>{label}</Text>
      {sublabel && <Text style={styles.menuSublabel}>{sublabel}</Text>}
    </View>
    {showBadge && (
      <View style={[styles.badge, { backgroundColor: badgeColor || '#EF4444' }]} />
    )}
    <Text style={styles.menuArrow}>{'>'}</Text>
  </TouchableOpacity>
);

export const ProfileScreen: React.FC<ProfileScreenProps<'Profile'>> = ({
  navigation,
}) => {
  const { driver, signOut } = useAuthStore();

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {driver?.firstName?.charAt(0) ?? 'D'}
                {driver?.lastName?.charAt(0) ?? 'R'}
              </Text>
            </View>
            <View
              style={[
                styles.onlineIndicator,
                driver?.isOnline ? styles.online : styles.offline,
              ]}
            />
          </View>
          <Text style={styles.profileName}>
            {driver
              ? `${driver.firstName} ${driver.lastName}`
              : 'Driver Name'}
          </Text>
          <Text style={styles.profileEmail}>
            {driver?.email ?? 'driver@example.com'}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>[Star]</Text>
            <Text style={styles.ratingValue}>
              {driver?.rating?.toFixed(1) ?? '5.0'}
            </Text>
            <Text style={styles.ratingCount}>
              ({driver?.totalDeliveries ?? 0} deliveries)
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {driver?.totalDeliveries ?? 0}
            </Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {driver?.rating?.toFixed(1) ?? '5.0'}
            </Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              ${(driver?.totalEarnings ?? 0).toFixed(0)}
            </Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          <MenuItem
            icon="[Vehicle]"
            label="Vehicle Information"
            sublabel={driver?.vehicleInfo
              ? `${driver.vehicleInfo.make ?? ''} ${driver.vehicleInfo.model ?? ''}`
              : 'Not set up'}
            onPress={() => navigation.navigate('VehicleInfo')}
          />
          <MenuItem
            icon="[Docs]"
            label="Documents"
            sublabel="License, insurance, registration"
            onPress={() => navigation.navigate('Documents')}
            showBadge={false}
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Preferences</Text>
          <MenuItem
            icon="[Settings]"
            label="Settings"
            sublabel="Notifications, appearance, language"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Support</Text>
          <MenuItem
            icon="[Help]"
            label="Help Center"
            onPress={() => {
              // TODO: Navigate to help center
            }}
          />
          <MenuItem
            icon="[Contact]"
            label="Contact Support"
            onPress={() => {
              // TODO: Open support chat
            }}
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Driver App v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingBottom: 32,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  online: {
    backgroundColor: '#22C55E',
  },
  offline: {
    backgroundColor: '#A3A3A3',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingStar: {
    fontSize: 14,
    color: '#F59E0B',
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
  },
  ratingCount: {
    fontSize: 13,
    color: '#737373',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#737373',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
  menuSection: {
    marginBottom: 16,
  },
  menuSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIcon: {
    fontSize: 14,
    color: '#FF6B35',
    width: 32,
    textAlign: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 8,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
  menuSublabel: {
    fontSize: 12,
    color: '#A3A3A3',
    marginTop: 2,
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  menuArrow: {
    fontSize: 16,
    color: '#D4D4D4',
    fontWeight: '600',
  },
  signOutButton: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  versionText: {
    fontSize: 12,
    color: '#A3A3A3',
    textAlign: 'center',
    marginTop: 16,
  },
});
