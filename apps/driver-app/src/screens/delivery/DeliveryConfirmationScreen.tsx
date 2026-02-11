import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeliveryStore } from '../../stores/deliveryStore';
import type { DeliveryScreenProps } from '../../navigation/types';

type DeliveryMethod = 'handed' | 'doorstep' | 'lobby';

export const DeliveryConfirmationScreen: React.FC<
  DeliveryScreenProps<'DeliveryConfirmation'>
> = ({ route, navigation }) => {
  const { deliveryId } = route.params;
  const { currentDelivery, completeDelivery } = useDeliveryStore();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('handed');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleTakePhoto = (): void => {
    // TODO: Implement camera for proof of delivery
    setPhotoTaken(true);
    console.log('Take proof of delivery photo');
  };

  const handleConfirmDelivery = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await completeDelivery(deliveryId, {
        note: note.trim() || undefined,
        // TODO: Add photoUrl and signatureUrl
      });
      // Navigate back to home after completion
      navigation.getParent()?.navigate('HomeTab', { screen: 'Home' });
    } catch (err) {
      console.error('Failed to confirm delivery:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Confirm Delivery</Text>
          <Text style={styles.subtitle}>
            Verify that the order has been delivered successfully.
          </Text>
        </View>

        {/* Delivery Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How was the order delivered?</Text>
          <View style={styles.methodOptions}>
            {(
              [
                { value: 'handed', label: 'Handed to Customer', icon: '[Hand]' },
                { value: 'doorstep', label: 'Left at Doorstep', icon: '[Door]' },
                { value: 'lobby', label: 'Left in Lobby', icon: '[Lobby]' },
              ] as const
            ).map((method) => (
              <TouchableOpacity
                key={method.value}
                style={[
                  styles.methodOption,
                  deliveryMethod === method.value && styles.methodOptionSelected,
                ]}
                onPress={() => setDeliveryMethod(method.value)}
              >
                <Text
                  style={[
                    styles.methodIcon,
                    deliveryMethod === method.value && styles.methodIconSelected,
                  ]}
                >
                  {method.icon}
                </Text>
                <Text
                  style={[
                    styles.methodLabel,
                    deliveryMethod === method.value && styles.methodLabelSelected,
                  ]}
                >
                  {method.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Photo Proof */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo Proof</Text>
          <TouchableOpacity
            style={[styles.photoButton, photoTaken && styles.photoButtonTaken]}
            onPress={handleTakePhoto}
          >
            {photoTaken ? (
              <>
                <Text style={styles.photoTakenIcon}>[Photo Taken]</Text>
                <Text style={styles.photoTakenText}>Photo captured</Text>
                <Text style={styles.photoRetakeText}>Tap to retake</Text>
              </>
            ) : (
              <>
                <Text style={styles.cameraIcon}>[Camera]</Text>
                <Text style={styles.photoText}>Take Photo</Text>
                <Text style={styles.photoSubtext}>
                  {deliveryMethod === 'handed'
                    ? 'Optional for hand-off delivery'
                    : 'Required for contactless delivery'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Delivery Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Note (Optional)</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="Add any notes about the delivery..."
            placeholderTextColor="#A3A3A3"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Order Summary */}
        {currentDelivery && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Delivery Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Order</Text>
              <Text style={styles.summaryValue}>
                #{currentDelivery.orderNumber}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Customer</Text>
              <Text style={styles.summaryValue}>
                {currentDelivery.customerName}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Distance</Text>
              <Text style={styles.summaryValue}>
                {currentDelivery.distance.toFixed(1)} {currentDelivery.distanceUnit}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>Your Earnings</Text>
              <Text style={styles.summaryTotalValue}>
                ${currentDelivery.totalEarnings.amount.toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]}
          onPress={handleConfirmDelivery}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
          )}
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#525252',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 10,
  },
  methodOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  methodOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  methodOptionSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F0',
  },
  methodIcon: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 6,
  },
  methodIconSelected: {
    color: '#FF6B35',
  },
  methodLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#525252',
    textAlign: 'center',
  },
  methodLabelSelected: {
    color: '#FF6B35',
  },
  photoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  photoButtonTaken: {
    borderColor: '#22C55E',
    borderStyle: 'solid',
    backgroundColor: '#F0FDF4',
  },
  cameraIcon: {
    fontSize: 16,
    color: '#FF6B35',
    marginBottom: 8,
  },
  photoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },
  photoSubtext: {
    fontSize: 12,
    color: '#737373',
  },
  photoTakenIcon: {
    fontSize: 16,
    color: '#22C55E',
    marginBottom: 8,
  },
  photoTakenText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#15803D',
    marginBottom: 4,
  },
  photoRetakeText: {
    fontSize: 12,
    color: '#16A34A',
  },
  noteInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    padding: 14,
    fontSize: 14,
    color: '#171717',
    minHeight: 80,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#525252',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#171717',
  },
  summaryTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 10,
    marginTop: 4,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  confirmButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
