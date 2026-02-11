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

export const WriteReviewScreen: React.FC<HomeScreenProps<'WriteReview'>> = ({
  navigation,
  route,
}) => {
  const { restaurantId, orderId } = route.params;
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmitReview = (): void => {
    // TODO: Submit review to Firestore via restaurantService
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Restaurant info */}
        <View style={styles.restaurantSection}>
          <View style={styles.restaurantLogo}>
            <Text style={styles.logoText}>R</Text>
          </View>
          <Text style={styles.restaurantName}>Restaurant Name</Text>
          <Text style={styles.orderInfo}>Order #{orderId}</Text>
        </View>

        {/* Star rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starButton}
                onPress={() => setRating(star)}
              >
                <Text
                  style={[
                    styles.starText,
                    rating >= star && styles.starTextActive,
                  ]}
                >
                  {rating >= star ? 'Filled Star' : 'Empty Star'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>
            {rating === 0
              ? 'Tap a star to rate'
              : rating <= 2
                ? 'Could be better'
                : rating <= 3
                  ? 'It was okay'
                  : rating === 4
                    ? 'Great experience!'
                    : 'Amazing!'}
          </Text>
        </View>

        {/* Review title */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Title (Optional)</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Summarize your experience"
            placeholderTextColor="#93959F"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        {/* Review comment */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Your Review</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Tell others about your experience: food quality, service, delivery..."
            placeholderTextColor="#93959F"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={6}
            maxLength={1000}
          />
          <Text style={styles.charCount}>{comment.length}/1000</Text>
        </View>

        {/* Photo upload */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Add Photos (Optional)</Text>
          <TouchableOpacity style={styles.photoUploadArea}>
            <Text style={styles.photoUploadText}>
              Tap to add photos of your food
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order items rating (optional) */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Rate Individual Items</Text>
          {/* TODO: Show ordered items for individual rating */}
          <Text style={styles.placeholderText}>
            Individual item ratings coming soon
          </Text>
        </View>
      </ScrollView>

      {/* Submit button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (rating === 0 || comment.length === 0) &&
              styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitReview}
          disabled={rating === 0 || comment.length === 0}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
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
  restaurantSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  restaurantLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E23744',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  orderInfo: {
    fontSize: 13,
    color: '#93959F',
  },
  ratingSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  starButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    fontSize: 10,
    color: '#E0E0E0',
    fontWeight: '600',
  },
  starTextActive: {
    color: '#FFB800',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#93959F',
    fontWeight: '500',
  },
  inputSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1C1C1C',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1C1C1C',
    textAlignVertical: 'top',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#93959F',
    textAlign: 'right',
    marginTop: 4,
  },
  photoUploadArea: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  photoUploadText: {
    fontSize: 14,
    color: '#93959F',
  },
  placeholderText: {
    fontSize: 14,
    color: '#93959F',
    textAlign: 'center',
    paddingVertical: 16,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#F5F5F5',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
