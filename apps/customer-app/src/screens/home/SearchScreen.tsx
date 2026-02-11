import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { HomeScreenProps } from '../../navigation/types';

// Placeholder popular searches
const POPULAR_SEARCHES = [
  'Pizza',
  'Sushi',
  'Burger',
  'Tacos',
  'Thai',
  'Pasta',
  'Salad',
  'Dessert',
];

interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'dish';
  subtitle: string;
}

export const SearchScreen: React.FC<HomeScreenProps<'Search'>> = ({
  navigation,
  route,
}) => {
  const [query, setQuery] = useState(route.params?.query ?? '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches] = useState<string[]>([
    'Italian restaurants',
    'Best pizza near me',
  ]);

  const handleSearch = (searchQuery: string): void => {
    setQuery(searchQuery);
    // TODO: Implement search via restaurantService
    setResults([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants, cuisines, dishes..."
          placeholderTextColor="#93959F"
          value={query}
          onChangeText={handleSearch}
          autoFocus
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {query.length === 0 ? (
        <FlatList
          ListHeaderComponent={
            <>
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  {recentSearches.map((search, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.recentItem}
                      onPress={() => handleSearch(search)}
                    >
                      <Text style={styles.recentItemText}>{search}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Popular searches */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Searches</Text>
              </View>
            </>
          }
          data={POPULAR_SEARCHES}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.tagRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tagItem}
              onPress={() => handleSearch(item)}
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {/* TODO: Replace with search icon */}
                No results found
              </Text>
              <Text style={styles.emptySubtitle}>
                Try a different search term or browse categories
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                if (item.type === 'restaurant') {
                  navigation.navigate('RestaurantDetail', {
                    restaurantId: item.id,
                  });
                }
              }}
            >
              <View style={styles.resultIcon}>
                <Text style={styles.resultIconText}>
                  {item.type === 'restaurant' ? 'R' : 'D'}
                </Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1C1C',
  },
  clearText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '500',
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  recentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentItemText: {
    fontSize: 15,
    color: '#1C1C1C',
  },
  tagRow: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  tagItem: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tagText: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '500',
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
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultIconText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E23744',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 13,
    color: '#93959F',
  },
});
