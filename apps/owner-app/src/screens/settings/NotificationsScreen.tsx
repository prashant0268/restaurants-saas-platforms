import React, { useState } from 'react';
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

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface NotificationSection {
  title: string;
  items: NotificationSetting[];
}

export const NotificationsScreen: React.FC<
  SettingsScreenProps<'Notifications'>
> = ({ navigation }) => {
  const [sections, setSections] = useState<NotificationSection[]>([
    {
      title: 'Order Notifications',
      items: [
        {
          id: 'newOrder',
          label: 'New Orders',
          description: 'Get notified when a new order is placed',
          enabled: true,
        },
        {
          id: 'orderCancelled',
          label: 'Order Cancellations',
          description: 'Get notified when an order is cancelled',
          enabled: true,
        },
        {
          id: 'orderReady',
          label: 'Order Ready Reminders',
          description: 'Reminder when prepared orders await pickup',
          enabled: true,
        },
      ],
    },
    {
      title: 'Customer Notifications',
      items: [
        {
          id: 'newReview',
          label: 'New Reviews',
          description: 'Get notified when a customer leaves a review',
          enabled: true,
        },
        {
          id: 'lowRating',
          label: 'Low Rating Alerts',
          description: 'Alert when a review is 2 stars or below',
          enabled: true,
        },
      ],
    },
    {
      title: 'Business Notifications',
      items: [
        {
          id: 'dailySummary',
          label: 'Daily Summary',
          description: 'End-of-day revenue and order summary',
          enabled: true,
        },
        {
          id: 'weeklySummary',
          label: 'Weekly Report',
          description: 'Weekly analytics and performance report',
          enabled: false,
        },
        {
          id: 'lowStock',
          label: 'Low Stock Alerts',
          description: 'When menu items are running low',
          enabled: false,
        },
      ],
    },
    {
      title: 'Marketing',
      items: [
        {
          id: 'promotions',
          label: 'Promotions & Offers',
          description: 'Tips and promotional opportunities',
          enabled: false,
        },
        {
          id: 'updates',
          label: 'App Updates',
          description: 'New features and improvements',
          enabled: true,
        },
      ],
    },
  ]);

  const toggleSetting = (sectionIndex: number, itemId: string): void => {
    setSections((prev) =>
      prev.map((section, sIdx) =>
        sIdx === sectionIndex
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? { ...item, enabled: !item.enabled }
                  : item,
              ),
            }
          : section,
      ),
    );
  };

  const handleSave = (): void => {
    // TODO: Save to Firestore
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDescription}>
                    {item.description}
                  </Text>
                </View>
                <Switch
                  value={item.enabled}
                  onValueChange={() => toggleSetting(sectionIndex, item.id)}
                  trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            ))}
          </View>
        ))}

        {/* Push notification status */}
        <View style={styles.pushStatusSection}>
          <Text style={styles.pushStatusTitle}>Push Notifications</Text>
          <Text style={styles.pushStatusText}>
            Push notifications are enabled for this device.
          </Text>
          <TouchableOpacity style={styles.pushSettingsButton}>
            <Text style={styles.pushSettingsText}>
              Open Device Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  settingDescription: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  pushStatusSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  pushStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  pushStatusText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 16,
  },
  pushSettingsButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
  },
  pushSettingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636366',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  saveButton: {
    height: 52,
    backgroundColor: '#E23744',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
