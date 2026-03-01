import type { CSSProperties, ReactNode } from 'react';

interface MockPhoneFrameProps {
  children: ReactNode;
  title?: string;
}

const styles: Record<string, CSSProperties> = {
  frame: {
    width: '320px',
    height: '640px',
    border: '8px solid #1e293b',
    borderRadius: '36px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  statusBar: {
    height: '44px',
    backgroundColor: '#0d9488',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
  },
  statusBarText: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#ffffff',
  },
  header: {
    padding: '12px 16px',
    backgroundColor: '#0d9488',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: '17px',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    backgroundColor: '#f8fafc',
  },
  homeIndicator: {
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  homeBar: {
    width: '134px',
    height: '5px',
    borderRadius: '3px',
    backgroundColor: '#1e293b',
  },
};

export const MockPhoneFrame = ({ children, title }: MockPhoneFrameProps) => {
  return (
    <div style={styles.frame}>
      <div style={styles.statusBar}>
        <span style={styles.statusBarText}>9:41</span>
      </div>
      {title && (
        <div style={styles.header}>
          <h3 style={styles.headerTitle}>{title}</h3>
        </div>
      )}
      <div style={styles.content}>{children}</div>
      <div style={styles.homeIndicator}>
        <div style={styles.homeBar} />
      </div>
    </div>
  );
};
