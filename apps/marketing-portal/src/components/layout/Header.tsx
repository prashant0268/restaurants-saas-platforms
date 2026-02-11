import { useAuthStore } from '../../stores/authStore';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { user, logout } = useAuthStore();

  return (
    <header style={styles.header}>
      <div>
        <h1 style={styles.title}>{title}</h1>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      <div style={styles.actions}>
        {user && (
          <>
            <span style={styles.userName}>{user.name}</span>
            <button style={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: '#1a202c',
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: 14,
    color: '#718096',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  userName: {
    fontSize: 14,
    color: '#4a5568',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    color: '#4a5568',
  },
};
