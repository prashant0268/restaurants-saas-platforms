import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeliveryStore } from '../../stores/deliveryStore';
import { useLocationStore } from '../../stores/locationStore';
import type { HomeScreenProps } from '../../navigation/types';

export const HomeScreen: React.FC<HomeScreenProps<'Home'>> = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const { availableOrders, currentDelivery } = useDeliveryStore();
  const { currentLocation } = useLocationStore();

  const handleToggleOnline = (value: boolean): void => {
    setIsOnline(value);
    // TODO: Update driver online status in Firestore
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Driver</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Online/Offline Toggle */}
        <View style={[styles.statusCard, isOnline ? styles.statusOnline : styles.statusOffline]}>
          <View style={styles.statusInfo}>
            <Text style={[styles.statusLabel, isOnline && styles.statusLabelOnline]}>
              {isOnline ? 'You are Online' : 'You are Offline'}
            </Text>
            <Text style={[styles.statusDescription, isOnline && styles.statusDescriptionOnline]}>
              {isOnline
                ? 'Accepting delivery requests'
                : 'Toggle to start accepting deliveries'}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={handleToggleOnline}
            trackColor={{ false: '#D4D4D4', true: '#86EFAC' }}
            thumbColor={isOnline ? '#22C55E' : '#A3A3A3'}
          />
        </View>

        {/* Current Delivery Banner */}
        {currentDelivery && (
          <TouchableOpacity
            style={styles.activeDeliveryBanner}
            onPress={() =>
              navigation.navigate('DeliveryTab', {
                screen: 'ActiveDelivery',
                params: { deliveryId: currentDelivery.id },
              })
            }
          >
            <View style={styles.activeDot} />
            <View style={styles.activeDeliveryInfo}>
              <Text style={styles.activeDeliveryTitle}>Active Delivery</Text>
              <Text style={styles.activeDeliverySubtitle}>
                {currentDelivery.restaurantName}
              </Text>
            </View>
            <Text style={styles.activeDeliveryArrow}>{'>'}</Text>
          </TouchableOpacity>
        )}

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Available Deliveries */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('AvailableOrders')}
          >
            <Text style={styles.statValue}>{availableOrders.length}</Text>
            <Text style={styles.statLabel}>Available</Text>
            <Text style={styles.statSublabel}>deliveries</Text>
          </TouchableOpacity>

          {/* Today's Earnings */}
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$0.00</Text>
            <Text style={styles.statLabel}>Today's</Text>
            <Text style={styles.statSublabel}>earnings</Text>
          </View>

          {/* Deliveries Completed */}
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={styles.statSublabel}>today</Text>
          </View>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>[Map View]</Text>
          <Text style={styles.mapSubtext}>
            {currentLocation
              ? `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`
              : 'Location not available'}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('AvailableOrders')}
            >
              <Text style={styles.actionIcon}>[Orders]</Text>
              <Text style={styles.actionText}>View Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate('EarningsTab', { screen: 'Earnings' })
              }
            >
              <Text style={styles.actionIcon}>[Earnings]</Text>
              <Text style={styles.actionText}>Earnings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate('HistoryTab', { screen: 'DeliveryHistory' })
              }
            >
              <Text style={styles.actionIcon}>[History]</Text>
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
  },
  date: {
    fontSize: 14,
    color: '#737373',
    marginTop: 2,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  statusOffline: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statusOnline: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#525252',
    marginBottom: 4,
  },
  statusLabelOnline: {
    color: '#15803D',
  },
  statusDescription: {
    fontSize: 13,
    color: '#737373',
  },
  statusDescriptionOnline: {
    color: '#16A34A',
  },
  activeDeliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
  },
  activeDeliveryInfo: {
    flex: 1,
  },
  activeDeliveryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activeDeliverySubtitle: {
    fontSize: 12,
    color: '#FFE6D9',
    marginTop: 2,
  },
  activeDeliveryArrow: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#171717',
  },
  statSublabel: {
    fontSize: 11,
    color: '#A3A3A3',
  },
  mapPlaceholder: {
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapPlaceholderText: {
    fontSize: 18,
    color: '#737373',
    fontWeight: '600',
  },
  mapSubtext: {
    fontSize: 12,
    color: '#A3A3A3',
    marginTop: 4,
  },
  quickActions: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  actionIcon: {
    fontSize: 14,
    color: '#FF6B35',
    marginBottom: 8,
    fontWeight: '600',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#171717',
  },
});
