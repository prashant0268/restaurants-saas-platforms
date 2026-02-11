import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeliveryStore } from '../../stores/deliveryStore';
import type { DeliveryScreenProps } from '../../navigation/types';

interface OrderItemRow {
  name: string;
  quantity: number;
  specialInstructions?: string;
}

// Placeholder order items until connected to real data
const PLACEHOLDER_ITEMS: OrderItemRow[] = [
  { name: 'Chicken Tikka Masala', quantity: 1 },
  { name: 'Garlic Naan (2 pcs)', quantity: 2 },
  { name: 'Mango Lassi', quantity: 1, specialInstructions: 'Extra sweet' },
  { name: 'Samosa (3 pcs)', quantity: 1 },
];

export const OrderDetailScreen: React.FC<DeliveryScreenProps<'OrderDetail'>> = ({
  route,
}) => {
  const { orderId, deliveryId } = route.params;
  const { currentDelivery } = useDeliveryStore();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>Order #{currentDelivery?.orderNumber ?? orderId}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(currentDelivery?.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {formatStatus(currentDelivery?.status ?? 'pending')}
            </Text>
          </View>
        </View>

        {/* Restaurant Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant</Text>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionName}>
              {currentDelivery?.restaurantName ?? 'Restaurant Name'}
            </Text>
            <Text style={styles.sectionAddress}>
              {currentDelivery?.restaurantAddress ?? '123 Main St'}
            </Text>
          </View>
        </View>

        {/* Customer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionName}>
              {currentDelivery?.customerName ?? 'Customer Name'}
            </Text>
            <Text style={styles.sectionAddress}>
              {currentDelivery?.customerAddress ?? '456 Oak Ave'}
            </Text>
            {currentDelivery?.customerPhone && (
              <Text style={styles.sectionPhone}>
                {currentDelivery.customerPhone}
              </Text>
            )}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.sectionCard}>
            {PLACEHOLDER_ITEMS.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.itemRow,
                  index < PLACEHOLDER_ITEMS.length - 1 && styles.itemDivider,
                ]}
              >
                <View style={styles.itemQuantity}>
                  <Text style={styles.itemQuantityText}>{item.quantity}x</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.specialInstructions && (
                    <Text style={styles.itemInstructions}>
                      Note: {item.specialInstructions}
                    </Text>
                  )}
                </View>
              </View>
            ))}
            <View style={styles.itemsTotal}>
              <Text style={styles.itemsTotalLabel}>
                {PLACEHOLDER_ITEMS.length} item{PLACEHOLDER_ITEMS.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.sectionCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Distance</Text>
              <Text style={styles.detailValue}>
                {currentDelivery
                  ? `${currentDelivery.distance.toFixed(1)} ${currentDelivery.distanceUnit}`
                  : '--'}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivery Fee</Text>
              <Text style={styles.detailValue}>
                ${currentDelivery?.deliveryFee.amount.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tip</Text>
              <Text style={styles.detailValue}>
                ${currentDelivery?.tip.amount.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            <View style={[styles.detailRow, styles.detailTotalRow]}>
              <Text style={styles.detailTotalLabel}>Your Earnings</Text>
              <Text style={styles.detailTotalValue}>
                ${currentDelivery?.totalEarnings.amount.toFixed(2) ?? '0.00'}
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery ID Footer */}
        <Text style={styles.deliveryId}>Delivery ID: {deliveryId}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStatusColor = (status?: string): string => {
  switch (status) {
    case 'accepted':
    case 'picking_up':
      return '#3B82F6';
    case 'at_restaurant':
    case 'picked_up':
      return '#8B5CF6';
    case 'delivering':
    case 'arrived':
      return '#F59E0B';
    case 'delivered':
      return '#22C55E';
    default:
      return '#A3A3A3';
  }
};

const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },
  sectionAddress: {
    fontSize: 14,
    color: '#525252',
  },
  sectionPhone: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemQuantity: {
    width: 32,
    height: 24,
    backgroundColor: '#FFF5F0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemQuantityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B35',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#171717',
  },
  itemInstructions: {
    fontSize: 12,
    color: '#F59E0B',
    fontStyle: 'italic',
    marginTop: 2,
  },
  itemsTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 10,
    marginTop: 4,
  },
  itemsTotalLabel: {
    fontSize: 13,
    color: '#737373',
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#525252',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
  },
  detailTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 10,
    marginTop: 4,
  },
  detailTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
  },
  detailTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  deliveryId: {
    fontSize: 11,
    color: '#A3A3A3',
    textAlign: 'center',
    marginTop: 8,
  },
});
