import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import type { OrdersScreenProps } from '../../navigation/types';

export const OrderDetailScreen: React.FC<OrdersScreenProps<'OrderDetail'>> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params;

  // TODO: Fetch order details from orderService

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order status banner */}
        <View style={styles.statusBanner}>
          <Text style={styles.statusText}>Delivered</Text>
          <Text style={styles.statusDate}>January 15, 2026 at 1:05 PM</Text>
        </View>

        {/* Restaurant info */}
        <View style={styles.section}>
          <View style={styles.restaurantRow}>
            <View style={styles.restaurantLogo}>
              <Text style={styles.logoText}>R</Text>
            </View>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>Restaurant Name</Text>
              <Text style={styles.orderNumber}>Order #{orderId}</Text>
            </View>
          </View>
        </View>

        {/* Order items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>
          {/* TODO: Map actual order items */}
          {[
            { name: 'Margherita Pizza', qty: 1, price: '$12.99' },
            { name: 'Garlic Bread', qty: 2, price: '$11.98' },
            { name: 'Tiramisu', qty: 1, price: '$7.99' },
          ].map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemQty}>{item.qty}x</Text>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Payment summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$32.96</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>$2.99</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>$2.64</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tip</Text>
            <Text style={styles.summaryValue}>$3.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$41.59</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentLabel}>Paid with</Text>
            <Text style={styles.paymentValue}>Visa **** 1234</Text>
          </View>
        </View>

        {/* Delivery details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <Text style={styles.detailLabel}>Delivered to</Text>
          <Text style={styles.detailValue}>
            123 Main St, Apt 4B, City, ST 12345
          </Text>
          <Text style={styles.detailLabel}>Delivery instructions</Text>
          <Text style={styles.detailValue}>Leave at door</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.primaryAction}>
            <Text style={styles.primaryActionText}>Reorder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => {
              // TODO: Navigate to WriteReview with proper params
            }}
          >
            <Text style={styles.secondaryActionText}>Write a Review</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Get Help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Download Receipt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBanner: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statusDate: {
    fontSize: 14,
    color: '#2E7D32',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E23744',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  orderNumber: {
    fontSize: 13,
    color: '#93959F',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemQty: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
    width: 32,
  },
  itemName: {
    fontSize: 14,
    color: '#1C1C1C',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1C',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#93959F',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E23744',
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#93959F',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1C',
  },
  detailLabel: {
    fontSize: 13,
    color: '#93959F',
    marginBottom: 4,
    marginTop: 8,
  },
  detailValue: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  actionsSection: {
    padding: 16,
    gap: 12,
  },
  primaryAction: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
});
