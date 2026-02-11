import type { CSSProperties } from 'react';

type StatusType =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'demo'
  | 'converted'
  | 'lost'
  | 'pending'
  | 'approved'
  | 'paid'
  | 'active'
  | 'inactive';

const statusColors: Record<StatusType, { bg: string; text: string }> = {
  new: { bg: '#dbeafe', text: '#1d4ed8' },
  contacted: { bg: '#fef3c7', text: '#b45309' },
  qualified: { bg: '#e0e7ff', text: '#4338ca' },
  demo: { bg: '#fce7f3', text: '#be185d' },
  converted: { bg: '#d1fae5', text: '#065f46' },
  lost: { bg: '#fee2e2', text: '#991b1b' },
  pending: { bg: '#fef3c7', text: '#b45309' },
  approved: { bg: '#dbeafe', text: '#1d4ed8' },
  paid: { bg: '#d1fae5', text: '#065f46' },
  active: { bg: '#d1fae5', text: '#065f46' },
  inactive: { bg: '#f3f4f6', text: '#6b7280' },
};

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const colors = statusColors[status] ?? { bg: '#f3f4f6', text: '#6b7280' };

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: colors.bg,
    color: colors.text,
    textTransform: 'capitalize',
    letterSpacing: '0.3px',
  };

  return <span style={style}>{label ?? status}</span>;
};
