import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import type { ProfileScreenProps } from '../../navigation/types';

interface Reward {
  id: string;
  title: string;
  pointsCost: number;
  description: string;
  isRedeemable: boolean;
}

const PLACEHOLDER_REWARDS: Reward[] = [
  {
    id: '1',
    title: 'Free Delivery',
    pointsCost: 100,
    description: 'Free delivery on your next order',
    isRedeemable: false,
  },
  {
    id: '2',
    title: '$5 Off',
    pointsCost: 200,
    description: '$5 discount on any order',
    isRedeemable: false,
  },
  {
    id: '3',
    title: '$10 Off',
    pointsCost: 400,
    description: '$10 discount on orders over $25',
    isRedeemable: false,
  },
  {
    id: '4',
    title: 'Free Dessert',
    pointsCost: 150,
    description: 'Free dessert item up to $8 value',
    isRedeemable: false,
  },
];

export const LoyaltyScreen: React.FC<ProfileScreenProps<'Loyalty'>> = () => {
  const currentPoints = 0;

  // TODO: Fetch loyalty data from Firestore

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Points balance card */}
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Your Points Balance</Text>
          <Text style={styles.pointsValue}>{currentPoints}</Text>
          <Text style={styles.pointsSubtext}>
            Earn 1 point for every $1 spent
          </Text>
        </View>

        {/* Progress bar to next reward */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Next Reward</Text>
            <Text style={styles.progressMeta}>
              {currentPoints} / 100 points
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((currentPoints / 100) * 100, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Earn {100 - currentPoints} more points to unlock Free Delivery
          </Text>
        </View>

        {/* Available rewards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          {PLACEHOLDER_REWARDS.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDescription}>
                  {reward.description}
                </Text>
                <Text style={styles.rewardPoints}>
                  {reward.pointsCost} points
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.redeemButton,
                  currentPoints < reward.pointsCost &&
                    styles.redeemButtonDisabled,
                ]}
                disabled={currentPoints < reward.pointsCost}
              >
                <Text
                  style={[
                    styles.redeemText,
                    currentPoints < reward.pointsCost &&
                      styles.redeemTextDisabled,
                  ]}
                >
                  Redeem
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Points history */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points History</Text>
          {/* TODO: Show points transaction history */}
          <Text style={styles.emptyText}>
            Your points history will appear here
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
  pointsCard: {
    backgroundColor: '#E23744',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pointsSubtext: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  progressSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  progressMeta: {
    fontSize: 13,
    color: '#93959F',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E23744',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#93959F',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  rewardInfo: {
    flex: 1,
    marginRight: 12,
  },
  rewardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    color: '#93959F',
    marginBottom: 4,
  },
  rewardPoints: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E23744',
  },
  redeemButton: {
    backgroundColor: '#E23744',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  redeemButtonDisabled: {
    backgroundColor: '#F5F5F5',
  },
  redeemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  redeemTextDisabled: {
    color: '#93959F',
  },
  emptyText: {
    fontSize: 14,
    color: '#93959F',
    textAlign: 'center',
    paddingVertical: 24,
  },
});
