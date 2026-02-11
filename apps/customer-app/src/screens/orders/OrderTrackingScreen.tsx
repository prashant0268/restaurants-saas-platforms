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

const ORDER_STEPS = [
  { key: 'confirmed', label: 'Order Confirmed', time: '12:30 PM' },
  { key: 'preparing', label: 'Preparing', time: '12:32 PM' },
  { key: 'ready', label: 'Ready for Pickup', time: '' },
  { key: 'out_for_delivery', label: 'Out for Delivery', time: '' },
  { key: 'delivered', label: 'Delivered', time: '' },
];

export const OrderTrackingScreen: React.FC<
  OrdersScreenProps<'OrderTracking'>
> = ({ route }) => {
  const { orderId } = route.params;

  // TODO: Subscribe to real-time order status via Firestore listener
  const currentStepIndex = 1; // placeholder: "Preparing"

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order status header */}
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>Preparing your order</Text>
          <Text style={styles.estimatedTime}>
            Estimated delivery: 12:55 - 1:05 PM
          </Text>
        </View>

        {/* Map / driver location placeholder */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholder}>
            Live Map / Driver Location
          </Text>
        </View>

        {/* Order progress steps */}
        <View style={styles.stepsContainer}>
          {ORDER_STEPS.map((step, index) => (
            <View key={step.key} style={styles.stepRow}>
              <View style={styles.stepIndicator}>
                <View
                  style={[
                    styles.stepDot,
                    index <= currentStepIndex && styles.stepDotActive,
                    index === currentStepIndex && styles.stepDotCurrent,
                  ]}
                />
                {index < ORDER_STEPS.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      index < currentStepIndex && styles.stepLineActive,
                    ]}
                  />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepLabel,
                    index <= currentStepIndex && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
                {step.time ? (
                  <Text style={styles.stepTime}>{step.time}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* Driver info (when assigned) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Driver</Text>
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>D</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Driver Name</Text>
              <Text style={styles.driverRating}>4.9 stars - 500+ deliveries</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order details summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <Text style={styles.orderNumber}>Order #{orderId}</Text>
          {/* TODO: Show actual order items */}
          <Text style={styles.orderItem}>1x Margherita Pizza - $12.99</Text>
          <Text style={styles.orderItem}>1x Garlic Bread - $5.99</Text>
          <View style={styles.orderTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$23.06</Text>
          </View>
        </View>

        {/* Help / support */}
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>Need Help?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF0F0',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '500',
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    fontSize: 14,
    color: '#93959F',
  },
  stepsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 56,
  },
  stepIndicator: {
    alignItems: 'center',
    width: 32,
  },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  stepDotActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  stepDotCurrent: {
    backgroundColor: '#E23744',
    borderColor: '#E23744',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  stepLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  stepLineActive: {
    backgroundColor: '#4CAF50',
  },
  stepContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 16,
  },
  stepLabel: {
    fontSize: 15,
    color: '#93959F',
    fontWeight: '500',
  },
  stepLabelActive: {
    color: '#1C1C1C',
    fontWeight: '600',
  },
  stepTime: {
    fontSize: 13,
    color: '#93959F',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E23744',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  driverRating: {
    fontSize: 13,
    color: '#93959F',
    marginTop: 2,
  },
  callButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderNumber: {
    fontSize: 14,
    color: '#93959F',
    marginBottom: 8,
  },
  orderItem: {
    fontSize: 14,
    color: '#1C1C1C',
    paddingVertical: 4,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
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
  helpButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
  },
});
