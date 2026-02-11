import { type CSSProperties, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [stationCode, setStationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: Replace with Firebase auth / station verification
      if (stationCode.trim().length > 0) {
        navigate('/');
      } else {
        setError('Please enter a valid station code.');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Login failed. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Kitchen Display</h1>
        <p style={styles.subtitle}>Enter station code to begin</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Station Code
            <input
              type="text"
              value={stationCode}
              onChange={(e) => setStationCode(e.target.value)}
              placeholder="e.g. GRILL-01"
              required
              autoFocus
              style={styles.input}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            style={styles.button}
          >
            {isSubmitting ? 'Connecting...' : 'Connect Station'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
  },
  card: {
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    padding: 48,
    width: 420,
    maxWidth: '90vw',
    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: '#fff',
  },
  subtitle: {
    margin: '8px 0 32px',
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
  },
  error: {
    backgroundColor: 'rgba(239,68,68,0.15)',
    color: '#fca5a5',
    padding: '10px 14px',
    borderRadius: 6,
    marginBottom: 16,
    fontSize: 14,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.8)',
  },
  input: {
    padding: '14px 16px',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    outline: 'none',
    fontFamily: 'monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    padding: '14px 20px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 8,
  },
};
