import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import type { ProfileScreenProps } from '../../navigation/types';

interface SettingToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

const SettingToggle: React.FC<SettingToggleProps> = ({
  label,
  description,
  value,
  onToggle,
}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingInfo}>
      <Text style={styles.settingLabel}>{label}</Text>
      {description && (
        <Text style={styles.settingDescription}>{description}</Text>
      )}
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#D4D4D4', true: '#FFB08C' }}
      thumbColor={value ? '#FF6B35' : '#A3A3A3'}
    />
  </View>
);

interface SettingLinkProps {
  label: string;
  value?: string;
  onPress: () => void;
}

const SettingLink: React.FC<SettingLinkProps> = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Text style={styles.settingLabel}>{label}</Text>
    <View style={styles.settingRight}>
      {value && <Text style={styles.settingValue}>{value}</Text>}
      <Text style={styles.settingArrow}>{'>'}</Text>
    </View>
  </TouchableOpacity>
);

export const SettingsScreen: React.FC<ProfileScreenProps<'Settings'>> = () => {
  const { driver } = useAuthStore();

  const [pushNotifications, setPushNotifications] = useState(
    driver?.preferences?.pushNotifications ?? true,
  );
  const [emailNotifications, setEmailNotifications] = useState(
    driver?.preferences?.emailNotifications ?? true,
  );
  const [smsNotifications, setSmsNotifications] = useState(
    driver?.preferences?.smsNotifications ?? false,
  );
  const [darkMode, setDarkMode] = useState(
    driver?.preferences?.darkMode ?? false,
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);

  const handleSaveSettings = (): void => {
    // TODO: Save settings to Firestore
    console.log('Saving settings');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionCard}>
            <SettingToggle
              label="Push Notifications"
              description="Receive delivery requests and updates"
              value={pushNotifications}
              onToggle={(v) => {
                setPushNotifications(v);
                handleSaveSettings();
              }}
            />
            <SettingToggle
              label="Email Notifications"
              description="Earnings summaries and promotions"
              value={emailNotifications}
              onToggle={(v) => {
                setEmailNotifications(v);
                handleSaveSettings();
              }}
            />
            <SettingToggle
              label="SMS Notifications"
              description="Critical alerts via text message"
              value={smsNotifications}
              onToggle={(v) => {
                setSmsNotifications(v);
                handleSaveSettings();
              }}
            />
          </View>
        </View>

        {/* Delivery Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Preferences</Text>
          <View style={styles.sectionCard}>
            <SettingToggle
              label="Sound Effects"
              description="Play sound for new delivery requests"
              value={soundEnabled}
              onToggle={setSoundEnabled}
            />
            <SettingToggle
              label="Vibration"
              description="Vibrate for new delivery requests"
              value={vibrationEnabled}
              onToggle={setVibrationEnabled}
            />
            <SettingToggle
              label="Auto-Accept Orders"
              description="Automatically accept nearby orders"
              value={autoAcceptOrders}
              onToggle={setAutoAcceptOrders}
            />
          </View>
        </View>

        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.sectionCard}>
            <SettingToggle
              label="Dark Mode"
              description="Use dark theme"
              value={darkMode}
              onToggle={(v) => {
                setDarkMode(v);
                handleSaveSettings();
              }}
            />
          </View>
        </View>

        {/* General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionCard}>
            <SettingLink
              label="Language"
              value={driver?.preferences?.language ?? 'English'}
              onPress={() => {
                // TODO: Navigate to language picker
              }}
            />
            <SettingLink
              label="Currency"
              value={driver?.preferences?.currency ?? 'USD'}
              onPress={() => {
                // TODO: Navigate to currency picker
              }}
            />
            <SettingLink
              label="Distance Unit"
              value="Miles"
              onPress={() => {
                // TODO: Toggle distance unit
              }}
            />
          </View>
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionCard}>
            <SettingLink
              label="Change Password"
              onPress={() => {
                // TODO: Navigate to change password
              }}
            />
            <SettingLink
              label="Privacy Policy"
              onPress={() => {
                // TODO: Open privacy policy
              }}
            />
            <SettingLink
              label="Terms of Service"
              onPress={() => {
                // TODO: Open terms of service
              }}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.dangerTitle]}>
            Danger Zone
          </Text>
          <TouchableOpacity style={styles.deleteAccountButton}>
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
  settingDescription: {
    fontSize: 12,
    color: '#A3A3A3',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingValue: {
    fontSize: 14,
    color: '#737373',
  },
  settingArrow: {
    fontSize: 16,
    color: '#D4D4D4',
    fontWeight: '600',
  },
  dangerTitle: {
    color: '#EF4444',
  },
  deleteAccountButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteAccountText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
  },
});
