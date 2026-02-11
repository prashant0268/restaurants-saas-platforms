import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  children: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    default: { bg: '#F5F5F5', text: '#525252' },
    success: { bg: '#DCFCE7', text: '#16A34A' },
    warning: { bg: '#FEF3C7', text: '#D97706' },
    error: { bg: '#FEE2E2', text: '#EF4444' },
    info: { bg: '#DBEAFE', text: '#3B82F6' },
  };
  const colors = colorMap[variant];

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, alignSelf: 'flex-start' },
  text: { fontSize: 12, fontWeight: '500' },
});
