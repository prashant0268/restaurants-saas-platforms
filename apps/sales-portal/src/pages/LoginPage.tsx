import { type CSSProperties, type FormEvent, useState } from 'react';
import { useAuthStore } from '../stores/authStore';

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '420px',
  },
  logoSection: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  logoTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1e293b',
    margin: '0 0 4px 0',
  },
  logoSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '40px 32px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  cardSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 28px 0',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    backgroundColor: '#f9fafb',
    boxSizing: 'border-box' as const,
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    marginTop: '8px',
  },
  submitButtonDisabled: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#93c5fd',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'not-allowed',
    marginTop: '8px',
  },
  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#dc2626',
    marginBottom: '20px',
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '24px',
    fontSize: '13px',
    color: '#9ca3af',
  },
};

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.logoSection}>
          <h1 style={styles.logoTitle}>Sales Portal</h1>
          <p style={styles.logoSubtitle}>Restaurant CRM Platform</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome back</h2>
          <p style={styles.cardSubtitle}>
            Sign in to your sales account
          </p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                style={styles.input}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              style={isLoading ? styles.submitButtonDisabled : styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={styles.footer}>
          Restaurant Sales CRM &middot; Internal Use Only
        </p>
      </div>
    </div>
  );
};
