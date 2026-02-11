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

type TimePeriod = 'week' | 'month' | 'quarter' | 'year';

interface RevenueBreakdown {
  label: string;
  amount: string;
  percentage: number;
}

const REVENUE_BREAKDOWN: RevenueBreakdown[] = [
  { label: 'Dine-in', amount: '$1,200', percentage: 48 },
  { label: 'Delivery', amount: '$850', percentage: 34 },
  { label: 'Takeaway', amount: '$400', percentage: 16 },
  { label: 'Catering', amount: '$50', percentage: 2 },
];

interface DailyRevenue {
  day: string;
  amount: string;
  orders: number;
}

const DAILY_REVENUE: DailyRevenue[] = [
  { day: 'Monday', amount: '$320', orders: 24 },
  { day: 'Tuesday', amount: '$280', orders: 20 },
  { day: 'Wednesday', amount: '$350', orders: 28 },
  { day: 'Thursday', amount: '$410', orders: 32 },
  { day: 'Friday', amount: '$520', orders: 42 },
  { day: 'Saturday', amount: '$480', orders: 38 },
  { day: 'Sunday', amount: '$390', orders: 30 },
];

const PERIODS: { key: TimePeriod; label: string }[] = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'quarter', label: 'Quarter' },
  { key: 'year', label: 'Year' },
];

export const RevenueScreen: React.FC<AnalyticsScreenProps<'Revenue'>> = () => {
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

        {/* Total Revenue */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Revenue</Text>
          <Text style={styles.totalValue}>$2,750</Text>
          <Text style={styles.totalChange}>+12% vs previous period</Text>
        </View>

        {/* Revenue Chart Placeholder */}
        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Revenue Over Time</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Line chart: Revenue over selected period
            </Text>
          </View>
        </View>

        {/* Revenue Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
          {REVENUE_BREAKDOWN.map((item, index) => (
            <View key={index} style={styles.breakdownRow}>
              <View style={styles.breakdownLabel}>
                <Text style={styles.breakdownName}>{item.label}</Text>
                <Text style={styles.breakdownPercentage}>
                  {item.percentage}%
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${item.percentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.breakdownAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>

        {/* Daily Revenue */}
        <View style={styles.dailyCard}>
          <Text style={styles.sectionTitle}>Daily Revenue</Text>
          {DAILY_REVENUE.map((day, index) => (
            <View key={index} style={styles.dailyRow}>
              <Text style={styles.dailyDay}>{day.day}</Text>
              <Text style={styles.dailyOrders}>{day.orders} orders</Text>
              <Text style={styles.dailyAmount}>{day.amount}</Text>
            </View>
          ))}
        </View>

        {/* Payment Methods Placeholder */}
        <View style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Pie chart: Payment method distribution
            </Text>
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
  totalCard: {
    backgroundColor: '#E23744',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  totalValue: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  totalChange: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
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
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#C7C7CC',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  breakdownRow: {
    marginBottom: 16,
  },
  breakdownLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  breakdownName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  breakdownPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E23744',
    borderRadius: 4,
  },
  breakdownAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636366',
  },
  dailyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dailyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dailyDay: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  dailyOrders: {
    fontSize: 13,
    color: '#8E8E93',
    marginRight: 16,
  },
  dailyAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    width: 60,
    textAlign: 'right',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
});
