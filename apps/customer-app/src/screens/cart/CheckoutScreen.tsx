import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import type { HomeScreenProps } from '../../navigation/types';
import type { OrderType, PaymentMethod } from '@restaurants/types';

export const CheckoutScreen: React.FC<HomeScreenProps<'Checkout'>> = ({
  navigation,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [tip, setTip] = useState<number>(0);
  const [promoCode, setPromoCode] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const handlePlaceOrder = (): void => {
    // TODO: Create order via orderService
    // TODO: Navigate to OrderTracking after successful order
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery / Pickup toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Type</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                orderType === 'delivery' && styles.toggleActive,
              ]}
              onPress={() => setOrderType('delivery')}
            >
              <Text
                style={[
                  styles.toggleText,
                  orderType === 'delivery' && styles.toggleTextActive,
                ]}
              >
                Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                orderType === 'pickup' && styles.toggleActive,
              ]}
              onPress={() => setOrderType('pickup')}
            >
              <Text
                style={[
                  styles.toggleText,
                  orderType === 'pickup' && styles.toggleTextActive,
                ]}
              >
                Pickup
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery address */}
        {orderType === 'delivery' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity style={styles.addressCard}>
              <Text style={styles.addressLabel}>Home</Text>
              <Text style={styles.addressText}>
                123 Main St, Apt 4B, City, ST 12345
              </Text>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>

            {/* Delivery instructions */}
            <TextInput
              style={styles.instructionsInput}
              placeholder="Delivery instructions (optional)"
              placeholderTextColor="#93959F"
              value={deliveryInstructions}
              onChangeText={setDeliveryInstructions}
              multiline
            />
          </View>
        )}

        {/* Estimated time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Time</Text>
          <Text style={styles.estimateText}>
            {orderType === 'delivery' ? '25-35 min' : '15-20 min'}
          </Text>
          {/* TODO: Add scheduled order option */}
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {(
            [
              { key: 'card', label: 'Credit / Debit Card', sub: 'Visa **** 1234' },
              { key: 'apple_pay', label: 'Apple Pay', sub: '' },
              { key: 'google_pay', label: 'Google Pay', sub: '' },
              { key: 'cash', label: 'Cash on Delivery', sub: '' },
            ] as { key: PaymentMethod; label: string; sub: string }[]
          ).map((method) => (
            <TouchableOpacity
              key={method.key}
              style={styles.paymentOption}
              onPress={() => setPaymentMethod(method.key)}
            >
              <View style={styles.radioOuter}>
                {paymentMethod === method.key && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentLabel}>{method.label}</Text>
                {method.sub ? (
                  <Text style={styles.paymentSub}>{method.sub}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tip selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add a Tip</Text>
          <View style={styles.tipRow}>
            {[0, 2, 3, 5].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.tipOption,
                  tip === amount && styles.tipOptionActive,
                ]}
                onPress={() => setTip(amount)}
              >
                <Text
                  style={[
                    styles.tipText,
                    tip === amount && styles.tipTextActive,
                  ]}
                >
                  {amount === 0 ? 'None' : `$${amount}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoRow}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              placeholderTextColor="#93959F"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order total summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Total</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$25.98</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>
              {orderType === 'delivery' ? '$2.99' : 'Free'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>$2.08</Text>
          </View>
          {tip > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tip</Text>
              <Text style={styles.summaryValue}>${tip.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${(25.98 + (orderType === 'delivery' ? 2.99 : 0) + 2.08 + tip).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Place order button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#93959F',
  },
  toggleTextActive: {
    color: '#E23744',
  },
  addressCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#93959F',
    marginBottom: 8,
  },
  changeText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '600',
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1C1C1C',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  estimateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E23744',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  paymentSub: {
    fontSize: 13,
    color: '#93959F',
    marginTop: 2,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  tipOptionActive: {
    backgroundColor: '#FFF0F0',
    borderColor: '#E23744',
  },
  tipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#93959F',
  },
  tipTextActive: {
    color: '#E23744',
  },
  promoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1C1C1C',
  },
  applyButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  placeOrderButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
