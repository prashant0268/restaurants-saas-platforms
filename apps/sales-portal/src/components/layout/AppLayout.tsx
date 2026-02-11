import type { CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const styles: Record<string, CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: '32px',
  },
};

export const AppLayout = () => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
