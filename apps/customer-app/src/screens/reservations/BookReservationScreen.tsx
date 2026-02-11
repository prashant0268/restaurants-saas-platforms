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
import type { ReservationsScreenProps } from '../../navigation/types';

export const BookReservationScreen: React.FC<
  ReservationsScreenProps<'BookReservation'>
> = ({ navigation, route }) => {
  const { restaurantId, restaurantName } = route.params;

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [occasion, setOccasion] = useState('');

  // Placeholder time slots
  const TIME_SLOTS = [
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
  ];

  const OCCASIONS = [
    'None',
    'Birthday',
    'Anniversary',
    'Date Night',
    'Business',
    'Celebration',
  ];

  const handleBookReservation = (): void => {
    // TODO: Create reservation via Firestore
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Restaurant info */}
        {restaurantName ? (
          <View style={styles.restaurantSection}>
            <View style={styles.restaurantLogo}>
              <Text style={styles.logoText}>{restaurantName[0]}</Text>
            </View>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Restaurant</Text>
            {/* TODO: Restaurant picker / search */}
            <TouchableOpacity style={styles.selectRestaurant}>
              <Text style={styles.selectRestaurantText}>
                Choose a restaurant
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Party size selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Party Size</Text>
          <View style={styles.partySizeRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.partySizeOption,
                  partySize === size && styles.partySizeActive,
                ]}
                onPress={() => setPartySize(size)}
              >
                <Text
                  style={[
                    styles.partySizeText,
                    partySize === size && styles.partySizeTextActive,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.partySizeLabel}>
            {partySize} {partySize === 1 ? 'guest' : 'guests'}
          </Text>
        </View>

        {/* Date picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          {/* TODO: Replace with actual date picker component */}
          <TouchableOpacity style={styles.datePickerPlaceholder}>
            <Text style={styles.datePickerText}>
              {selectedDate || 'Choose a date'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Time slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeSlotsGrid}>
            {TIME_SLOTS.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Occasion */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Occasion (Optional)</Text>
          <View style={styles.occasionRow}>
            {OCCASIONS.map((occ) => (
              <TouchableOpacity
                key={occ}
                style={[
                  styles.occasionChip,
                  occasion === occ && styles.occasionChipActive,
                ]}
                onPress={() => setOccasion(occ === occasion ? '' : occ)}
              >
                <Text
                  style={[
                    styles.occasionText,
                    occasion === occ && styles.occasionTextActive,
                  ]}
                >
                  {occ}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Requests (Optional)</Text>
          <TextInput
            style={styles.requestsInput}
            placeholder="High chair needed, allergies, seating preference..."
            placeholderTextColor="#93959F"
            value={specialRequests}
            onChangeText={setSpecialRequests}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Booking summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Reservation Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Restaurant</Text>
            <Text style={styles.summaryValue}>
              {restaurantName || 'Not selected'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date</Text>
            <Text style={styles.summaryValue}>
              {selectedDate || 'Not selected'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time</Text>
            <Text style={styles.summaryValue}>
              {selectedTime || 'Not selected'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Guests</Text>
            <Text style={styles.summaryValue}>{partySize}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookReservation}
        >
          <Text style={styles.bookButtonText}>Confirm Reservation</Text>
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
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  selectRestaurant: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  selectRestaurantText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '500',
  },
  partySizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  partySizeOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  partySizeActive: {
    backgroundColor: '#E23744',
  },
  partySizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  partySizeTextActive: {
    color: '#FFFFFF',
  },
  partySizeLabel: {
    fontSize: 13,
    color: '#93959F',
  },
  datePickerPlaceholder: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  datePickerText: {
    fontSize: 15,
    color: '#1C1C1C',
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  timeSlotActive: {
    backgroundColor: '#FFF0F0',
    borderColor: '#E23744',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '500',
  },
  timeSlotTextActive: {
    color: '#E23744',
    fontWeight: '600',
  },
  occasionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  occasionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  occasionChipActive: {
    backgroundColor: '#FFF0F0',
  },
  occasionText: {
    fontSize: 13,
    color: '#93959F',
    fontWeight: '500',
  },
  occasionTextActive: {
    color: '#E23744',
    fontWeight: '600',
  },
  requestsInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1C1C1C',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  summarySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#93959F',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  bookButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
