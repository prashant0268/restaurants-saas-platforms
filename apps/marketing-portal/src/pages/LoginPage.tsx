import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Marketing Portal</h1>
          <p style={styles.subtitle}>Restaurant Platform</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>Sign In</h2>
          <p style={styles.formDescription}>
            Enter your credentials to access the marketing dashboard.
          </p>

          {error && (
            <div style={styles.errorBanner}>
              {error}
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@restaurant.com"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div style={styles.forgotRow}>
            <label style={styles.rememberLabel}>
              <input type="checkbox" style={styles.checkbox} />
              Remember me
            </label>
            <button type="button" style={styles.forgotLink}>
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitButton,
              ...(isLoading ? styles.submitButtonDisabled : {}),
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footer}>
          Marketing team access only. Contact your administrator for access.
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 40,
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: 32,
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: '#6c63ff',
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: 14,
    color: '#a0aec0',
  },
  form: {
    marginBottom: 24,
  },
  formTitle: {
    margin: '0 0 4px',
    fontSize: 20,
    fontWeight: 600,
    color: '#1a202c',
  },
  formDescription: {
    margin: '0 0 24px',
    fontSize: 14,
    color: '#718096',
  },
  errorBanner: {
    padding: '10px 14px',
    backgroundColor: '#fed7d7',
    color: '#9b2c2c',
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 500,
    color: '#4a5568',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  },
  forgotRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    color: '#4a5568',
    cursor: 'pointer',
  },
  checkbox: {
    cursor: 'pointer',
  },
  forgotLink: {
    background: 'none',
    border: 'none',
    color: '#6c63ff',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
  },
  submitButton: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 600,
    transition: 'background-color 0.2s',
  },
  submitButtonDisabled: {
    backgroundColor: '#a0aec0',
    cursor: 'not-allowed',
  },
  footer: {
    textAlign: 'center' as const,
    fontSize: 12,
    color: '#a0aec0',
    margin: 0,
  },
};
