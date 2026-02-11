import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div style={{ textAlign: 'center' as const, padding: 48 }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#171717' }}>{title}</h3>
      {description && <p style={{ margin: '8px 0 0', fontSize: 14, color: '#737373' }}>{description}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
};
