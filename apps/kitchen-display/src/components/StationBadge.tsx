import type { Station } from '../stores/kitchenStore';

interface StationBadgeProps {
  station: Exclude<Station, 'all'>;
}

const STATION_COLORS: Record<Exclude<Station, 'all'>, { bg: string; text: string }> = {
  grill: { bg: '#fef2f2', text: '#dc2626' },
  fry: { bg: '#fffbeb', text: '#d97706' },
  salad: { bg: '#f0fdf4', text: '#16a34a' },
  drinks: { bg: '#eff6ff', text: '#2563eb' },
  dessert: { bg: '#fdf4ff', text: '#a855f7' },
};

export const StationBadge = ({ station }: StationBadgeProps) => {
  const colors = STATION_COLORS[station];

  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: '2px 6px',
        borderRadius: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {station}
    </span>
  );
};
