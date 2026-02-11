import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { ProfileScreenProps } from '../../navigation/types';

interface FavoriteRestaurant {
  id: string;
  name: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: string;
  imageUrl?: string;
}

export const FavoritesScreen: React.FC<ProfileScreenProps<'Favorites'>> = () => {
  const [favorites] = useState<FavoriteRestaurant[]>([]);

  // TODO: Fetch favorite restaurants from user profile

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>Fav</Text>
            </View>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Save your favorite restaurants for quick access
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.restaurantCard}>
            {/* Restaurant image */}
            <View style={styles.restaurantImage}>
              <Text style={styles.imagePlaceholder}>Image</Text>
            </View>

            {/* Restaurant info */}
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.cuisineText}>
                {item.cuisineTypes.join(' - ')}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.ratingText}>{item.rating} stars</Text>
                <Text style={styles.dotSeparator}> -- </Text>
                <Text style={styles.deliveryText}>{item.deliveryTime}</Text>
              </View>
            </View>

            {/* Remove favorite button */}
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
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
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 64,
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
    fontSize: 14,
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
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  restaurantImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imagePlaceholder: {
    fontSize: 12,
    color: '#93959F',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  cuisineText: {
    fontSize: 13,
    color: '#93959F',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: '#1C1C1C',
    fontWeight: '500',
  },
  dotSeparator: {
    fontSize: 13,
    color: '#E0E0E0',
  },
  deliveryText: {
    fontSize: 13,
    color: '#93959F',
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  removeText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '500',
  },
});
