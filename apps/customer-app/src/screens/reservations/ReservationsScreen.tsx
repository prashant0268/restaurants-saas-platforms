import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { ReservationsScreenProps } from '../../navigation/types';
import type { ReservationStatus } from '@restaurants/types';

interface ReservationListItem {
  id: string;
  restaurantName: string;
  dateTime: string;
  partySize: number;
  status: ReservationStatus;
  confirmationCode: string;
}

type FilterTab = 'upcoming' | 'past';

export const ReservationsScreen: React.FC<
  ReservationsScreenProps<'Reservations'>
> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('upcoming');
  const [reservations] = useState<ReservationListItem[]>([]);

  // TODO: Fetch reservations from Firestore

  const getStatusColor = (status: ReservationStatus): string => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'confirmed':
        return '#4CAF50';
      case 'seated':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
      case 'no_show':
        return '#E23744';
      default:
        return '#93959F';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs: Upcoming / Past */}
      <View style={styles.tabsRow}>
        {(['upcoming', 'past'] as FilterTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab === 'upcoming' ? 'Upcoming' : 'Past'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reservations list */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>Table</Text>
            </View>
            <Text style={styles.emptyTitle}>No reservations</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming'
                ? 'Book a table at your favorite restaurant'
                : 'Your past reservations will appear here'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reservationCard}>
            <View style={styles.cardHeader}>
              <View style={styles.restaurantInfo}>
                <View style={styles.restaurantLogo}>
                  <Text style={styles.logoText}>
                    {item.restaurantName[0]}
                  </Text>
                </View>
                <Text style={styles.restaurantName}>
                  {item.restaurantName}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.cardDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>{item.dateTime}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Party Size</Text>
                <Text style={styles.detailValue}>
                  {item.partySize} guests
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Confirmation</Text>
                <Text style={styles.detailValue}>
                  {item.confirmationCode}
                </Text>
              </View>
            </View>

            {/* Action buttons */}
            {item.status === 'confirmed' && (
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.modifyButton}>
                  <Text style={styles.modifyText}>Modify</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Book a table FAB */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() =>
          navigation.navigate('BookReservation', {
            restaurantId: '',
            restaurantName: '',
          })
        }
      >
        <Text style={styles.fabText}>+ Book a Table</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#FFF0F0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#93959F',
  },
  tabTextActive: {
    color: '#E23744',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIconText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#93959F',
    textAlign: 'center',
    lineHeight: 20,
  },
  reservationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E23744',
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 13,
    color: '#93959F',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  modifyButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modifyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E23744',
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#E23744',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
