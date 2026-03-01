import type { CSSProperties, ReactNode } from 'react';

interface MockDashboardFrameProps {
  children: ReactNode;
  title?: string;
  url?: string;
}

const styles: Record<string, CSSProperties> = {
  frame: {
    width: '100%',
    maxWidth: '800px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  },
  toolbar: {
    height: '40px',
    backgroundColor: '#f1f5f9',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    gap: '8px',
  },
  dots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  addressBar: {
    flex: 1,
    height: '26px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    fontSize: '12px',
    color: '#6b7280',
  },
  content: {
    minHeight: '400px',
    overflowY: 'auto' as const,
    backgroundColor: '#f8fafc',
  },
};

export const MockDashboardFrame = ({ children, title, url }: MockDashboardFrameProps) => {
  return (
    <div style={styles.frame}>
      <div style={styles.toolbar}>
        <div style={styles.dots}>
          <span style={{ ...styles.dot, backgroundColor: '#ef4444' }} />
          <span style={{ ...styles.dot, backgroundColor: '#f59e0b' }} />
          <span style={{ ...styles.dot, backgroundColor: '#22c55e' }} />
        </div>
        <div style={styles.addressBar}>
          {url ?? `dashboard.restaurant.app/${title?.toLowerCase().replace(/\s/g, '-') ?? ''}`}
        </div>
      </div>
      <div style={styles.content}>{children}</div>
    </div>
  );
};
