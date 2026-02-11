import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StaffScreenProps } from '../../navigation/types';

interface ShiftRecord {
  date: string;
  startTime: string;
  endTime: string;
  hours: string;
}

const PLACEHOLDER_SHIFTS: ShiftRecord[] = [
  { date: 'Feb 9', startTime: '9:00 AM', endTime: '5:00 PM', hours: '8h' },
  { date: 'Feb 8', startTime: '10:00 AM', endTime: '6:00 PM', hours: '8h' },
  { date: 'Feb 7', startTime: '9:00 AM', endTime: '4:00 PM', hours: '7h' },
  { date: 'Feb 6', startTime: '11:00 AM', endTime: '7:00 PM', hours: '8h' },
];

export const StaffDetailScreen: React.FC<StaffScreenProps<'StaffDetail'>> = ({
  route,
}) => {
  const { staffId } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
          <Text style={styles.staffName}>Amit Kumar</Text>
          <Text style={styles.staffRole}>Head Chef</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>+1 (555) 100-0001</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>amit.k@restaurant.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Employee ID</Text>
            <Text style={styles.infoValue}>EMP-{staffId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Joined</Text>
            <Text style={styles.infoValue}>Jan 15, 2024</Text>
          </View>
        </View>

        {/* Work Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.workSummary}>
            <View style={styles.workStat}>
              <Text style={styles.workStatValue}>31h</Text>
              <Text style={styles.workStatLabel}>Hours Worked</Text>
            </View>
            <View style={styles.workStat}>
              <Text style={styles.workStatValue}>4</Text>
              <Text style={styles.workStatLabel}>Shifts</Text>
            </View>
            <View style={styles.workStat}>
              <Text style={styles.workStatValue}>$0</Text>
              <Text style={styles.workStatLabel}>Tips</Text>
            </View>
          </View>
        </View>

        {/* Recent Shifts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Shifts</Text>
          {PLACEHOLDER_SHIFTS.map((shift, index) => (
            <View key={index} style={styles.shiftRow}>
              <Text style={styles.shiftDate}>{shift.date}</Text>
              <Text style={styles.shiftTime}>
                {shift.startTime} - {shift.endTime}
              </Text>
              <Text style={styles.shiftHours}>{shift.hours}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleButtonText}>Manage Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deactivateButton}>
            <Text style={styles.deactivateButtonText}>Deactivate</Text>
          </TouchableOpacity>
        </View>
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
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E23744',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  staffName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  staffRole: {
    fontSize: 16,
    color: '#636366',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  workSummary: {
    flexDirection: 'row',
  },
  workStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  workStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  workStatLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  shiftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  shiftDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    width: 60,
  },
  shiftTime: {
    flex: 1,
    fontSize: 14,
    color: '#636366',
  },
  shiftHours: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
  },
  actionsSection: {
    padding: 20,
    gap: 12,
  },
  editButton: {
    height: 48,
    backgroundColor: '#E23744',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scheduleButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E23744',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E23744',
  },
  deactivateButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deactivateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
});
