import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { HomeScreenProps } from '../../navigation/types';
import { useCartStore } from '../../stores/cartStore';

export const CartScreen: React.FC<HomeScreenProps<'Cart'>> = ({
  navigation,
}) => {
  const { items, restaurantName, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice.amount * item.quantity,
    0,
  );
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <SafeAreaView style={styles.container}>
      {items.length === 0 ? (
        /* Empty cart state */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>Cart</Text>
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add items from a restaurant to get started
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Restaurant name header */}
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Cart items list */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.menuItemId}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {/* Item image */}
                <View style={styles.itemImage}>
                  <Text style={styles.imagePlaceholder}>Img</Text>
                </View>

                {/* Item details */}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.modifiers.length > 0 && (
                    <Text style={styles.itemModifiers}>
                      {item.modifiers.map((m) => m.name).join(', ')}
                    </Text>
                  )}
                  {item.specialInstructions && (
                    <Text style={styles.itemInstructions}>
                      Note: {item.specialInstructions}
                    </Text>
                  )}
                  <Text style={styles.itemPrice}>
                    ${(item.unitPrice.amount * item.quantity).toFixed(2)}
                  </Text>
                </View>

                {/* Quantity controls */}
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => {
                      if (item.quantity <= 1) {
                        removeItem(item.menuItemId);
                      } else {
                        updateQuantity(item.menuItemId, item.quantity - 1);
                      }
                    }}
                  >
                    <Text style={styles.qtyButtonText}>
                      {item.quantity <= 1 ? 'X' : '-'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      updateQuantity(item.menuItemId, item.quantity + 1)
                    }
                  >
                    <Text style={styles.qtyButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Add more items link */}
          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.addMoreText}>+ Add More Items</Text>
          </TouchableOpacity>

          {/* Order summary */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>
                ${deliveryFee.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Checkout button */}
          <View style={styles.checkoutContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>
                Proceed to Checkout - ${total.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
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
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  clearText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imagePlaceholder: {
    fontSize: 12,
    color: '#93959F',
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  itemModifiers: {
    fontSize: 12,
    color: '#93959F',
    marginBottom: 2,
  },
  itemInstructions: {
    fontSize: 12,
    color: '#93959F',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E23744',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginHorizontal: 12,
  },
  addMoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  addMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
  },
  summarySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
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
  checkoutContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  checkoutButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
