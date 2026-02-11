import type { CSSProperties } from 'react';
import { useAuthStore } from '../../stores/authStore';

interface HeaderProps {
  title?: string;
}

const styles: Record<string, CSSProperties> = {
  header: {
    height: '64px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchInput: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    width: '280px',
    outline: 'none',
    backgroundColor: '#f9fafb',
  },
  greeting: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
};

export const Header = ({ title }: HeaderProps) => {
  const { user } = useAuthStore();

  return (
    <header style={styles.header}>
      <h2 style={styles.title}>{title ?? 'Dashboard'}</h2>
      <div style={styles.actions}>
        <input
          type="text"
          placeholder="Search leads, restaurants..."
          style={styles.searchInput}
        />
        {user && (
          <p style={styles.greeting}>
            Welcome, {user.name}
          </p>
        )}
      </div>
    </header>
  );
};
