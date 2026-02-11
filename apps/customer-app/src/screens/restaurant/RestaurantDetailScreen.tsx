import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import type { HomeScreenProps } from '../../navigation/types';

export const RestaurantDetailScreen: React.FC<
  HomeScreenProps<'RestaurantDetail'>
> = ({ navigation, route }) => {
  const { restaurantId } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  // TODO: Fetch restaurant data from restaurantService using restaurantId

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover image with back button and favorite */}
        <View style={styles.coverImage}>
          <Text style={styles.imagePlaceholder}>Restaurant Cover Image</Text>
          <View style={styles.coverOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Text style={styles.favoriteButtonText}>
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Restaurant name and basic info */}
        <View style={styles.infoSection}>
          <Text style={styles.restaurantName}>Restaurant Name</Text>
          <Text style={styles.cuisineText}>Italian, Pizza, Pasta</Text>
          <View style={styles.metaRow}>
            <Text style={styles.ratingText}>4.5 (200+ ratings)</Text>
            <Text style={styles.dotSeparator}> -- </Text>
            <Text style={styles.distanceText}>1.2 mi</Text>
          </View>
        </View>

        {/* Delivery / Pickup info */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryOption}>
            <Text style={styles.deliveryLabel}>Delivery</Text>
            <Text style={styles.deliveryValue}>25-35 min</Text>
            <Text style={styles.deliveryFee}>$2.99 fee</Text>
          </View>
          <View style={styles.deliveryDivider} />
          <View style={styles.deliveryOption}>
            <Text style={styles.deliveryLabel}>Pickup</Text>
            <Text style={styles.deliveryValue}>15-20 min</Text>
            <Text style={styles.deliveryFee}>Free</Text>
          </View>
        </View>

        {/* Operating hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours</Text>
          <Text style={styles.hoursText}>Open now - Closes at 10:00 PM</Text>
          {/* TODO: Show full hours schedule */}
        </View>

        {/* Address / Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.addressText}>123 Main Street, City, ST 12345</Text>
          {/* TODO: Add map view placeholder */}
        </View>

        {/* View Menu button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            navigation.navigate('Menu', {
              restaurantId,
              restaurantName: 'Restaurant Name',
            })
          }
        >
          <Text style={styles.menuButtonText}>View Full Menu</Text>
        </TouchableOpacity>

        {/* Reviews section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Text style={styles.reviewCount}>200+ reviews</Text>
          </View>
          {/* TODO: Show recent reviews */}
          <Text style={styles.emptyText}>Reviews will appear here</Text>
        </View>

        {/* Similar restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Similar Restaurants</Text>
          {/* TODO: Horizontal scroll of similar restaurants */}
          <Text style={styles.emptyText}>
            Similar restaurants will appear here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  coverImage: {
    height: 240,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imagePlaceholder: {
    fontSize: 14,
    color: '#93959F',
  },
  coverOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  favoriteButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  cuisineText: {
    fontSize: 14,
    color: '#93959F',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '600',
  },
  dotSeparator: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  distanceText: {
    fontSize: 14,
    color: '#93959F',
  },
  deliverySection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  deliveryOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  deliveryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  deliveryValue: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '700',
    marginBottom: 2,
  },
  deliveryFee: {
    fontSize: 12,
    color: '#93959F',
  },
  deliveryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#93959F',
    marginBottom: 8,
  },
  hoursText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  menuButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyText: {
    fontSize: 14,
    color: '#93959F',
    textAlign: 'center',
    paddingVertical: 16,
  },
});
