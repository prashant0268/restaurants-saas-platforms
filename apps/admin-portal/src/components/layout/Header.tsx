import type { CSSProperties } from 'react';

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
  pageTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  notificationBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#6b7280',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 600,
  },
  userName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    margin: 0,
  },
  userRole: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <header style={styles.header}>
      <h2 style={styles.pageTitle}>{title ?? 'Admin Portal'}</h2>
      <div style={styles.right}>
        <button style={styles.notificationBtn} aria-label="Notifications">
          &#128276;
        </button>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>SA</div>
          <div>
            <p style={styles.userName}>Super Admin</p>
            <p style={styles.userRole}>Platform Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
