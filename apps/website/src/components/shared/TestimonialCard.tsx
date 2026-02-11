import { type CSSProperties } from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  restaurant?: string;
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: 28,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    gap: 20,
    flex: '1 1 300px',
  },
  quoteIcon: {
    fontSize: 32,
    color: '#e63946',
    lineHeight: 1,
  },
  quote: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 1.7,
    margin: 0,
    fontStyle: 'italic',
  },
  authorSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 'auto',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#9ca3af',
    fontWeight: 600,
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  authorName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  authorRole: {
    fontSize: 13,
    color: '#6b7280',
    margin: 0,
  },
};

export const TestimonialCard = ({
  quote,
  author,
  role,
  restaurant,
}: TestimonialCardProps) => {
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div style={styles.card}>
      <span style={styles.quoteIcon}>&ldquo;</span>
      <p style={styles.quote}>{quote}</p>
      <div style={styles.authorSection}>
        <div style={styles.avatar}>{initials}</div>
        <div style={styles.authorInfo}>
          <p style={styles.authorName}>{author}</p>
          <p style={styles.authorRole}>
            {role}
            {restaurant && `, ${restaurant}`}
          </p>
        </div>
      </div>
    </div>
  );
};
