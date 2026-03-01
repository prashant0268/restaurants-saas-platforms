import { useState, useEffect } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const styles: Record<string, CSSProperties> = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  },
  logoSection: {
    backgroundColor: '#0d9488',
    padding: '32px 24px',
    textAlign: 'center',
  },
  logoIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  logoTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
  },
  logoSubtitle: {
    fontSize: '14px',
    color: '#ccfbf1',
    margin: '4px 0 0 0',
  },
  formSection: {
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#f9fafb',
    color: '#111827',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '4px',
  },
  buttonDisabled: {
    width: '100%',
    padding: '12px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#5eada6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    marginTop: '4px',
    opacity: 0.7,
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #fecaca',
    margin: 0,
  },
};

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>&#127869;</div>
          <h1 style={styles.logoTitle}>Demo Portal</h1>
          <p style={styles.logoSubtitle}>Restaurant Platform</p>
        </div>
        <form style={styles.formSection} onSubmit={handleSubmit}>
          {error && <p style={styles.errorMessage}>{error}</p>}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            style={isLoading ? styles.buttonDisabled : styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
