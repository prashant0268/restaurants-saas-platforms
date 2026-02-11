import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const styles: Record<string, CSSProperties> = {
  footer: {
    backgroundColor: '#1a1a1a',
    color: '#9ca3af',
    padding: '64px 48px 32px',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 48,
    marginBottom: 48,
  },
  brand: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: '#ffffff',
    textDecoration: 'none',
    margin: 0,
  },
  tagline: {
    fontSize: 15,
    color: '#9ca3af',
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 320,
  },
  socialRow: {
    display: 'flex',
    gap: 16,
    marginTop: 8,
  },
  socialLink: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: 18,
    transition: 'background-color 0.2s',
  },
  column: {
    flex: '0 1 160px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  columnTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    marginBottom: 4,
  },
  link: {
    fontSize: 14,
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.2s',
    lineHeight: 1.5,
  },
  divider: {
    borderTop: '1px solid #374151',
    margin: 0,
    padding: 0,
  },
  bottom: {
    maxWidth: 1200,
    margin: '0 auto',
    paddingTop: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  copyright: {
    fontSize: 14,
    color: '#6b7280',
    margin: 0,
  },
  bottomLinks: {
    display: 'flex',
    gap: 24,
  },
};

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <Link to="/" style={styles.logo}>
            RestaurantOS
          </Link>
          <p style={styles.tagline}>
            The all-in-one platform for modern restaurants. Streamline
            ordering, delivery, and operations.
          </p>
          <div style={styles.socialRow}>
            <a
              href="#"
              style={styles.socialLink}
              aria-label="Twitter"
            >
              X
            </a>
            <a
              href="#"
              style={styles.socialLink}
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="#"
              style={styles.socialLink}
              aria-label="Facebook"
            >
              f
            </a>
          </div>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Product</h4>
          <Link to="/features" style={styles.link}>Features</Link>
          <Link to="/pricing" style={styles.link}>Pricing</Link>
          <Link to="/restaurants" style={styles.link}>Directory</Link>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Company</h4>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Legal</h4>
          <Link to="/terms" style={styles.link}>Terms of Service</Link>
          <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
        </div>
      </div>
      <hr style={styles.divider} />
      <div style={styles.bottom}>
        <p style={styles.copyright}>
          &copy; {year} RestaurantOS. All rights reserved.
        </p>
        <div style={styles.bottomLinks}>
          <Link to="/terms" style={styles.link}>Terms</Link>
          <Link to="/privacy" style={styles.link}>Privacy</Link>
        </div>
      </div>
    </footer>
  );
};
