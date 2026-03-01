import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, EXPANDED_WIDTH, COLLAPSED_WIDTH } from './Sidebar';
import { useAuthStore } from '../../stores/authStore';

export const AppLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const sidebarWidth = sidebarCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  const styles: Record<string, CSSProperties> = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
    },
    main: {
      flex: 1,
      marginLeft: `${sidebarWidth}px`,
      display: 'flex',
      flexDirection: 'column',
      transition: 'margin-left 0.25s ease',
    },
    content: {
      flex: 1,
      padding: '32px',
    },
  };

  return (
    <div style={styles.layout}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />
      <div style={styles.main}>
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
