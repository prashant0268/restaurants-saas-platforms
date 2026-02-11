import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = ({ label, error, helperText, style, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#A3A3A3"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 6, color: '#525252' },
  input: { padding: 12, borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 8, fontSize: 14, backgroundColor: '#fff', color: '#171717' },
  inputError: { borderColor: '#EF4444' },
  error: { marginTop: 4, fontSize: 12, color: '#EF4444' },
  helper: { marginTop: 4, fontSize: 12, color: '#737373' },
});
