import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewsScreenProps } from '../../navigation/types';

type FilterType = 'all' | '5' | '4' | '3' | '2' | '1';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  replied: boolean;
  orderNumber: string;
}

const PLACEHOLDER_REVIEWS: Review[] = [
  {
    id: '1',
    customerName: 'Emma W.',
    rating: 5,
    comment: 'Amazing butter chicken! Best in town. Will definitely order again.',
    date: '2 hours ago',
    replied: false,
    orderNumber: '#1038',
  },
  {
    id: '2',
    customerName: 'James L.',
    rating: 4,
    comment: 'Great food but delivery was a bit slow. Otherwise perfect.',
    date: '1 day ago',
    replied: true,
    orderNumber: '#1035',
  },
  {
    id: '3',
    customerName: 'Sarah K.',
    rating: 3,
    comment: 'Food was okay. Expected more spice in the curry.',
    date: '2 days ago',
    replied: false,
    orderNumber: '#1030',
  },
  {
    id: '4',
    customerName: 'Mike T.',
    rating: 5,
    comment: 'Outstanding quality and portion sizes. Highly recommend!',
    date: '3 days ago',
    replied: true,
    orderNumber: '#1025',
  },
];

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: '5', label: '5 Stars' },
  { key: '4', label: '4 Stars' },
  { key: '3', label: '3 Stars' },
  { key: '2', label: '2 Stars' },
  { key: '1', label: '1 Star' },
];

export const ReviewsScreen: React.FC<ReviewsScreenProps<'ReviewsList'>> = ({
  navigation,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredReviews = activeFilter === 'all'
    ? PLACEHOLDER_REVIEWS
    : PLACEHOLDER_REVIEWS.filter(
        (r) => r.rating === parseInt(activeFilter, 10),
      );

  const renderStars = (rating: number): string => {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < rating ? '\u2605' : '\u2606'))
      .join('');
  };

  const renderReview = ({ item }: { item: Review }): React.ReactElement => (
    <TouchableOpacity
      style={styles.reviewCard}
      onPress={() =>
        navigation.navigate('ReviewDetail', { reviewId: item.id })
      }
    >
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <View style={styles.reviewerAvatar}>
            <Text style={styles.reviewerInitial}>
              {item.customerName.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.reviewerName}>{item.customerName}</Text>
            <Text style={styles.reviewOrder}>Order {item.orderNumber}</Text>
          </View>
        </View>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>

      <Text style={styles.reviewStars}>{renderStars(item.rating)}</Text>
      <Text style={styles.reviewComment} numberOfLines={2}>
        {item.comment}
      </Text>

      <View style={styles.reviewFooter}>
        {item.replied ? (
          <View style={styles.repliedBadge}>
            <Text style={styles.repliedText}>Replied</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.replyButton}>
            <Text style={styles.replyButtonText}>Reply</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Rating Overview */}
      <View style={styles.ratingOverview}>
        <View style={styles.ratingMain}>
          <Text style={styles.ratingValue}>4.5</Text>
          <Text style={styles.ratingStars}>{renderStars(4)}</Text>
          <Text style={styles.ratingCount}>
            {PLACEHOLDER_REVIEWS.length} reviews
          </Text>
        </View>
        <View style={styles.ratingBars}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = PLACEHOLDER_REVIEWS.filter(
              (r) => r.rating === star,
            ).length;
            const percentage =
              PLACEHOLDER_REVIEWS.length > 0
                ? (count / PLACEHOLDER_REVIEWS.length) * 100
                : 0;
            return (
              <View key={star} style={styles.ratingBarRow}>
                <Text style={styles.ratingBarLabel}>{star}</Text>
                <View style={styles.ratingBarContainer}>
                  <View
                    style={[
                      styles.ratingBar,
                      { width: `${percentage}%` },
                    ]}
                  />
                </View>
                <Text style={styles.ratingBarCount}>{count}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Filter */}
      <FlatList
        horizontal
        data={FILTERS}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === item.key && styles.activeFilterChip,
            ]}
            onPress={() => setActiveFilter(item.key)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === item.key && styles.activeFilterText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.filterList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Reviews List */}
      <FlatList
        data={filteredReviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No reviews with this rating</Text>
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
  ratingOverview: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    gap: 20,
  },
  ratingMain: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  ratingValue: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  ratingStars: {
    fontSize: 16,
    color: '#FFB800',
    marginVertical: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: '#8E8E93',
  },
  ratingBars: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    width: 12,
    textAlign: 'center',
  },
  ratingBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 3,
  },
  ratingBar: {
    height: 6,
    backgroundColor: '#FFB800',
    borderRadius: 3,
  },
  ratingBarCount: {
    fontSize: 12,
    color: '#8E8E93',
    width: 16,
    textAlign: 'right',
  },
  filterList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  activeFilterChip: {
    backgroundColor: '#E23744',
    borderColor: '#E23744',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636366',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  reviewsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewerInitial: {
    fontSize: 16,
    fontWeight: '600',
    color: '#636366',
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  reviewOrder: {
    fontSize: 12,
    color: '#8E8E93',
  },
  reviewDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  reviewStars: {
    fontSize: 16,
    color: '#FFB800',
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 14,
    color: '#3A3A3C',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  repliedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
  },
  repliedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  replyButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E23744',
  },
  replyButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
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
