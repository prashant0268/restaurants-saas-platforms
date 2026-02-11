import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrdersScreenProps } from '../../navigation/types';

type OrderTab = 'new' | 'preparing' | 'ready';

interface LiveOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  items: string[];
  total: string;
  time: string;
  status: OrderTab;
}

const PLACEHOLDER_ORDERS: LiveOrder[] = [
  {
    id: '1',
    orderNumber: '#1042',
    customerName: 'John D.',
    items: ['Butter Chicken x1', 'Naan x2'],
    total: '$24.50',
    time: '2 min ago',
    status: 'new',
  },
  {
    id: '2',
    orderNumber: '#1041',
    customerName: 'Sarah M.',
    items: ['Paneer Tikka x1'],
    total: '$12.00',
    time: '8 min ago',
    status: 'preparing',
  },
  {
    id: '3',
    orderNumber: '#1040',
    customerName: 'Mike R.',
    items: ['Biryani x2', 'Raita x1', 'Lassi x2'],
    total: '$45.80',
    time: '15 min ago',
    status: 'ready',
  },
];

const TABS: { key: OrderTab; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
];

export const LiveOrdersScreen: React.FC<OrdersScreenProps<'LiveOrders'>> = ({
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState<OrderTab>('new');

  const filteredOrders = PLACEHOLDER_ORDERS.filter(
    (order) => order.status === activeTab,
  );

  const getActionLabel = (tab: OrderTab): string => {
    switch (tab) {
      case 'new':
        return 'Accept Order';
      case 'preparing':
        return 'Mark Ready';
      case 'ready':
        return 'Complete';
    }
  };

  const renderOrder = ({ item }: { item: LiveOrder }): React.ReactElement => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <Text style={styles.orderTime}>{item.time}</Text>
      </View>
      <View style={styles.itemsList}>
        {item.items.map((itemName, index) => (
          <Text key={index} style={styles.itemText}>
            {itemName}
          </Text>
        ))}
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>{item.total}</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            {getActionLabel(activeTab)}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {PLACEHOLDER_ORDERS.filter((o) => o.status === tab.key).length}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Order History Link */}
      <TouchableOpacity
        style={styles.historyLink}
        onPress={() => navigation.navigate('OrderHistory')}
      >
        <Text style={styles.historyLinkText}>View Order History</Text>
      </TouchableOpacity>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {activeTab} orders</Text>
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#E23744',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636366',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3A3A3C',
  },
  historyLink: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-end',
  },
  historyLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
  orderTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  itemsList: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  itemText: {
    fontSize: 14,
    color: '#3A3A3C',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  actionButton: {
    backgroundColor: '#E23744',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
