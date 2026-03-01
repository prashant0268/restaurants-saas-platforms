import type { CSSProperties, ComponentType } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  Menu,
  Home,
  Smartphone,
  BarChart3,
  Megaphone,
  UtensilsCrossed,
  Tv,
  Package,
  DollarSign,
  FileText,
  CreditCard,
  Presentation,
  LogOut,
} from 'lucide-react';

interface LucideIconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

interface NavItem {
  label: string;
  path: string;
  icon: ComponentType<LucideIconProps>;
}

const navItems: NavItem[] = [
  { label: 'Customer Pitch', path: '/customer-pitch', icon: Presentation },
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Customer App', path: '/customer-app', icon: Smartphone },
  { label: 'Owner Dashboard', path: '/owner-dashboard', icon: BarChart3 },
  { label: 'Social Media', path: '/social-media', icon: Megaphone },
  { label: 'Menu Builder', path: '/menu-builder', icon: UtensilsCrossed },
  { label: 'Fire TV', path: '/fire-tv', icon: Tv },
  { label: 'More Products', path: '/other-products', icon: Package },
  { label: 'Pricing', path: '/pricing', icon: DollarSign },
  { label: 'Contract', path: '/contract', icon: FileText },
  { label: 'Payment', path: '/payment', icon: CreditCard },
];

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 64;

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const getStyles = (collapsed: boolean): Record<string, CSSProperties> => ({
  sidebar: {
    width: `${collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH}px`,
    height: '100vh',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
    transition: 'width 0.25s ease',
    overflow: 'hidden',
  },
  logoSection: {
    padding: collapsed ? '16px 0' : '24px 20px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    gap: '8px',
    flexShrink: 0,
    minHeight: '72px',
  },
  logoText: {
    overflow: 'hidden',
    opacity: collapsed ? 0 : 1,
    width: collapsed ? 0 : 'auto',
    transition: 'opacity 0.2s ease, width 0.25s ease',
    whiteSpace: 'nowrap' as const,
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
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
    flexShrink: 0,
    transition: 'color 0.15s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flex: 1,
    padding: collapsed ? '16px 8px' : '16px 12px',
    overflowY: 'auto' as const,
    transition: 'padding 0.25s ease',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '12px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    padding: collapsed ? '12px 0' : '12px 16px',
    borderRadius: '8px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.15s ease',
    marginBottom: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap' as const,
  },
  navLinkActive: {
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '12px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    padding: collapsed ? '12px 0' : '12px 16px',
    borderRadius: '8px',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    backgroundColor: '#0d9488',
    marginBottom: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap' as const,
  },
  navIcon: {
    width: '24px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    opacity: collapsed ? 0 : 1,
    width: collapsed ? 0 : 'auto',
    overflow: 'hidden',
    transition: 'opacity 0.2s ease',
  },
  userSection: {
    padding: collapsed ? '12px 8px' : '16px 20px',
    borderTop: '1px solid #1e293b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: collapsed ? '0' : '12px',
    flexShrink: 0,
    transition: 'padding 0.25s ease',
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#0d9488',
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
    opacity: collapsed ? 0 : 1,
    width: collapsed ? 0 : 'auto',
    transition: 'opacity 0.2s ease',
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
    padding: '4px',
    opacity: collapsed ? 0 : 1,
    width: collapsed ? 0 : 'auto',
    overflow: 'hidden',
    transition: 'opacity 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { EXPANDED_WIDTH, COLLAPSED_WIDTH };

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { user, logout } = useAuthStore();
  const s = getStyles(collapsed);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside style={s.sidebar}>
      <div style={s.logoSection}>
        <div style={s.logoText}>
          <h1 style={s.logoTitle}>Demo Portal</h1>
          <p style={s.logoSubtitle}>Restaurant Platform</p>
        </div>
        <button
          style={s.toggleBtn}
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu size={20} />
        </button>
      </div>

      <nav style={s.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) =>
                isActive ? s.navLinkActive : s.navLink
              }
              title={collapsed ? item.label : undefined}
            >
              <span style={s.navIcon}>
                <Icon size={18} />
              </span>
              <span style={s.navLabel}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {user && (
        <div style={s.userSection}>
          <div style={s.userAvatar}>
            {getInitials(user.name)}
          </div>
          <div style={s.userInfo}>
            <p style={s.userName}>{user.name}</p>
            <p style={s.userRole}>
              {user.role.replace('_', ' ')}
            </p>
          </div>
          <button
            style={s.logoutButton}
            onClick={logout}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
    </aside>
  );
};
