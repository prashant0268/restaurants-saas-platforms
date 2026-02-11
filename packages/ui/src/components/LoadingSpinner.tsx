interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner = ({ text }: LoadingSpinnerProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 32 }}>
      <div style={{ width: 32, height: 32, border: '3px solid #E5E5E5', borderTopColor: '#FF6B35', borderRadius: '50%' }} />
      {text && <p style={{ margin: 0, fontSize: 14, color: '#737373' }}>{text}</p>}
    </div>
  );
};
