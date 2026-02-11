import { type CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';

export const KitchenLayout = () => {
  return (
    <div style={styles.layout}>
      <Outlet />
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
};
