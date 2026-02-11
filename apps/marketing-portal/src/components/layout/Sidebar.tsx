import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/campaigns', label: 'Campaigns', icon: '📣' },
  { to: '/campaigns/new', label: 'Campaign Builder', icon: '🛠' },
  { to: '/promotions', label: 'Promotions', icon: '🎁' },
  { to: '/segments', label: 'Segments', icon: '👥' },
  { to: '/calendar', label: 'Content Calendar', icon: '📅' },
  { to: '/analytics', label: 'Analytics', icon: '📈' },
  { to: '/ab-testing', label: 'A/B Testing', icon: '🔬' },
  { to: '/assets', label: 'Asset Library', icon: '🖼' },
  { to: '/email-builder', label: 'Email Builder', icon: '✉' },
];

export const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <h2 style={styles.brandTitle}>Marketing Portal</h2>
        <p style={styles.brandSubtitle}>Restaurant Platform</p>
      </div>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.navLinkActive : {}),
            })}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 260,
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  brand: {
    padding: '24px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  brandTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
  },
  brandSubtitle: {
    margin: '4px 0 0',
    fontSize: 12,
    opacity: 0.6,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0',
    gap: 2,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 20px',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'all 0.2s',
  },
  navLinkActive: {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRight: '3px solid #6c63ff',
  },
  navIcon: {
    fontSize: 16,
    width: 24,
    textAlign: 'center' as const,
  },
};
