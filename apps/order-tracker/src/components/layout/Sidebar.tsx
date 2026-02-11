import { type CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Dashboard' },
  { to: '/orders', label: 'Order Feed' },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/drivers', label: 'Drivers' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/analytics', label: 'Analytics' },
];

export const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={styles.logoText}>OrderTracker</span>
      </div>

      <nav style={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              ...styles.navLink,
              backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const styles: Record<string, CSSProperties> = {
  sidebar: {
    width: 220,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  logo: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: -0.5,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 8px',
    gap: 2,
  },
  navLink: {
    padding: '10px 16px',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 14,
    transition: 'background-color 0.15s, color 0.15s',
  },
};
