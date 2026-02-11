import { type CSSProperties } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  iconPlaceholder?: string;
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 28,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    transition: 'box-shadow 0.2s, transform 0.2s',
    gap: 16,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  description: {
    fontSize: 15,
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.6,
  },
};

export const FeatureCard = ({
  title,
  description,
  iconPlaceholder = '&#9733;',
}: FeatureCardProps) => {
  return (
    <div style={styles.card}>
      <div
        style={styles.iconWrapper}
        dangerouslySetInnerHTML={{ __html: iconPlaceholder }}
        aria-hidden="true"
      />
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
};
