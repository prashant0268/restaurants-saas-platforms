import { type CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
  section?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', section: 'Overview' },
  { label: 'Restaurants', path: '/restaurants', section: 'Management' },
  { label: 'Users', path: '/users' },
  { label: 'Drivers', path: '/drivers' },
  { label: 'Orders', path: '/orders', section: 'Operations' },
  { label: 'Financial', path: '/financial' },
  { label: 'Content', path: '/content', section: 'Platform' },
  { label: 'Support', path: '/support' },
  { label: 'Settings', path: '/settings', section: 'System' },
  { label: 'System Health', path: '/system-health' },
];

const styles: Record<string, CSSProperties> = {
  sidebar: {
    width: '260px',
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
    overflowY: 'auto',
  },
  logo: {
    padding: '24px 20px',
    fontSize: '20px',
    fontWeight: 700,
    borderBottom: '1px solid #1f2937',
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  logoSub: {
    fontSize: '11px',
    fontWeight: 400,
    color: '#9ca3af',
    display: 'block',
    marginTop: '2px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  nav: {
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    padding: '16px 8px 6px',
    margin: 0,
  },
  link: {
    display: 'block',
    padding: '10px 12px',
    borderRadius: '8px',
    color: '#d1d5db',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'background-color 0.15s, color 0.15s',
  },
  linkActive: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
  },
};

export const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        Super Admin
        <span style={styles.logoSub}>Restaurant Platform</span>
      </div>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <div key={item.path}>
            {item.section && (
              <p style={styles.sectionLabel}>{item.section}</p>
            )}
            <NavLink
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.linkActive : {}),
              })}
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </nav>
    </aside>
  );
};
