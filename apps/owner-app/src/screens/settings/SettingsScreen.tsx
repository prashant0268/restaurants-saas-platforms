import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsScreenProps } from '../../navigation/types';

interface SettingsItem {
  id: string;
  label: string;
  subtitle?: string;
  screen?: keyof import('../../navigation/types').SettingsStackParamList;
  hasToggle?: boolean;
  toggleValue?: boolean;
  destructive?: boolean;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: 'Restaurant',
    items: [
      {
        id: 'profile',
        label: 'Restaurant Profile',
        subtitle: 'Name, address, contact info',
        screen: 'RestaurantProfile',
      },
      {
        id: 'hours',
        label: 'Operating Hours',
        subtitle: 'Set your business hours',
        screen: 'OperatingHours',
      },
      {
        id: 'delivery',
        label: 'Delivery Settings',
        subtitle: 'Zones, fees, minimum order',
        screen: 'DeliverySettings',
      },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        id: 'notifications',
        label: 'Notifications',
        subtitle: 'Order alerts, marketing',
        screen: 'Notifications',
      },
      {
        id: 'autoAccept',
        label: 'Auto-accept Orders',
        subtitle: 'Automatically accept new orders',
        hasToggle: true,
        toggleValue: false,
      },
      {
        id: 'sound',
        label: 'Order Sound Alerts',
        subtitle: 'Play sound for new orders',
        hasToggle: true,
        toggleValue: true,
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        id: 'staff',
        label: 'Staff Management',
        subtitle: 'Manage team access',
      },
      {
        id: 'billing',
        label: 'Billing & Subscription',
        subtitle: 'Plan, invoices, payment',
      },
      {
        id: 'support',
        label: 'Help & Support',
        subtitle: 'FAQs, contact support',
      },
    ],
  },
  {
    title: '',
    items: [
      {
        id: 'signout',
        label: 'Sign Out',
        destructive: true,
      },
    ],
  },
];

export const SettingsScreen: React.FC<SettingsScreenProps<'SettingsMain'>> = ({
  navigation,
}) => {
  const handlePress = (item: SettingsItem): void => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
    if (item.id === 'signout') {
      // TODO: Sign out logic
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Owner Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john@restaurant.com</Text>
            <Text style={styles.profileRole}>Owner</Text>
          </View>
          <Text style={styles.chevron}>&gt;</Text>
        </TouchableOpacity>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            {section.title ? (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            ) : null}
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingsItem,
                    itemIndex === section.items.length - 1 &&
                      styles.lastSettingsItem,
                  ]}
                  onPress={() => handlePress(item)}
                  disabled={item.hasToggle}
                >
                  <View style={styles.settingsItemContent}>
                    <Text
                      style={[
                        styles.settingsItemLabel,
                        item.destructive && styles.destructiveLabel,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.subtitle && (
                      <Text style={styles.settingsItemSubtitle}>
                        {item.subtitle}
                      </Text>
                    )}
                  </View>
                  {item.hasToggle ? (
                    <Switch
                      value={item.toggleValue}
                      trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
                      thumbColor="#FFFFFF"
                    />
                  ) : !item.destructive ? (
                    <Text style={styles.chevron}>&gt;</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <Text style={styles.versionText}>Owner App v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E23744',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  profileEmail: {
    fontSize: 14,
    color: '#636366',
    marginTop: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  chevron: {
    fontSize: 16,
    color: '#C7C7CC',
    fontWeight: '600',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  lastSettingsItem: {
    borderBottomWidth: 0,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemLabel: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  destructiveLabel: {
    color: '#F44336',
    textAlign: 'center',
    fontWeight: '500',
  },
  settingsItemSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  versionText: {
    fontSize: 12,
    color: '#C7C7CC',
    textAlign: 'center',
    marginTop: 24,
  },
});
