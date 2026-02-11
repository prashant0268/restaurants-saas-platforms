import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { HistoryScreenProps } from '../../navigation/types';
import type { DeliveryStatus } from '@restaurants/types';

interface DeliveryHistoryItem {
  id: string;
  orderNumber: string;
  restaurantName: string;
  customerAddress: string;
  status: DeliveryStatus;
  totalEarnings: number;
  distance: number;
  distanceUnit: 'miles' | 'km';
  completedAt: string;
}

// Placeholder data - will be fetched from Firestore
const PLACEHOLDER_HISTORY: DeliveryHistoryItem[] = [];

type FilterOption = 'all' | 'delivered' | 'cancelled';

export const DeliveryHistoryScreen: React.FC<
  HistoryScreenProps<'DeliveryHistory'>
> = () => {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredHistory = PLACEHOLDER_HISTORY.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    try {
      // TODO: Fetch delivery history from Firestore
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusColor = (status: DeliveryStatus): string => {
    switch (status) {
      case 'delivered':
        return '#22C55E';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#737373';
    }
  };

  const renderItem = ({
    item,
  }: {
    item: DeliveryHistoryItem;
  }): React.ReactElement => (
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderNumber}>#{item.orderNumber}</Text>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        </View>
        <View style={styles.earningsContainer}>
          <Text style={styles.earningsAmount}>
            ${item.totalEarnings.toFixed(2)}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(item.status)}20` },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.address} numberOfLines={1}>
          {item.customerAddress}
        </Text>
        <Text style={styles.meta}>
          {item.distance.toFixed(1)} {item.distanceUnit} | {item.completedAt}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = (): React.ReactElement => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>[No History]</Text>
      <Text style={styles.emptyTitle}>No Delivery History</Text>
      <Text style={styles.emptyDescription}>
        Your completed and cancelled deliveries will appear here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Delivery History</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(
          [
            { key: 'all', label: 'All' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'cancelled', label: 'Cancelled' },
          ] as const
        ).map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.filterTab,
              filter === tab.key && styles.filterTabActive,
            ]}
            onPress={() => setFilter(tab.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === tab.key && styles.filterTabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results Count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          {filteredHistory.length} deliver{filteredHistory.length !== 1 ? 'ies' : 'y'}
        </Text>
      </View>

      {/* History List */}
      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FF6B35"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171717',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
  },
  filterTabActive: {
    backgroundColor: '#FF6B35',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#525252',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  resultsBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 13,
    color: '#737373',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2,
  },
  restaurantName: {
    fontSize: 13,
    color: '#525252',
  },
  earningsContainer: {
    alignItems: 'flex-end',
  },
  earningsAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 10,
  },
  address: {
    fontSize: 13,
    color: '#525252',
    marginBottom: 4,
  },
  meta: {
    fontSize: 11,
    color: '#A3A3A3',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 18,
    color: '#A3A3A3',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});
