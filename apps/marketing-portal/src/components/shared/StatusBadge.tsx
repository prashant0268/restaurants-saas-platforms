type BadgeVariant = 'active' | 'paused' | 'draft' | 'completed' | 'scheduled' | 'expired';

interface StatusBadgeProps {
  status: BadgeVariant;
  label?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  active: { backgroundColor: '#c6f6d5', color: '#22543d' },
  paused: { backgroundColor: '#fefcbf', color: '#744210' },
  draft: { backgroundColor: '#e2e8f0', color: '#4a5568' },
  completed: { backgroundColor: '#bee3f8', color: '#2a4365' },
  scheduled: { backgroundColor: '#e9d8fd', color: '#553c9a' },
  expired: { backgroundColor: '#fed7d7', color: '#9b2c2c' },
};

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const displayLabel = label ?? status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      style={{
        ...styles.badge,
        ...variantStyles[status],
      }}
    >
      {displayLabel}
    </span>
  );
};

const styles: Record<string, React.CSSProperties> = {
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'capitalize' as const,
  },
};
