import type { CSSProperties } from 'react';

interface FeatureListProps {
  features: string[];
  color?: string;
}

const styles: Record<string, CSSProperties> = {
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.5',
  },
  check: {
    flexShrink: 0,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    marginTop: '1px',
  },
};

export const FeatureList = ({ features, color = '#0d9488' }: FeatureListProps) => {
  return (
    <ul style={styles.list}>
      {features.map((feature) => (
        <li key={feature} style={styles.item}>
          <span
            style={{
              ...styles.check,
              backgroundColor: `${color}15`,
              color,
            }}
          >
            &#10003;
          </span>
          {feature}
        </li>
      ))}
    </ul>
  );
};
