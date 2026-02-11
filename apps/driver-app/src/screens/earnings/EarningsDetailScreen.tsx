import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { EarningsScreenProps } from '../../navigation/types';

interface EarningsEntry {
  id: string;
  orderNumber: string;
  restaurantName: string;
  deliveryFee: number;
  tip: number;
  total: number;
  completedAt: string;
}

// Placeholder data
const PLACEHOLDER_ENTRIES: EarningsEntry[] = [];

export const EarningsDetailScreen: React.FC<EarningsScreenProps<'EarningsDetail'>> = ({
  route,
}) => {
  const { period, date } = route.params;

  const periodLabel =
    period === 'daily' ? 'Daily' : period === 'weekly' ? 'Weekly' : 'Monthly';

  const totalEarnings = PLACEHOLDER_ENTRIES.reduce((sum, e) => sum + e.total, 0);
  const totalDeliveryFees = PLACEHOLDER_ENTRIES.reduce(
    (sum, e) => sum + e.deliveryFee,
    0,
  );
  const totalTips = PLACEHOLDER_ENTRIES.reduce((sum, e) => sum + e.tip, 0);

  const renderEntry = ({ item }: { item: EarningsEntry }): React.ReactElement => (
    <View style={styles.entryCard}>
      <View style={styles.entryLeft}>
        <Text style={styles.entryOrder}>#{item.orderNumber}</Text>
        <Text style={styles.entryRestaurant}>{item.restaurantName}</Text>
        <Text style={styles.entryTime}>{item.completedAt}</Text>
      </View>
      <View style={styles.entryRight}>
        <Text style={styles.entryTotal}>${item.total.toFixed(2)}</Text>
        <Text style={styles.entryBreakdown}>
          Fee: ${item.deliveryFee.toFixed(2)} + Tip: ${item.tip.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderEmptyList = (): React.ReactElement => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>[No Earnings]</Text>
      <Text style={styles.emptyTitle}>No Earnings Yet</Text>
      <Text style={styles.emptyDescription}>
        Complete deliveries to see your earnings breakdown here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Period Header */}
        <View style={styles.periodHeader}>
          <Text style={styles.periodLabel}>{periodLabel} Report</Text>
          <Text style={styles.periodDate}>{date}</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.summaryCardPrimary]}>
            <Text style={styles.summaryCardLabelPrimary}>Total</Text>
            <Text style={styles.summaryCardValuePrimary}>
              ${totalEarnings.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardLabel}>Fees</Text>
            <Text style={styles.summaryCardValue}>
              ${totalDeliveryFees.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardLabel}>Tips</Text>
            <Text style={styles.summaryCardValue}>
              ${totalTips.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Chart Placeholder */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>[Hourly/Daily Earnings Chart]</Text>
        </View>

        {/* Deliveries List */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Deliveries</Text>
          <Text style={styles.listCount}>
            {PLACEHOLDER_ENTRIES.length} total
          </Text>
        </View>

        <FlatList
          data={PLACEHOLDER_ENTRIES}
          keyExtractor={(item) => item.id}
          renderItem={renderEntry}
          ListEmptyComponent={renderEmptyList}
          scrollEnabled={false}
        />
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
  periodHeader: {
    marginBottom: 20,
  },
  periodLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },
  periodDate: {
    fontSize: 14,
    color: '#737373',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  summaryCardPrimary: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  summaryCardLabel: {
    fontSize: 12,
    color: '#737373',
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryCardLabelPrimary: {
    fontSize: 12,
    color: '#FFE6D9',
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },
  summaryCardValuePrimary: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chartPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  chartText: {
    fontSize: 14,
    color: '#A3A3A3',
    fontWeight: '600',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },
  listCount: {
    fontSize: 13,
    color: '#737373',
  },
  entryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  entryLeft: {
    flex: 1,
  },
  entryOrder: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2,
  },
  entryRestaurant: {
    fontSize: 13,
    color: '#525252',
    marginBottom: 2,
  },
  entryTime: {
    fontSize: 11,
    color: '#A3A3A3',
  },
  entryRight: {
    alignItems: 'flex-end',
  },
  entryTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 2,
  },
  entryBreakdown: {
    fontSize: 11,
    color: '#A3A3A3',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 16,
    color: '#A3A3A3',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    lineHeight: 20,
  },
});
