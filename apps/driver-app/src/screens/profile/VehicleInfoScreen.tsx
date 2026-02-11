import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import type { ProfileScreenProps } from '../../navigation/types';
import type { VehicleInfo } from '@restaurants/types';

type VehicleType = VehicleInfo['type'];

const VEHICLE_TYPES: { value: VehicleType; label: string; icon: string }[] = [
  { value: 'car', label: 'Car', icon: '[Car]' },
  { value: 'motorcycle', label: 'Motorcycle', icon: '[Moto]' },
  { value: 'bicycle', label: 'Bicycle', icon: '[Bike]' },
  { value: 'scooter', label: 'Scooter', icon: '[Scooter]' },
];

export const VehicleInfoScreen: React.FC<ProfileScreenProps<'VehicleInfo'>> = () => {
  const { driver } = useAuthStore();
  const existingVehicle = driver?.vehicleInfo;

  const [vehicleType, setVehicleType] = useState<VehicleType>(
    existingVehicle?.type ?? 'car',
  );
  const [make, setMake] = useState(existingVehicle?.make ?? '');
  const [model, setModel] = useState(existingVehicle?.model ?? '');
  const [year, setYear] = useState(existingVehicle?.year?.toString() ?? '');
  const [color, setColor] = useState(existingVehicle?.color ?? '');
  const [licensePlate, setLicensePlate] = useState(
    existingVehicle?.licensePlate ?? '',
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (): Promise<void> => {
    setIsSaving(true);
    try {
      const vehicleInfo: VehicleInfo = {
        type: vehicleType,
        make: make.trim() || undefined,
        model: model.trim() || undefined,
        year: year ? parseInt(year, 10) : undefined,
        color: color.trim() || undefined,
        licensePlate: licensePlate.trim() || undefined,
      };
      // TODO: Update vehicle info in Firestore
      console.log('Saving vehicle info:', vehicleInfo);
    } catch (err) {
      console.error('Failed to save vehicle info:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Vehicle Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Type</Text>
          <View style={styles.typeGrid}>
            {VEHICLE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.typeCard,
                  vehicleType === type.value && styles.typeCardSelected,
                ]}
                onPress={() => setVehicleType(type.value)}
              >
                <Text
                  style={[
                    styles.typeIcon,
                    vehicleType === type.value && styles.typeIconSelected,
                  ]}
                >
                  {type.icon}
                </Text>
                <Text
                  style={[
                    styles.typeLabel,
                    vehicleType === type.value && styles.typeLabelSelected,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vehicle Details */}
        {(vehicleType === 'car' || vehicleType === 'motorcycle') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Make</Text>
              <TextInput
                style={styles.input}
                value={make}
                onChangeText={setMake}
                placeholder="e.g., Toyota"
                placeholderTextColor="#A3A3A3"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Model</Text>
              <TextInput
                style={styles.input}
                value={model}
                onChangeText={setModel}
                placeholder="e.g., Camry"
                placeholderTextColor="#A3A3A3"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Year</Text>
                <TextInput
                  style={styles.input}
                  value={year}
                  onChangeText={setYear}
                  placeholder="e.g., 2022"
                  placeholderTextColor="#A3A3A3"
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  value={color}
                  onChangeText={setColor}
                  placeholder="e.g., Silver"
                  placeholderTextColor="#A3A3A3"
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>License Plate</Text>
              <TextInput
                style={styles.input}
                value={licensePlate}
                onChangeText={setLicensePlate}
                placeholder="e.g., ABC 1234"
                placeholderTextColor="#A3A3A3"
                autoCapitalize="characters"
              />
            </View>
          </View>
        )}

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Text style={styles.infoNoteText}>
            Your vehicle information helps customers identify you during delivery
            pickups. Please keep this information up to date.
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save Vehicle Info</Text>
          )}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  typeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  typeCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F0',
  },
  typeIcon: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 6,
  },
  typeIconSelected: {
    color: '#FF6B35',
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#525252',
  },
  typeLabelSelected: {
    color: '#FF6B35',
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#171717',
    backgroundColor: '#FFFFFF',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  infoNote: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoNoteText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
