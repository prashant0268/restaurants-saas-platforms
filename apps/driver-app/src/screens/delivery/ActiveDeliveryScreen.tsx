import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeliveryStore } from '../../stores/deliveryStore';
import type { DeliveryScreenProps } from '../../navigation/types';
import type { DeliveryStatus } from '@restaurants/types';

const STATUS_STEPS: { status: DeliveryStatus; label: string }[] = [
  { status: 'accepted', label: 'Accepted' },
  { status: 'picking_up', label: 'Heading to Restaurant' },
  { status: 'at_restaurant', label: 'At Restaurant' },
  { status: 'picked_up', label: 'Picked Up' },
  { status: 'delivering', label: 'Delivering' },
  { status: 'arrived', label: 'Arrived' },
];

export const ActiveDeliveryScreen: React.FC<DeliveryScreenProps<'ActiveDelivery'>> = ({
  navigation,
  route,
}) => {
  const { deliveryId } = route.params;
  const { currentDelivery, updateDeliveryStatus } = useDeliveryStore();

  const currentStepIndex = STATUS_STEPS.findIndex(
    (s) => s.status === currentDelivery?.status,
  );

  const handleCallRestaurant = (): void => {
    // TODO: Use restaurant phone from delivery assignment
    Linking.openURL('tel:+15551234567');
  };

  const handleCallCustomer = (): void => {
    if (currentDelivery?.customerPhone) {
      Linking.openURL(`tel:${currentDelivery.customerPhone}`);
    }
  };

  const handleNavigateToLocation = (): void => {
    // TODO: Open maps app with destination
    const destination = currentDelivery?.status === 'picking_up' ||
      currentDelivery?.status === 'at_restaurant'
        ? currentDelivery?.restaurantAddress
        : currentDelivery?.customerAddress;
    console.log('Navigate to:', destination);
  };

  const handleAdvanceStatus = (): void => {
    if (!currentDelivery) return;

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STATUS_STEPS.length) {
      updateDeliveryStatus(deliveryId, STATUS_STEPS[nextIndex].status);
    } else {
      navigation.navigate('DeliveryConfirmation', { deliveryId });
    }
  };

  const getNextStatusLabel = (): string => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= STATUS_STEPS.length) return 'Complete Delivery';
    return STATUS_STEPS[nextIndex].label;
  };

  if (!currentDelivery) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noDelivery}>
          <Text style={styles.noDeliveryIcon}>[No Delivery]</Text>
          <Text style={styles.noDeliveryTitle}>No Active Delivery</Text>
          <Text style={styles.noDeliveryText}>
            Accept a delivery from the home screen to get started.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>[Live Map View]</Text>
          <Text style={styles.mapSubtext}>
            Route: Restaurant {'-->'} Customer
          </Text>
        </View>

        {/* Status Progress */}
        <View style={styles.statusProgress}>
          {STATUS_STEPS.map((step, index) => (
            <View key={step.status} style={styles.stepContainer}>
              <View
                style={[
                  styles.stepDot,
                  index <= currentStepIndex && styles.stepDotActive,
                  index === currentStepIndex && styles.stepDotCurrent,
                ]}
              />
              <Text
                style={[
                  styles.stepLabel,
                  index <= currentStepIndex && styles.stepLabelActive,
                ]}
              >
                {step.label}
              </Text>
              {index < STATUS_STEPS.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    index < currentStepIndex && styles.stepLineActive,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        {/* Restaurant Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>Restaurant</Text>
            <TouchableOpacity onPress={handleCallRestaurant}>
              <Text style={styles.callButton}>[Call]</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoName}>{currentDelivery.restaurantName}</Text>
          <Text style={styles.infoAddress}>{currentDelivery.restaurantAddress}</Text>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={handleNavigateToLocation}
          >
            <Text style={styles.navigateButtonText}>Navigate</Text>
          </TouchableOpacity>
        </View>

        {/* Customer Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>Customer</Text>
            <TouchableOpacity onPress={handleCallCustomer}>
              <Text style={styles.callButton}>[Call]</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoName}>{currentDelivery.customerName}</Text>
          <Text style={styles.infoAddress}>{currentDelivery.customerAddress}</Text>
        </View>

        {/* Order Summary */}
        <TouchableOpacity
          style={styles.orderSummary}
          onPress={() =>
            navigation.navigate('OrderDetail', {
              orderId: currentDelivery.orderId,
              deliveryId: currentDelivery.id,
            })
          }
        >
          <Text style={styles.orderSummaryText}>
            Order #{currentDelivery.orderNumber}
          </Text>
          <Text style={styles.orderSummaryArrow}>{'>'}</Text>
        </TouchableOpacity>

        {/* Earnings Preview */}
        <View style={styles.earningsPreview}>
          <View style={styles.earningsRow}>
            <Text style={styles.earningsLabel}>Delivery Fee</Text>
            <Text style={styles.earningsValue}>
              ${currentDelivery.deliveryFee.amount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.earningsRow}>
            <Text style={styles.earningsLabel}>Tip</Text>
            <Text style={styles.earningsValue}>
              ${currentDelivery.tip.amount.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.earningsRow, styles.earningsTotalRow]}>
            <Text style={styles.earningsTotalLabel}>Total Earnings</Text>
            <Text style={styles.earningsTotalValue}>
              ${currentDelivery.totalEarnings.amount.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Advance Status Button */}
        <TouchableOpacity
          style={styles.advanceButton}
          onPress={handleAdvanceStatus}
        >
          <Text style={styles.advanceButtonText}>{getNextStatusLabel()}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingBottom: 24,
  },
  mapPlaceholder: {
    height: 220,
    backgroundColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#525252',
  },
  mapSubtext: {
    fontSize: 12,
    color: '#737373',
    marginTop: 4,
  },
  statusProgress: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D4D4D4',
    marginBottom: 4,
  },
  stepDotActive: {
    backgroundColor: '#22C55E',
  },
  stepDotCurrent: {
    backgroundColor: '#FF6B35',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  stepLabel: {
    fontSize: 9,
    color: '#A3A3A3',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#171717',
    fontWeight: '600',
  },
  stepLine: {
    position: 'absolute',
    top: 6,
    right: -20,
    width: 40,
    height: 2,
    backgroundColor: '#D4D4D4',
  },
  stepLineActive: {
    backgroundColor: '#22C55E',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  callButton: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  infoName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2,
  },
  infoAddress: {
    fontSize: 14,
    color: '#525252',
    marginBottom: 8,
  },
  navigateButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  orderSummaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  orderSummaryArrow: {
    fontSize: 18,
    color: '#A3A3A3',
    fontWeight: '600',
  },
  earningsPreview: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  earningsLabel: {
    fontSize: 14,
    color: '#525252',
  },
  earningsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
  },
  earningsTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 8,
    marginBottom: 0,
  },
  earningsTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
  },
  earningsTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  advanceButton: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  advanceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  noDelivery: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noDeliveryIcon: {
    fontSize: 18,
    color: '#A3A3A3',
    marginBottom: 16,
  },
  noDeliveryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
  },
  noDeliveryText: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    lineHeight: 20,
  },
});
