import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsScreenProps } from '../../navigation/types';

export const DeliverySettingsScreen: React.FC<
  SettingsScreenProps<'DeliverySettings'>
> = ({ navigation }) => {
  const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(true);
  const [isPickupEnabled, setIsPickupEnabled] = useState(true);
  const [deliveryRadius, setDeliveryRadius] = useState('5');
  const [deliveryFee, setDeliveryFee] = useState('3.00');
  const [freeDeliveryMin, setFreeDeliveryMin] = useState('25.00');
  const [minOrderAmount, setMinOrderAmount] = useState('10.00');
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('30');
  const [estimatedPickupTime, setEstimatedPickupTime] = useState('15');

  const handleSave = (): void => {
    // TODO: Save to Firestore
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Types</Text>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Delivery</Text>
              <Text style={styles.switchHint}>Accept delivery orders</Text>
            </View>
            <Switch
              value={isDeliveryEnabled}
              onValueChange={setIsDeliveryEnabled}
              trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Pickup</Text>
              <Text style={styles.switchHint}>Accept pickup orders</Text>
            </View>
            <Switch
              value={isPickupEnabled}
              onValueChange={setIsPickupEnabled}
              trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Delivery Settings */}
        {isDeliveryEnabled && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Configuration</Text>

            <Text style={styles.label}>Delivery Radius (miles)</Text>
            <TextInput
              style={styles.input}
              value={deliveryRadius}
              onChangeText={setDeliveryRadius}
              keyboardType="number-pad"
              placeholderTextColor="#8E8E93"
            />

            <Text style={styles.label}>Delivery Fee ($)</Text>
            <TextInput
              style={styles.input}
              value={deliveryFee}
              onChangeText={setDeliveryFee}
              keyboardType="decimal-pad"
              placeholderTextColor="#8E8E93"
            />

            <Text style={styles.label}>Free Delivery Minimum ($)</Text>
            <TextInput
              style={styles.input}
              value={freeDeliveryMin}
              onChangeText={setFreeDeliveryMin}
              keyboardType="decimal-pad"
              placeholderTextColor="#8E8E93"
            />

            <Text style={styles.label}>Estimated Delivery Time (minutes)</Text>
            <TextInput
              style={styles.input}
              value={estimatedDeliveryTime}
              onChangeText={setEstimatedDeliveryTime}
              keyboardType="number-pad"
              placeholderTextColor="#8E8E93"
            />
          </View>
        )}

        {/* Order Minimums */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Requirements</Text>

          <Text style={styles.label}>Minimum Order Amount ($)</Text>
          <TextInput
            style={styles.input}
            value={minOrderAmount}
            onChangeText={setMinOrderAmount}
            keyboardType="decimal-pad"
            placeholderTextColor="#8E8E93"
          />

          {isPickupEnabled && (
            <>
              <Text style={styles.label}>
                Estimated Pickup Time (minutes)
              </Text>
              <TextInput
                style={styles.input}
                value={estimatedPickupTime}
                onChangeText={setEstimatedPickupTime}
                keyboardType="number-pad"
                placeholderTextColor="#8E8E93"
              />
            </>
          )}
        </View>

        {/* Delivery Zones Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Zones</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>
              Map view for delivery zones
            </Text>
          </View>
          <TouchableOpacity style={styles.addZoneButton}>
            <Text style={styles.addZoneButtonText}>
              + Add Custom Delivery Zone
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingBottom: 100,
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
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  switchHint: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A3A3C',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
    backgroundColor: '#F9F9F9',
    marginBottom: 16,
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: '#C7C7CC',
  },
  addZoneButton: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E23744',
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addZoneButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E23744',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  saveButton: {
    height: 52,
    backgroundColor: '#E23744',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
