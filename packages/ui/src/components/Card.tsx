import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
}

export const Card = ({ children, padding = 20, style }: CardProps) => {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #E5E5E5', padding, ...style }}>
      {children}
    </div>
  );
};
