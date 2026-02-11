import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
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
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, backgroundColor: colors.bg, color: colors.text }}>
      {children}
    </span>
  );
};
