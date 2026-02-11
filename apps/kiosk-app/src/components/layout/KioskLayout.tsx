import { type CSSProperties, type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface KioskLayoutProps {
  children?: ReactNode;
}

const styles: Record<string, CSSProperties> = {
  container: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 18,
    color: '#1a1a1a',
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
};

export const KioskLayout = ({ children }: KioskLayoutProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {children ?? <Outlet />}
      </div>
    </div>
  );
};
