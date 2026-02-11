import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const sizeMap: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: 12 },
    md: { padding: '8px 16px', fontSize: 14 },
    lg: { padding: '12px 24px', fontSize: 16 },
  };
  const variantMap: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: '#FF6B35', color: '#fff', border: 'none' },
    secondary: { backgroundColor: '#fff', color: '#525252', border: '1px solid #E5E5E5' },
    danger: { backgroundColor: '#EF4444', color: '#fff', border: 'none' },
    ghost: { backgroundColor: 'transparent', color: '#525252', border: 'none' },
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    fontWeight: 500,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    ...sizeMap[size],
    ...variantMap[variant],
    ...style,
  };

  return (
    <button style={baseStyle} disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
