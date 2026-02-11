import type { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: '\u{1F4CA}' },
  { label: 'Leads', path: '/leads', icon: '\u{1F465}' },
  { label: 'Onboarding', path: '/onboarding', icon: '\u{1F680}' },
  { label: 'Subscriptions', path: '/subscriptions', icon: '\u{1F4B3}' },
  { label: 'Commissions', path: '/commissions', icon: '\u{1F4B0}' },
  { label: 'Territories', path: '/territories', icon: '\u{1F5FA}' },
  { label: 'Reports', path: '/reports', icon: '\u{1F4C8}' },
];

const styles: Record<string, CSSProperties> = {
  sidebar: {
    width: '260px',
    height: '100vh',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  logoSection: {
    padding: '24px 20px',
    borderBottom: '1px solid #334155',
  },
  logoTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
  },
  logoSubtitle: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '4px 0 0 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  nav: {
    flex: 1,
    padding: '16px 12px',
    overflowY: 'auto' as const,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.15s ease',
    marginBottom: '4px',
  },
  navLinkActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    backgroundColor: '#3b82f6',
    marginBottom: '4px',
  },
  navIcon: {
    fontSize: '18px',
    width: '24px',
    textAlign: 'center' as const,
  },
  userSection: {
    padding: '16px 20px',
    borderTop: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    flexShrink: 0,
  },
  userInfo: {
    flex: 1,
    overflow: 'hidden',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#e2e8f0',
    margin: 0,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userRole: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '2px 0 0 0',
    textTransform: 'capitalize' as const,
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px',
  },
};

export const Sidebar = () => {
  const { user, logout } = useAuthStore();

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoSection}>
        <h1 style={styles.logoTitle}>Sales Portal</h1>
        <p style={styles.logoSubtitle}>Restaurant CRM</p>
      </div>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
          >
            <span style={styles.navIcon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div style={styles.userSection}>
          <div style={styles.userAvatar}>
            {getInitials(user.name)}
          </div>
          <div style={styles.userInfo}>
            <p style={styles.userName}>{user.name}</p>
            <p style={styles.userRole}>
              {user.role.replace('_', ' ')}
            </p>
          </div>
          <button
            style={styles.logoutButton}
            onClick={logout}
            title="Logout"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
};
