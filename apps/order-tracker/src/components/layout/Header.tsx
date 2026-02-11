import { type CSSProperties } from 'react';
import { useAuthStore } from '../../stores/authStore';

export const Header = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header style={styles.header}>
      <div style={styles.spacer} />
      <div style={styles.userSection}>
        {user && (
          <>
            <span style={styles.userName}>
              {user.displayName ?? user.email}
            </span>
            <span style={styles.roleBadge}>{user.role}</span>
            <button onClick={logout} style={styles.logoutButton}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
};

const styles: Record<string, CSSProperties> = {
  header: {
    height: 56,
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
  },
  spacer: {
    flex: 1,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: 500,
    color: '#333',
  },
  roleBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 8px',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    borderRadius: 10,
    textTransform: 'capitalize',
  },
  logoutButton: {
    fontSize: 13,
    padding: '6px 12px',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: 6,
    cursor: 'pointer',
  },
};
