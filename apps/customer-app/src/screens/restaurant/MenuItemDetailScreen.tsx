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

export const MenuItemDetailScreen: React.FC<
  HomeScreenProps<'MenuItemDetail'>
> = ({ navigation, route }) => {
  const { restaurantId, menuItemId, menuItemName } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // TODO: Fetch menu item details from restaurantService

  const handleAddToCart = (): void => {
    // TODO: Add item to cart via cartStore
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Item image */}
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>Menu Item Image</Text>
        </View>

        {/* Item name and description */}
        <View style={styles.infoSection}>
          <Text style={styles.itemName}>{menuItemName}</Text>
          <Text style={styles.itemDescription}>
            A detailed description of this delicious menu item with all its
            ingredients and preparation method.
          </Text>
          <Text style={styles.itemPrice}>$12.99</Text>
        </View>

        {/* Dietary info / allergens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Information</Text>
          <View style={styles.tagRow}>
            {/* TODO: Show actual dietary tags */}
            <View style={styles.dietTag}>
              <Text style={styles.dietTagText}>Vegetarian</Text>
            </View>
            <View style={styles.dietTag}>
              <Text style={styles.dietTagText}>Gluten-Free</Text>
            </View>
          </View>
        </View>

        {/* Modifier groups (e.g., Size, Toppings, Extras) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size (Required)</Text>
          {/* TODO: Render modifier groups dynamically */}
          {['Small', 'Medium', 'Large'].map((size) => (
            <TouchableOpacity key={size} style={styles.modifierOption}>
              <View style={styles.radioOuter}>
                <View
                  style={size === 'Medium' ? styles.radioInner : undefined}
                />
              </View>
              <Text style={styles.modifierName}>{size}</Text>
              <Text style={styles.modifierPrice}>
                {size === 'Small' ? '' : size === 'Medium' ? '+$2.00' : '+$4.00'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extra Toppings (Optional)</Text>
          {/* TODO: Render checkbox modifiers dynamically */}
          {['Extra Cheese', 'Mushrooms', 'Olives', 'Peppers'].map((topping) => (
            <TouchableOpacity key={topping} style={styles.modifierOption}>
              <View style={styles.checkbox} />
              <Text style={styles.modifierName}>{topping}</Text>
              <Text style={styles.modifierPrice}>+$1.50</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="Any allergies or preferences? Let us know..."
            placeholderTextColor="#93959F"
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Nutrition info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Info</Text>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Calories</Text>
            <Text style={styles.nutritionValue}>450 kcal</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Prep Time</Text>
            <Text style={styles.nutritionValue}>15-20 min</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar: quantity selector + add to cart */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            Add to Cart - ${(12.99 * quantity).toFixed(2)}
          </Text>
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
  imageContainer: {
    height: 260,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 14,
    color: '#93959F',
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#93959F',
    lineHeight: 22,
    marginBottom: 12,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E23744',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dietTagText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  modifierOption: {
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
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
  },
  modifierName: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1C',
  },
  modifierPrice: {
    fontSize: 14,
    color: '#93959F',
    fontWeight: '500',
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1C1C1C',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#93959F',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E23744',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
