import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
} from 'react-native';
import type { HomeScreenProps } from '../../navigation/types';
import { useCartStore } from '../../stores/cartStore';

interface MenuSectionData {
  title: string;
  data: MenuListItem[];
}

interface MenuListItem {
  id: string;
  name: string;
  description: string;
  price: string;
  isPopular: boolean;
  isAvailable: boolean;
}

// Placeholder menu data
const MENU_SECTIONS: MenuSectionData[] = [
  {
    title: 'Popular Items',
    data: [
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Fresh tomato, mozzarella, basil',
        price: '$12.99',
        isPopular: true,
        isAvailable: true,
      },
    ],
  },
  {
    title: 'Appetizers',
    data: [
      {
        id: '2',
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        price: '$5.99',
        isPopular: false,
        isAvailable: true,
      },
    ],
  },
];

export const MenuScreen: React.FC<HomeScreenProps<'Menu'>> = ({
  navigation,
  route,
}) => {
  const { restaurantId, restaurantName } = route.params;
  const [activeCategory, setActiveCategory] = useState(0);
  const cartItemCount = useCartStore((state) => state.items.length);

  // TODO: Fetch menu from restaurantService using restaurantId

  return (
    <SafeAreaView style={styles.container}>
      {/* Category tabs / horizontal scroll */}
      <View style={styles.categoryTabs}>
        {MENU_SECTIONS.map((section, index) => (
          <TouchableOpacity
            key={section.title}
            style={[
              styles.categoryTab,
              activeCategory === index && styles.categoryTabActive,
            ]}
            onPress={() => setActiveCategory(index)}
          >
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === index && styles.categoryTabTextActive,
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu items list */}
      <SectionList
        sections={MENU_SECTIONS}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.menuItem,
              !item.isAvailable && styles.menuItemUnavailable,
            ]}
            disabled={!item.isAvailable}
            onPress={() =>
              navigation.navigate('MenuItemDetail', {
                restaurantId,
                menuItemId: item.id,
                menuItemName: item.name,
              })
            }
          >
            <View style={styles.menuItemInfo}>
              {item.isPopular && (
                <Text style={styles.popularBadge}>Popular</Text>
              )}
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>{item.price}</Text>
              {!item.isAvailable && (
                <Text style={styles.unavailableText}>Currently unavailable</Text>
              )}
            </View>
            <View style={styles.menuItemImage}>
              <Text style={styles.imagePlaceholder}>Img</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating cart button */}
      {cartItemCount > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>
            View Cart ({cartItemCount} items)
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryTabActive: {
    backgroundColor: '#FFF0F0',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#93959F',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#E23744',
    fontWeight: '600',
  },
  sectionHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemUnavailable: {
    opacity: 0.5,
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 12,
  },
  popularBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E23744',
    backgroundColor: '#FFF0F0',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#93959F',
    lineHeight: 18,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  unavailableText: {
    fontSize: 12,
    color: '#E23744',
    marginTop: 4,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 12,
    color: '#93959F',
  },
  cartButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#E23744',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
