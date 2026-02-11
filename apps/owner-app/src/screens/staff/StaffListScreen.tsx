import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StaffScreenProps } from '../../navigation/types';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar: string;
}

const PLACEHOLDER_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'Amit Kumar',
    role: 'Head Chef',
    phone: '+1 (555) 100-0001',
    status: 'active',
    avatar: 'AK',
  },
  {
    id: '2',
    name: 'Priya Singh',
    role: 'Sous Chef',
    phone: '+1 (555) 100-0002',
    status: 'active',
    avatar: 'PS',
  },
  {
    id: '3',
    name: 'Ravi Patel',
    role: 'Server',
    phone: '+1 (555) 100-0003',
    status: 'on-leave',
    avatar: 'RP',
  },
  {
    id: '4',
    name: 'Lisa Johnson',
    role: 'Cashier',
    phone: '+1 (555) 100-0004',
    status: 'active',
    avatar: 'LJ',
  },
  {
    id: '5',
    name: 'Mark Chen',
    role: 'Delivery',
    phone: '+1 (555) 100-0005',
    status: 'inactive',
    avatar: 'MC',
  },
];

export const StaffListScreen: React.FC<StaffScreenProps<'StaffList'>> = ({
  navigation,
}) => {
  const getStatusColor = (status: StaffMember['status']): string => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'on-leave':
        return '#FF9800';
      case 'inactive':
        return '#9E9E9E';
    }
  };

  const getStatusLabel = (status: StaffMember['status']): string => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on-leave':
        return 'On Leave';
      case 'inactive':
        return 'Inactive';
    }
  };

  const renderStaffMember = ({ item }: { item: StaffMember }): React.ReactElement => (
    <TouchableOpacity
      style={styles.staffCard}
      onPress={() => navigation.navigate('StaffDetail', { staffId: item.id })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.staffInfo}>
        <Text style={styles.staffName}>{item.name}</Text>
        <Text style={styles.staffRole}>{item.role}</Text>
        <Text style={styles.staffPhone}>{item.phone}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) + '20' },
        ]}
      >
        <View
          style={[
            styles.statusDot,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        />
        <Text
          style={[
            styles.statusText,
            { color: getStatusColor(item.status) },
          ]}
        >
          {getStatusLabel(item.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {PLACEHOLDER_STAFF.filter((s) => s.status === 'active').length}
          </Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {PLACEHOLDER_STAFF.filter((s) => s.status === 'on-leave').length}
          </Text>
          <Text style={styles.summaryLabel}>On Leave</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{PLACEHOLDER_STAFF.length}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
      </View>

      {/* Staff List */}
      <FlatList
        data={PLACEHOLDER_STAFF}
        renderItem={renderStaffMember}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Add Staff Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Staff Member</Text>
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
  summary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  staffCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E23744',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  staffRole: {
    fontSize: 13,
    color: '#636366',
    marginTop: 2,
  },
  staffPhone: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
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
  addButton: {
    height: 48,
    backgroundColor: '#E23744',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
