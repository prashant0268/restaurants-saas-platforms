import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = ({ label, error, helperText, style, ...props }: InputProps) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#525252' }}>{label}</label>}
      <input
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? '#EF4444' : '#E5E5E5'}`,
          borderRadius: 6,
          fontSize: 14,
          boxSizing: 'border-box' as const,
          outline: 'none',
          ...style,
        }}
        {...props}
      />
      {error && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#EF4444' }}>{error}</p>}
      {helperText && !error && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#737373' }}>{helperText}</p>}
    </div>
  );
};
