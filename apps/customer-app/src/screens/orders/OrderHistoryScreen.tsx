import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { OrdersScreenProps } from '../../navigation/types';
import type { OrderStatus } from '@restaurants/types';

interface OrderHistoryItem {
  id: string;
  orderNumber: string;
  restaurantName: string;
  status: OrderStatus;
  total: string;
  date: string;
  itemCount: number;
}

type FilterTab = 'all' | 'active' | 'completed';

export const OrderHistoryScreen: React.FC<
  OrdersScreenProps<'OrderHistory'>
> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [orders] = useState<OrderHistoryItem[]>([]);

  // TODO: Fetch order history from orderService

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'pending':
      case 'confirmed':
      case 'preparing':
        return '#FF9800';
      case 'ready':
      case 'picked_up':
      case 'out_for_delivery':
        return '#2196F3';
      case 'delivered':
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
      case 'refunded':
        return '#E23744';
      default:
        return '#93959F';
    }
  };

  const TABS: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Past' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.tabActive,
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders list */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>Orders</Text>
            </View>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>
              Your order history will appear here once you place your first
              order
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() =>
              navigation.navigate('OrderDetail', { orderId: item.id })
            }
          >
            <View style={styles.orderHeader}>
              <View style={styles.restaurantInfo}>
                <View style={styles.restaurantLogo}>
                  <Text style={styles.logoText}>
                    {item.restaurantName[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.restaurantName}>
                    {item.restaurantName}
                  </Text>
                  <Text style={styles.orderDate}>{item.date}</Text>
                </View>
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
                  {item.status.replace('_', ' ')}
                </Text>
              </View>
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.itemCount}>
                {item.itemCount} items - {item.total}
              </Text>
              <View style={styles.orderActions}>
                {(item.status === 'delivered' ||
                  item.status === 'completed') && (
                  <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>
                )}
                {(item.status === 'preparing' ||
                  item.status === 'out_for_delivery') && (
                  <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() =>
                      navigation.navigate('OrderTracking', {
                        orderId: item.id,
                      })
                    }
                  >
                    <Text style={styles.trackText}>Track</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
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
    paddingBottom: 24,
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
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E23744',
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  orderDate: {
    fontSize: 13,
    color: '#93959F',
    marginTop: 2,
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
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  itemCount: {
    fontSize: 14,
    color: '#93959F',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  reorderButton: {
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reorderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E23744',
  },
  trackButton: {
    backgroundColor: '#E23744',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  trackText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
