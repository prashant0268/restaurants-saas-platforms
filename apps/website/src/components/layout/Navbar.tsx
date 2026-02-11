import { type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles: Record<string, CSSProperties> = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 48px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: '#e63946',
    textDecoration: 'none',
    letterSpacing: -0.5,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    fontSize: 15,
    fontWeight: 500,
    color: '#6b7280',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  linkActive: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  ctaButton: {
    padding: '10px 24px',
    fontSize: 15,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
  },
};

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={styles.nav} aria-label="Main navigation">
      <Link to="/" style={styles.logo}>
        RestaurantOS
      </Link>
      <ul style={styles.links}>
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              style={
                location.pathname === link.to
                  ? styles.linkActive
                  : styles.link
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/contact" style={styles.ctaButton}>
        Get Started
      </Link>
    </nav>
  );
};
