import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { EarningsScreenProps } from '../../navigation/types';

type EarningsPeriod = 'today' | 'week' | 'month';

interface EarningsSummary {
  totalEarnings: number;
  deliveryFees: number;
  tips: number;
  bonuses: number;
  deliveryCount: number;
  hoursOnline: number;
}

const PLACEHOLDER_EARNINGS: Record<EarningsPeriod, EarningsSummary> = {
  today: {
    totalEarnings: 0,
    deliveryFees: 0,
    tips: 0,
    bonuses: 0,
    deliveryCount: 0,
    hoursOnline: 0,
  },
  week: {
    totalEarnings: 0,
    deliveryFees: 0,
    tips: 0,
    bonuses: 0,
    deliveryCount: 0,
    hoursOnline: 0,
  },
  month: {
    totalEarnings: 0,
    deliveryFees: 0,
    tips: 0,
    bonuses: 0,
    deliveryCount: 0,
    hoursOnline: 0,
  },
};

export const EarningsScreen: React.FC<EarningsScreenProps<'Earnings'>> = ({
  navigation,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<EarningsPeriod>('today');
  const earnings = PLACEHOLDER_EARNINGS[selectedPeriod];

  const handleViewDetail = (): void => {
    const periodMap: Record<EarningsPeriod, 'daily' | 'weekly' | 'monthly'> = {
      today: 'daily',
      week: 'weekly',
      month: 'monthly',
    };
    navigation.navigate('EarningsDetail', {
      period: periodMap[selectedPeriod],
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Earnings</Text>
        </View>

        {/* Period Tabs */}
        <View style={styles.periodTabs}>
          {(
            [
              { key: 'today', label: 'Today' },
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
            ] as const
          ).map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.periodTab,
                selectedPeriod === tab.key && styles.periodTabActive,
              ]}
              onPress={() => setSelectedPeriod(tab.key)}
            >
              <Text
                style={[
                  styles.periodTabText,
                  selectedPeriod === tab.key && styles.periodTabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Total Earnings Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Earnings</Text>
          <Text style={styles.totalAmount}>
            ${earnings.totalEarnings.toFixed(2)}
          </Text>
          <View style={styles.totalSubRow}>
            <Text style={styles.totalSubText}>
              {earnings.deliveryCount} deliveries
            </Text>
            <Text style={styles.totalDivider}>|</Text>
            <Text style={styles.totalSubText}>
              {earnings.hoursOnline.toFixed(1)} hrs online
            </Text>
          </View>
        </View>

        {/* Earnings Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Breakdown</Text>

          <View style={styles.breakdownRow}>
            <View style={styles.breakdownDot}>
              <View style={[styles.dot, { backgroundColor: '#FF6B35' }]} />
            </View>
            <Text style={styles.breakdownLabel}>Delivery Fees</Text>
            <Text style={styles.breakdownValue}>
              ${earnings.deliveryFees.toFixed(2)}
            </Text>
          </View>

          <View style={styles.breakdownRow}>
            <View style={styles.breakdownDot}>
              <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
            </View>
            <Text style={styles.breakdownLabel}>Tips</Text>
            <Text style={styles.breakdownValue}>
              ${earnings.tips.toFixed(2)}
            </Text>
          </View>

          <View style={styles.breakdownRow}>
            <View style={styles.breakdownDot}>
              <View style={[styles.dot, { backgroundColor: '#3B82F6' }]} />
            </View>
            <Text style={styles.breakdownLabel}>Bonuses</Text>
            <Text style={styles.breakdownValue}>
              ${earnings.bonuses.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Chart Placeholder */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartPlaceholderText}>[Earnings Chart]</Text>
          <Text style={styles.chartSubtext}>
            Visual breakdown of earnings over time
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{earnings.deliveryCount}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              ${earnings.deliveryCount > 0
                ? (earnings.totalEarnings / earnings.deliveryCount).toFixed(2)
                : '0.00'}
            </Text>
            <Text style={styles.statLabel}>Avg per Delivery</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              ${earnings.hoursOnline > 0
                ? (earnings.totalEarnings / earnings.hoursOnline).toFixed(2)
                : '0.00'}
            </Text>
            <Text style={styles.statLabel}>Avg per Hour</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {earnings.hoursOnline.toFixed(1)}h
            </Text>
            <Text style={styles.statLabel}>Hours Online</Text>
          </View>
        </View>

        {/* View Details Button */}
        <TouchableOpacity style={styles.detailButton} onPress={handleViewDetail}>
          <Text style={styles.detailButtonText}>View Detailed Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171717',
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  periodTabActive: {
    backgroundColor: '#FFFFFF',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#737373',
  },
  periodTabTextActive: {
    color: '#171717',
    fontWeight: '700',
  },
  totalCard: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFE6D9',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  totalSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalSubText: {
    fontSize: 13,
    color: '#FFCBB3',
  },
  totalDivider: {
    color: '#FFB08C',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  breakdownDot: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  breakdownLabel: {
    flex: 1,
    fontSize: 14,
    color: '#525252',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
  },
  chartPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  chartPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A3A3A3',
  },
  chartSubtext: {
    fontSize: 12,
    color: '#D4D4D4',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#737373',
    fontWeight: '500',
  },
  detailButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
});
