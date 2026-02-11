import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { HomeScreenProps } from '../../navigation/types';

// Placeholder data for categories
const CATEGORIES = [
  { id: '1', name: 'Pizza' },
  { id: '2', name: 'Burgers' },
  { id: '3', name: 'Sushi' },
  { id: '4', name: 'Indian' },
  { id: '5', name: 'Chinese' },
  { id: '6', name: 'Mexican' },
];

export const HomeScreen: React.FC<HomeScreenProps<'Home'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with greeting and location */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Deliver to</Text>
            <TouchableOpacity>
              <Text style={styles.locationText}>
                123 Main St {/* TODO: Pull from user address */}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() =>
              navigation.getParent()?.navigate('ProfileTab', {
                screen: 'Profile',
              })
            }
          >
            <Text style={styles.profileButtonText}>P</Text>
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search', {})}
        >
          <Text style={styles.searchPlaceholder}>
            Search restaurants, cuisines, dishes...
          </Text>
        </TouchableOpacity>

        {/* Promotional banner / carousel */}
        <View style={styles.sectionContainer}>
          <View style={styles.bannerPlaceholder}>
            <Text style={styles.placeholderText}>
              Promotional Banner / Carousel
            </Text>
          </View>
        </View>

        {/* Categories horizontal scroll */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            horizontal
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() =>
                  navigation.navigate('RestaurantList', {
                    cuisineType: item.name,
                  })
                }
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryIconText}>
                    {/* TODO: Replace with actual icon */}
                    {item.name[0]}
                  </Text>
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Featured Restaurants */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Restaurants</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RestaurantList', {})}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {/* TODO: Replace with actual restaurant cards from API */}
          {[1, 2, 3].map((i) => (
            <TouchableOpacity
              key={i}
              style={styles.restaurantCard}
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  restaurantId: `restaurant-${i}`,
                })
              }
            >
              <View style={styles.restaurantImage}>
                <Text style={styles.placeholderText}>Restaurant Image</Text>
              </View>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>
                  Restaurant Name {i}
                </Text>
                <Text style={styles.restaurantMeta}>
                  Italian - 4.5 stars - 25-35 min - $$
                </Text>
                <Text style={styles.restaurantDelivery}>Free delivery</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby Restaurants */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RestaurantList', {})}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {/* TODO: Replace with actual nearby restaurant list */}
          <Text style={styles.emptyText}>
            Loading nearby restaurants...
          </Text>
        </View>

        {/* Recent Orders / Reorder */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Again</Text>
          {/* TODO: Show recent order items for quick reorder */}
          <Text style={styles.emptyText}>
            Your recent orders will appear here
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greeting: {
    fontSize: 13,
    color: '#93959F',
    fontWeight: '500',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E23744',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: '#93959F',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '600',
    marginBottom: 12,
  },
  bannerPlaceholder: {
    height: 160,
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#93959F',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E23744',
  },
  categoryName: {
    fontSize: 13,
    color: '#1C1C1C',
    fontWeight: '500',
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
    height: 160,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
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
  restaurantMeta: {
    fontSize: 13,
    color: '#93959F',
    marginBottom: 4,
  },
  restaurantDelivery: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: '#93959F',
    textAlign: 'center',
    paddingVertical: 24,
  },
});
