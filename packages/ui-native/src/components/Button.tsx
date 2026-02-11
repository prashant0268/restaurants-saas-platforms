import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) => {
  const variantStyles: Record<string, { container: ViewStyle; text: TextStyle }> = {
    primary: { container: { backgroundColor: '#FF6B35' }, text: { color: '#fff' } },
    secondary: { container: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E5E5' }, text: { color: '#525252' } },
    danger: { container: { backgroundColor: '#EF4444' }, text: { color: '#fff' } },
    ghost: { container: { backgroundColor: 'transparent' }, text: { color: '#525252' } },
  };

  const sizeStyles: Record<string, { container: ViewStyle; text: TextStyle }> = {
    sm: { container: { paddingVertical: 6, paddingHorizontal: 12 }, text: { fontSize: 12 } },
    md: { container: { paddingVertical: 10, paddingHorizontal: 16 }, text: { fontSize: 14 } },
    lg: { container: { paddingVertical: 14, paddingHorizontal: 24 }, text: { fontSize: 16 } },
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variantStyles[variant].container,
        sizeStyles[size].container,
        fullWidth && styles.fullWidth,
        (disabled || isLoading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={variantStyles[variant].text.color} size="small" />
      ) : (
        <Text style={[styles.text, variantStyles[variant].text, sizeStyles[size].text]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.6 },
  text: { fontWeight: '600' },
});
