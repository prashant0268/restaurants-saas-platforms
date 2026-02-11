import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuScreenProps } from '../../navigation/types';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  available: boolean;
}

interface Category {
  id: string;
  name: string;
  itemCount: number;
}

const PLACEHOLDER_CATEGORIES: Category[] = [
  { id: '1', name: 'Starters', itemCount: 8 },
  { id: '2', name: 'Main Course', itemCount: 12 },
  { id: '3', name: 'Breads', itemCount: 6 },
  { id: '4', name: 'Beverages', itemCount: 5 },
  { id: '5', name: 'Desserts', itemCount: 4 },
];

const PLACEHOLDER_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    price: '$14.00',
    description: 'Tender chicken in creamy tomato sauce',
    category: 'Main Course',
    available: true,
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    price: '$10.00',
    description: 'Grilled cottage cheese with spices',
    category: 'Starters',
    available: true,
  },
  {
    id: '3',
    name: 'Garlic Naan',
    price: '$3.50',
    description: 'Freshly baked bread with garlic',
    category: 'Breads',
    available: false,
  },
  {
    id: '4',
    name: 'Mango Lassi',
    price: '$5.00',
    description: 'Yogurt-based mango smoothie',
    category: 'Beverages',
    available: true,
  },
];

export const MenuManagementScreen: React.FC<MenuScreenProps<'MenuManagement'>> = ({
  navigation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState(PLACEHOLDER_ITEMS);

  const toggleAvailability = (itemId: string): void => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item,
      ),
    );
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const renderCategory = ({ item }: { item: Category }): React.ReactElement => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.name && styles.activeCategoryChip,
      ]}
      onPress={() =>
        setSelectedCategory(
          selectedCategory === item.name ? null : item.name,
        )
      }
    >
      <Text
        style={[
          styles.categoryChipText,
          selectedCategory === item.name && styles.activeCategoryChipText,
        ]}
      >
        {item.name} ({item.itemCount})
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }: { item: MenuItem }): React.ReactElement => (
    <TouchableOpacity
      style={styles.menuItemCard}
      onPress={() =>
        navigation.navigate('EditMenuItem', { itemId: item.id })
      }
    >
      <View style={styles.menuItemImagePlaceholder}>
        <Text style={styles.menuItemImageText}>IMG</Text>
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
      <View style={styles.menuItemActions}>
        <Switch
          value={item.available}
          onValueChange={() => toggleAvailability(item.id)}
          trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
          thumbColor="#FFFFFF"
        />
        <Text style={styles.availabilityText}>
          {item.available ? 'Available' : 'Unavailable'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Top Actions */}
      <View style={styles.topActions}>
        <TouchableOpacity
          style={styles.categoriesButton}
          onPress={() => navigation.navigate('Categories')}
        >
          <Text style={styles.categoriesButtonText}>Manage Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('EditMenuItem', {})}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={PLACEHOLDER_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Menu Items List */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No items in this category</Text>
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
  topActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  categoriesButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E23744',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
  },
  addButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#E23744',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  activeCategoryChip: {
    backgroundColor: '#E23744',
    borderColor: '#E23744',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636366',
  },
  activeCategoryChipText: {
    color: '#FFFFFF',
  },
  menuList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  menuItemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemImageText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  menuItemContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E23744',
    marginTop: 4,
  },
  menuItemActions: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  availabilityText: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 2,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
