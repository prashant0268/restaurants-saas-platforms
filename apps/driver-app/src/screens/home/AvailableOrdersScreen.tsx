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
import { useDeliveryStore } from '../../stores/deliveryStore';
import type { HomeScreenProps } from '../../navigation/types';
import type { DeliveryAssignment } from '@restaurants/types';

interface AvailableOrderCardProps {
  order: DeliveryAssignment;
  onAccept: (id: string) => void;
}

const AvailableOrderCard: React.FC<AvailableOrderCardProps> = ({ order, onAccept }) => (
  <View style={styles.orderCard}>
    {/* Restaurant Info */}
    <View style={styles.orderHeader}>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{order.restaurantName}</Text>
        <Text style={styles.restaurantAddress} numberOfLines={1}>
          {order.restaurantAddress}
        </Text>
      </View>
      <View style={styles.earningsContainer}>
        <Text style={styles.earningsAmount}>
          ${order.totalEarnings.amount.toFixed(2)}
        </Text>
        <Text style={styles.earningsLabel}>est. pay</Text>
      </View>
    </View>

    {/* Delivery Details */}
    <View style={styles.detailsRow}>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Distance</Text>
        <Text style={styles.detailValue}>
          {order.distance.toFixed(1)} {order.distanceUnit}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Pickup ETA</Text>
        <Text style={styles.detailValue}>~10 min</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Tip</Text>
        <Text style={styles.detailValue}>
          ${order.tip.amount.toFixed(2)}
        </Text>
      </View>
    </View>

    {/* Customer Address */}
    <View style={styles.customerSection}>
      <Text style={styles.customerLabel}>Deliver to:</Text>
      <Text style={styles.customerAddress} numberOfLines={1}>
        {order.customerAddress}
      </Text>
    </View>

    {/* Accept Button */}
    <TouchableOpacity
      style={styles.acceptButton}
      onPress={() => onAccept(order.id)}
    >
      <Text style={styles.acceptButtonText}>Accept Delivery</Text>
    </TouchableOpacity>
  </View>
);

export const AvailableOrdersScreen: React.FC<HomeScreenProps<'AvailableOrders'>> = () => {
  const { availableOrders } = useDeliveryStore();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    try {
      // TODO: Fetch available orders from Firestore
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setRefreshing(false);
    }
  };

  const handleAcceptOrder = (orderId: string): void => {
    // TODO: Accept order and update Firestore
    console.log('Accepting order:', orderId);
  };

  const renderEmptyList = (): React.ReactElement => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>[No Orders]</Text>
      <Text style={styles.emptyTitle}>No Available Orders</Text>
      <Text style={styles.emptyDescription}>
        New delivery requests will appear here when they become available.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Summary Bar */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>
          {availableOrders.length} order{availableOrders.length !== 1 ? 's' : ''} nearby
        </Text>
      </View>

      <FlatList
        data={availableOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AvailableOrderCard order={item} onAccept={handleAcceptOrder} />
        )}
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
  summaryBar: {
    backgroundColor: '#FF6B35',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  restaurantInfo: {
    flex: 1,
    marginRight: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2,
  },
  restaurantAddress: {
    fontSize: 12,
    color: '#737373',
  },
  earningsContainer: {
    alignItems: 'flex-end',
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22C55E',
  },
  earningsLabel: {
    fontSize: 11,
    color: '#737373',
  },
  detailsRow: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#A3A3A3',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
  },
  customerSection: {
    marginBottom: 12,
  },
  customerLabel: {
    fontSize: 12,
    color: '#737373',
    marginBottom: 2,
  },
  customerAddress: {
    fontSize: 14,
    color: '#171717',
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
    paddingHorizontal: 32,
    lineHeight: 20,
  },
});
