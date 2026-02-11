import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

interface RecentOrder {
  id: string;
  customerName: string;
  items: number;
  total: string;
  status: string;
  time: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: '1', label: 'Add Item', icon: '+' },
  { id: '2', label: 'View Orders', icon: '\u{1F4CB}' },
  { id: '3', label: 'Staff', icon: '\u{1F465}' },
  { id: '4', label: 'Reviews', icon: '\u2B50' },
];

const PLACEHOLDER_ORDERS: RecentOrder[] = [
  {
    id: '1',
    customerName: 'John D.',
    items: 3,
    total: '$24.50',
    status: 'Preparing',
    time: '2 min ago',
  },
  {
    id: '2',
    customerName: 'Sarah M.',
    items: 1,
    total: '$12.00',
    status: 'Ready',
    time: '5 min ago',
  },
  {
    id: '3',
    customerName: 'Mike R.',
    items: 5,
    total: '$45.80',
    status: 'New',
    time: '1 min ago',
  },
];

export const DashboardScreen: React.FC = () => {
  const renderRecentOrder = ({ item }: { item: RecentOrder }): React.ReactElement => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderCustomer}>{item.customerName}</Text>
        <Text style={styles.orderTime}>{item.time}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderItems}>{item.items} items</Text>
        <Text style={styles.orderTotal}>{item.total}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        item.status === 'New' && styles.statusNew,
        item.status === 'Preparing' && styles.statusPreparing,
        item.status === 'Ready' && styles.statusReady,
      ]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.restaurantName}>My Restaurant</Text>
          </View>
          <View style={styles.statusIndicator}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusLabel}>Open</Text>
          </View>
        </View>

        {/* Today's Revenue */}
        <View style={styles.revenueCard}>
          <Text style={styles.revenueLabel}>Today&apos;s Revenue</Text>
          <Text style={styles.revenueAmount}>$0.00</Text>
          <View style={styles.revenueStats}>
            <View style={styles.revenueStat}>
              <Text style={styles.revenueStatValue}>0</Text>
              <Text style={styles.revenueStatLabel}>Orders</Text>
            </View>
            <View style={styles.revenueDivider} />
            <View style={styles.revenueStat}>
              <Text style={styles.revenueStatValue}>$0.00</Text>
              <Text style={styles.revenueStatLabel}>Avg. Order</Text>
            </View>
            <View style={styles.revenueDivider} />
            <View style={styles.revenueStat}>
              <Text style={styles.revenueStatValue}>0</Text>
              <Text style={styles.revenueStatLabel}>Customers</Text>
            </View>
          </View>
        </View>

        {/* Active Orders Count */}
        <View style={styles.activeOrdersSection}>
          <View style={styles.activeOrderCard}>
            <Text style={styles.activeOrderCount}>0</Text>
            <Text style={styles.activeOrderLabel}>New</Text>
          </View>
          <View style={styles.activeOrderCard}>
            <Text style={styles.activeOrderCount}>0</Text>
            <Text style={styles.activeOrderLabel}>Preparing</Text>
          </View>
          <View style={styles.activeOrderCard}>
            <Text style={styles.activeOrderCount}>0</Text>
            <Text style={styles.activeOrderLabel}>Ready</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionButton}>
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={PLACEHOLDER_ORDERS}
            renderItem={renderRecentOrder}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.orderSeparator} />}
          />
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
  revenueCard: {
    backgroundColor: '#E23744',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  revenueLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  revenueAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  revenueStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  revenueStat: {
    alignItems: 'center',
  },
  revenueStatValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  revenueDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeOrdersSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  activeOrderCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeOrderCount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  activeOrderLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3A3A3C',
  },
  recentOrdersSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  orderTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItems: {
    fontSize: 14,
    color: '#636366',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  statusNew: {
    backgroundColor: '#FFF3E0',
  },
  statusPreparing: {
    backgroundColor: '#E3F2FD',
  },
  statusReady: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3A3A3C',
  },
  orderSeparator: {
    height: 8,
  },
});
