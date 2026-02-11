import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { HomeScreenProps } from '../../navigation/types';

type SortOption = 'relevance' | 'rating' | 'delivery_time' | 'distance';
type FilterOption = 'all' | 'free_delivery' | 'offers' | 'open_now';

interface RestaurantListItem {
  id: string;
  name: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  priceRange: number;
  imageUrl?: string;
}

export const RestaurantListScreen: React.FC<
  HomeScreenProps<'RestaurantList'>
> = ({ navigation, route }) => {
  const category = route.params?.category;
  const cuisineType = route.params?.cuisineType;

  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [restaurants] = useState<RestaurantListItem[]>([]);

  const SORT_OPTIONS: { key: SortOption; label: string }[] = [
    { key: 'relevance', label: 'Relevance' },
    { key: 'rating', label: 'Rating' },
    { key: 'delivery_time', label: 'Delivery Time' },
    { key: 'distance', label: 'Distance' },
  ];

  const FILTER_OPTIONS: { key: FilterOption; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'free_delivery', label: 'Free Delivery' },
    { key: 'offers', label: 'Offers' },
    { key: 'open_now', label: 'Open Now' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Category / cuisine header */}
      {(category || cuisineType) && (
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>
            {category ?? cuisineType} Restaurants
          </Text>
        </View>
      )}

      {/* Sort options */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={SORT_OPTIONS}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                sortBy === item.key && styles.filterChipActive,
              ]}
              onPress={() => setSortBy(item.key)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  sortBy === item.key && styles.filterChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Filter options */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={FILTER_OPTIONS}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                filter === item.key && styles.filterChipActive,
              ]}
              onPress={() => setFilter(item.key)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filter === item.key && styles.filterChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Restaurant list */}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No restaurants found</Text>
            <Text style={styles.emptySubtitle}>
              Try changing your filters or search for something else
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.restaurantCard}
            onPress={() =>
              navigation.navigate('RestaurantDetail', {
                restaurantId: item.id,
              })
            }
          >
            {/* Restaurant image */}
            <View style={styles.restaurantImage}>
              <Text style={styles.imagePlaceholder}>Image</Text>
            </View>

            {/* Restaurant info */}
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantCuisine}>
                {item.cuisineTypes.join(' - ')}
              </Text>
              <View style={styles.restaurantMeta}>
                <Text style={styles.metaText}>
                  {item.rating} stars
                </Text>
                <Text style={styles.metaDot}> -- </Text>
                <Text style={styles.metaText}>{item.deliveryTime}</Text>
                <Text style={styles.metaDot}> -- </Text>
                <Text style={styles.metaText}>{item.deliveryFee}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoryHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  filtersContainer: {
    paddingVertical: 8,
  },
  filtersList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  filterChipActive: {
    backgroundColor: '#FFF0F0',
    borderColor: '#E23744',
  },
  filterChipText: {
    fontSize: 13,
    color: '#93959F',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#E23744',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  restaurantCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  restaurantImage: {
    height: 150,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 14,
    color: '#93959F',
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 13,
    color: '#93959F',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#93959F',
  },
  metaDot: {
    fontSize: 13,
    color: '#E0E0E0',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#93959F',
    textAlign: 'center',
    lineHeight: 20,
  },
});
