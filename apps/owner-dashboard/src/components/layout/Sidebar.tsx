import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/orders', label: 'Orders', icon: '📋' },
  { path: '/menu', label: 'Menu', icon: '🍽️' },
  { path: '/reservations', label: 'Reservations', icon: '📅' },
  { path: '/customers', label: 'Customers', icon: '👥' },
  { path: '/staff', label: 'Staff', icon: '🏷️' },
  { path: '/reviews', label: 'Reviews', icon: '⭐' },
  { path: '/marketing', label: 'Marketing', icon: '📢' },
  { path: '/financial', label: 'Financial', icon: '💰' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
  { path: '/subscription', label: 'Subscription', icon: '💳' },
];

export const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <h2 style={styles.logoText}>Restaurant Dashboard</h2>
      </div>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              ...styles.navItem,
              backgroundColor: isActive ? '#FF6B35' : 'transparent',
              color: isActive ? '#fff' : '#D4D4D4',
            })}
          >
            <span style={styles.icon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 250,
    backgroundColor: '#1a1a2e',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  logo: {
    padding: '20px 16px',
    borderBottom: '1px solid #333',
  },
  logoText: {
    color: '#FF6B35',
    fontSize: 18,
    margin: 0,
  },
  nav: {
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    textDecoration: 'none',
    borderRadius: 6,
    margin: '0 8px',
    fontSize: 14,
    transition: 'background-color 0.2s',
  },
  icon: {
    fontSize: 18,
  },
};
