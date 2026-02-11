import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewsScreenProps } from '../../navigation/types';

export const ReviewDetailScreen: React.FC<ReviewsScreenProps<'ReviewDetail'>> = ({
  route,
}) => {
  const { reviewId } = route.params;
  const [replyText, setReplyText] = useState('');

  const renderStars = (rating: number): string => {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < rating ? '\u2605' : '\u2606'))
      .join('');
  };

  const handleSendReply = (): void => {
    // TODO: Send reply to Firestore
    setReplyText('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Review Header */}
        <View style={styles.reviewHeader}>
          <View style={styles.reviewerAvatar}>
            <Text style={styles.reviewerInitial}>E</Text>
          </View>
          <Text style={styles.reviewerName}>Emma W.</Text>
          <Text style={styles.reviewStars}>{renderStars(5)}</Text>
          <Text style={styles.reviewDate}>2 hours ago</Text>
        </View>

        {/* Review Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review</Text>
          <Text style={styles.reviewText}>
            Amazing butter chicken! Best in town. Will definitely order again.
            The naan was perfectly crispy and the portions were generous.
          </Text>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Number</Text>
            <Text style={styles.infoValue}>#1038</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Date</Text>
            <Text style={styles.infoValue}>Feb 9, 2026</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Items Ordered</Text>
            <Text style={styles.infoValue}>
              Butter Chicken, Garlic Naan x2
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total</Text>
            <Text style={styles.infoValue}>$21.00</Text>
          </View>
        </View>

        {/* Owner Reply Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Reply</Text>
          <Text style={styles.replyHint}>
            Responding to reviews helps build customer loyalty and shows you
            care about feedback.
          </Text>
          <TextInput
            style={styles.replyInput}
            placeholder="Write your reply..."
            placeholderTextColor="#8E8E93"
            value={replyText}
            onChangeText={setReplyText}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !replyText && styles.sendButtonDisabled,
            ]}
            onPress={handleSendReply}
            disabled={!replyText}
          >
            <Text style={styles.sendButtonText}>Send Reply</Text>
          </TouchableOpacity>
        </View>

        {/* Review ID (debug) */}
        <Text style={styles.reviewIdText}>Review ID: {reviewId}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingBottom: 40,
  },
  reviewHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  reviewerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: '#636366',
  },
  reviewerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  reviewStars: {
    fontSize: 24,
    color: '#FFB800',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 15,
    color: '#3A3A3C',
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
    maxWidth: '60%',
    textAlign: 'right',
  },
  replyHint: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 12,
  },
  replyInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 15,
    color: '#1C1C1E',
    backgroundColor: '#F9F9F9',
    marginBottom: 16,
  },
  sendButton: {
    height: 48,
    backgroundColor: '#E23744',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reviewIdText: {
    fontSize: 11,
    color: '#C7C7CC',
    textAlign: 'center',
    marginTop: 24,
  },
});
