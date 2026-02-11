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

interface DaySchedule {
  day: string;
  shortDay: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: 'Monday', shortDay: 'Mon', isOpen: true, openTime: '10:00 AM', closeTime: '10:00 PM' },
  { day: 'Tuesday', shortDay: 'Tue', isOpen: true, openTime: '10:00 AM', closeTime: '10:00 PM' },
  { day: 'Wednesday', shortDay: 'Wed', isOpen: true, openTime: '10:00 AM', closeTime: '10:00 PM' },
  { day: 'Thursday', shortDay: 'Thu', isOpen: true, openTime: '10:00 AM', closeTime: '10:00 PM' },
  { day: 'Friday', shortDay: 'Fri', isOpen: true, openTime: '10:00 AM', closeTime: '11:00 PM' },
  { day: 'Saturday', shortDay: 'Sat', isOpen: true, openTime: '11:00 AM', closeTime: '11:00 PM' },
  { day: 'Sunday', shortDay: 'Sun', isOpen: false, openTime: '11:00 AM', closeTime: '9:00 PM' },
];

export const OperatingHoursScreen: React.FC<
  SettingsScreenProps<'OperatingHours'>
> = ({ navigation }) => {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);

  const toggleDay = (index: number): void => {
    setSchedule((prev) =>
      prev.map((day, i) =>
        i === index ? { ...day, isOpen: !day.isOpen } : day,
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
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>
            Set your regular operating hours. Customers will see these times
            when viewing your restaurant.
          </Text>
        </View>

        {/* Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          {schedule.map((day, index) => (
            <View key={day.day} style={styles.dayRow}>
              <View style={styles.dayInfo}>
                <Text style={styles.dayName}>{day.day}</Text>
                {day.isOpen ? (
                  <View style={styles.timeRow}>
                    <TouchableOpacity style={styles.timePicker}>
                      <Text style={styles.timeText}>{day.openTime}</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeSeparator}>to</Text>
                    <TouchableOpacity style={styles.timePicker}>
                      <Text style={styles.timeText}>{day.closeTime}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.closedText}>Closed</Text>
                )}
              </View>
              <Switch
                value={day.isOpen}
                onValueChange={() => toggleDay(index)}
                trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </View>

        {/* Special Hours Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Hours</Text>
          <Text style={styles.specialHoursHint}>
            Set modified hours for holidays or special events.
          </Text>
          <TouchableOpacity style={styles.addSpecialButton}>
            <Text style={styles.addSpecialButtonText}>
              + Add Special Hours
            </Text>
          </TouchableOpacity>
        </View>

        {/* Temporary Closure */}
        <View style={styles.section}>
          <View style={styles.closureRow}>
            <View>
              <Text style={styles.closureLabel}>Temporarily Close</Text>
              <Text style={styles.closureHint}>
                Pause all orders immediately
              </Text>
            </View>
            <Switch
              value={false}
              trackColor={{ false: '#E5E5EA', true: '#F44336' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Hours</Text>
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
  infoBanner: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  infoBannerText: {
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
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
    marginBottom: 16,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timePicker: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#636366',
  },
  timeSeparator: {
    fontSize: 13,
    color: '#8E8E93',
  },
  closedText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
  },
  specialHoursHint: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  addSpecialButton: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E23744',
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSpecialButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E23744',
  },
  closureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closureLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F44336',
  },
  closureHint: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
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
