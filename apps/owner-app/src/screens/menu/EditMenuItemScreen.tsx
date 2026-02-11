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
import { MenuScreenProps } from '../../navigation/types';

export const EditMenuItemScreen: React.FC<MenuScreenProps<'EditMenuItem'>> = ({
  route,
  navigation,
}) => {
  const { itemId } = route.params;
  const isEditing = !!itemId;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSave = (): void => {
    // TODO: Save to Firestore
    navigation.goBack();
  };

  const handleDelete = (): void => {
    // TODO: Delete from Firestore with confirmation
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Upload */}
        <TouchableOpacity style={styles.imageUpload}>
          <Text style={styles.imageUploadText}>+ Add Photo</Text>
          <Text style={styles.imageUploadHint}>Tap to upload item image</Text>
        </TouchableOpacity>

        {/* Item Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Item Details</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Item name"
            placeholderTextColor="#8E8E93"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Brief description of the item"
            placeholderTextColor="#8E8E93"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Price ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#8E8E93"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Select category"
            placeholderTextColor="#8E8E93"
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Preparation Time (minutes)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 15"
            placeholderTextColor="#8E8E93"
            value={preparationTime}
            onChangeText={setPreparationTime}
            keyboardType="number-pad"
          />
        </View>

        {/* Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options</Text>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Vegetarian</Text>
              <Text style={styles.switchHint}>Mark as vegetarian item</Text>
            </View>
            <Switch
              value={isVegetarian}
              onValueChange={setIsVegetarian}
              trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Available</Text>
              <Text style={styles.switchHint}>
                Show this item on the menu
              </Text>
            </View>
            <Switch
              value={isAvailable}
              onValueChange={setIsAvailable}
              trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Customizations Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customizations</Text>
          <TouchableOpacity style={styles.addCustomization}>
            <Text style={styles.addCustomizationText}>
              + Add Size / Variant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addCustomization}>
            <Text style={styles.addCustomizationText}>
              + Add Add-on Options
            </Text>
          </TouchableOpacity>
        </View>

        {/* Delete Button (only for editing) */}
        {isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Item</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Save Changes' : 'Add Item'}
          </Text>
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
  imageUpload: {
    height: 180,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  imageUploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E23744',
    marginBottom: 4,
  },
  imageUploadHint: {
    fontSize: 13,
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
    marginBottom: 16,
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
  textArea: {
    height: 80,
    paddingTop: 12,
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
  addCustomization: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  addCustomizationText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#E23744',
  },
  deleteButton: {
    marginTop: 24,
    marginHorizontal: 20,
    height: 48,
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
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
