import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalyticsScreenProps } from '../../navigation/types';

type TimePeriod = 'today' | 'week' | 'month' | 'year';

interface MetricCard {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const METRICS: MetricCard[] = [
  { label: 'Total Revenue', value: '$2,450', change: '+12%', isPositive: true },
  { label: 'Total Orders', value: '186', change: '+8%', isPositive: true },
  { label: 'Avg. Order Value', value: '$13.17', change: '-3%', isPositive: false },
  { label: 'New Customers', value: '24', change: '+15%', isPositive: true },
];

interface TopItem {
  rank: number;
  name: string;
  orders: number;
  revenue: string;
}

const TOP_ITEMS: TopItem[] = [
  { rank: 1, name: 'Butter Chicken', orders: 42, revenue: '$588' },
  { rank: 2, name: 'Biryani', orders: 38, revenue: '$570' },
  { rank: 3, name: 'Paneer Tikka', orders: 31, revenue: '$310' },
  { rank: 4, name: 'Garlic Naan', orders: 28, revenue: '$98' },
  { rank: 5, name: 'Mango Lassi', orders: 25, revenue: '$125' },
];

const PERIODS: { key: TimePeriod; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

export const AnalyticsScreen: React.FC<AnalyticsScreenProps<'AnalyticsOverview'>> = ({
  navigation,
}) => {
  const [period, setPeriod] = useState<TimePeriod>('week');

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[
                styles.periodTab,
                period === p.key && styles.activePeriodTab,
              ]}
              onPress={() => setPeriod(p.key)}
            >
              <Text
                style={[
                  styles.periodText,
                  period === p.key && styles.activePeriodText,
                ]}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {METRICS.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text
                style={[
                  styles.metricChange,
                  { color: metric.isPositive ? '#4CAF50' : '#F44336' },
                ]}
              >
                {metric.change} vs last period
              </Text>
            </View>
          ))}
        </View>

        {/* Revenue Chart Placeholder */}
        <TouchableOpacity
          style={styles.chartCard}
          onPress={() => navigation.navigate('Revenue')}
        >
          <Text style={styles.chartTitle}>Revenue Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Revenue chart will render here
            </Text>
          </View>
          <Text style={styles.chartLink}>View detailed revenue report</Text>
        </TouchableOpacity>

        {/* Orders Chart Placeholder */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Orders by Hour</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Hourly order distribution chart
            </Text>
          </View>
        </View>

        {/* Top Selling Items */}
        <View style={styles.topItemsCard}>
          <Text style={styles.chartTitle}>Top Selling Items</Text>
          {TOP_ITEMS.map((item) => (
            <View key={item.rank} style={styles.topItemRow}>
              <Text style={styles.topItemRank}>#{item.rank}</Text>
              <View style={styles.topItemInfo}>
                <Text style={styles.topItemName}>{item.name}</Text>
                <Text style={styles.topItemOrders}>
                  {item.orders} orders
                </Text>
              </View>
              <Text style={styles.topItemRevenue}>{item.revenue}</Text>
            </View>
          ))}
        </View>

        {/* Customer Ratings Summary */}
        <View style={styles.ratingsCard}>
          <Text style={styles.chartTitle}>Customer Satisfaction</Text>
          <View style={styles.ratingsSummary}>
            <View style={styles.ratingScore}>
              <Text style={styles.ratingValue}>4.5</Text>
              <Text style={styles.ratingMax}>/5.0</Text>
            </View>
            <Text style={styles.ratingCount}>Based on 128 reviews</Text>
          </View>
        </View>
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
    padding: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  activePeriodTab: {
    backgroundColor: '#E23744',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636366',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 160,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#C7C7CC',
  },
  chartLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E23744',
    textAlign: 'center',
  },
  topItemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  topItemRank: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E23744',
    width: 32,
  },
  topItemInfo: {
    flex: 1,
  },
  topItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  topItemOrders: {
    fontSize: 12,
    color: '#8E8E93',
  },
  topItemRevenue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  ratingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingsSummary: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  ratingScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  ratingMax: {
    fontSize: 20,
    fontWeight: '500',
    color: '#8E8E93',
  },
  ratingCount: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
});
