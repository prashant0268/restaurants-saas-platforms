import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 32 },
  title: { fontSize: 18, fontWeight: '600', color: '#171717', textAlign: 'center' },
  description: { marginTop: 8, fontSize: 14, color: '#737373', textAlign: 'center' },
  action: { marginTop: 16 },
});
