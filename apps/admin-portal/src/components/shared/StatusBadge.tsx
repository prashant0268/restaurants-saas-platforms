import type { CSSProperties } from 'react';

type BadgeVariant =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'approved'
  | 'suspended'
  | 'banned'
  | 'completed'
  | 'cancelled'
  | 'in_progress'
  | 'delivered'
  | 'open'
  | 'closed'
  | 'resolved';

interface StatusBadgeProps {
  status: BadgeVariant;
  label?: string;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  active: { bg: '#d1fae5', text: '#065f46' },
  approved: { bg: '#d1fae5', text: '#065f46' },
  completed: { bg: '#d1fae5', text: '#065f46' },
  delivered: { bg: '#d1fae5', text: '#065f46' },
  resolved: { bg: '#dbeafe', text: '#1e40af' },
  closed: { bg: '#e5e7eb', text: '#374151' },
  inactive: { bg: '#e5e7eb', text: '#374151' },
  pending: { bg: '#fef3c7', text: '#92400e' },
  in_progress: { bg: '#dbeafe', text: '#1e40af' },
  open: { bg: '#dbeafe', text: '#1e40af' },
  suspended: { bg: '#fee2e2', text: '#991b1b' },
  banned: { bg: '#fee2e2', text: '#991b1b' },
  cancelled: { bg: '#fee2e2', text: '#991b1b' },
};

const formatLabel = (status: string): string => {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const colors = variantColors[status];

  const style: CSSProperties = {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: colors.bg,
    color: colors.text,
    lineHeight: '1.4',
    whiteSpace: 'nowrap',
  };

  return <span style={style}>{label ?? formatLabel(status)}</span>;
};
