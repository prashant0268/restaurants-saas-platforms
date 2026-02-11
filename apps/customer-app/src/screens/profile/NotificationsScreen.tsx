import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { ProfileScreenProps } from '../../navigation/types';

interface NotificationSetting {
  key: string;
  label: string;
  description: string;
  value: boolean;
}

export const NotificationsScreen: React.FC<
  ProfileScreenProps<'Notifications'>
> = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      key: 'push_orders',
      label: 'Order Updates',
      description: 'Get notified about your order status changes',
      value: true,
    },
    {
      key: 'push_promotions',
      label: 'Promotions & Deals',
      description: 'Receive special offers and discounts',
      value: true,
    },
    {
      key: 'push_recommendations',
      label: 'Recommendations',
      description: 'Personalized restaurant suggestions',
      value: false,
    },
    {
      key: 'push_reservations',
      label: 'Reservation Reminders',
      description: 'Reminders before your upcoming reservations',
      value: true,
    },
    {
      key: 'email_receipts',
      label: 'Email Receipts',
      description: 'Receive order receipts via email',
      value: true,
    },
    {
      key: 'email_newsletter',
      label: 'Newsletter',
      description: 'Weekly picks and food stories',
      value: false,
    },
    {
      key: 'sms_orders',
      label: 'SMS Order Updates',
      description: 'Receive text messages about your orders',
      value: false,
    },
  ]);

  const toggleSetting = (key: string): void => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: !s.value } : s)),
    );
    // TODO: Update notification preferences in Firestore
  };

  const pushSettings = settings.filter(
    (s) => s.key.startsWith('push_'),
  );
  const emailSettings = settings.filter(
    (s) => s.key.startsWith('email_'),
  );
  const smsSettings = settings.filter(
    (s) => s.key.startsWith('sms_'),
  );

  const renderSection = (
    title: string,
    items: NotificationSetting[],
  ): React.ReactNode => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((setting) => (
        <View key={setting.key} style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>{setting.label}</Text>
            <Text style={styles.settingDescription}>
              {setting.description}
            </Text>
          </View>
          <Switch
            value={setting.value}
            onValueChange={() => toggleSetting(setting.key)}
            trackColor={{ false: '#E0E0E0', true: '#E2374440' }}
            thumbColor={setting.value ? '#E23744' : '#FFFFFF'}
          />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSection('Push Notifications', pushSettings)}
        {renderSection('Email Notifications', emailSettings)}
        {renderSection('SMS Notifications', smsSettings)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#93959F',
    lineHeight: 18,
  },
});
