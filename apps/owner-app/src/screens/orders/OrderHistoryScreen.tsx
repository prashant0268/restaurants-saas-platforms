import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrdersScreenProps } from '../../navigation/types';

type FilterPeriod = 'today' | 'week' | 'month' | 'all';

interface HistoryOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: string;
  items: number;
  date: string;
  status: 'completed' | 'cancelled' | 'refunded';
}

const PLACEHOLDER_HISTORY: HistoryOrder[] = [
  {
    id: '1',
    orderNumber: '#1039',
    customerName: 'Alice J.',
    total: '$32.00',
    items: 4,
    date: 'Today, 11:45 AM',
    status: 'completed',
  },
  {
    id: '2',
    orderNumber: '#1038',
    customerName: 'Bob K.',
    total: '$18.50',
    items: 2,
    date: 'Today, 10:30 AM',
    status: 'completed',
  },
  {
    id: '3',
    orderNumber: '#1037',
    customerName: 'Carol L.',
    total: '$22.00',
    items: 3,
    date: 'Yesterday, 8:15 PM',
    status: 'cancelled',
  },
  {
    id: '4',
    orderNumber: '#1036',
    customerName: 'Dave M.',
    total: '$55.00',
    items: 6,
    date: 'Yesterday, 7:00 PM',
    status: 'completed',
  },
];

const FILTERS: { key: FilterPeriod; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'all', label: 'All' },
];

export const OrderHistoryScreen: React.FC<OrdersScreenProps<'OrderHistory'>> = ({
  navigation,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterPeriod>('today');

  const getStatusColor = (status: HistoryOrder['status']): string => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      case 'refunded':
        return '#FF9800';
    }
  };

  const renderOrder = ({ item }: { item: HistoryOrder }): React.ReactElement => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={styles.orderRight}>
          <Text style={styles.orderTotal}>{item.total}</Text>
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
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.orderMeta}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Text style={styles.orderItems}>{item.items} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Filter Tabs */}
      <View style={styles.filterBar}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              activeFilter === filter.key && styles.activeFilterTab,
            ]}
            onPress={() => setActiveFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.key && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {PLACEHOLDER_HISTORY.filter((o) => o.status === 'completed').length}
          </Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {PLACEHOLDER_HISTORY.filter((o) => o.status === 'cancelled').length}
          </Text>
          <Text style={styles.summaryLabel}>Cancelled</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>$127.50</Text>
          <Text style={styles.summaryLabel}>Revenue</Text>
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={PLACEHOLDER_HISTORY}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No orders for this period</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  activeFilterTab: {
    backgroundColor: '#E23744',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636366',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
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
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  customerName: {
    fontSize: 14,
    color: '#636366',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  orderItems: {
    fontSize: 12,
    color: '#8E8E93',
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
