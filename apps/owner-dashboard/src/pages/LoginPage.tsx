export const LoginPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Restaurant Dashboard</h1>
        <p style={styles.subtitle}>Sign in to manage your restaurant</p>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" placeholder="owner@restaurant.com" />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" placeholder="Enter password" />
        </div>

        <button style={styles.loginBtn}>Sign In</button>

        <div style={styles.divider}><span>or</span></div>

        <button style={styles.googleBtn}>Sign in with Google</button>

        <p style={styles.forgotLink}>Forgot password?</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 40, width: 400, border: '1px solid #E5E5E5' },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 4, textAlign: 'center' as const },
  subtitle: { fontSize: 14, color: '#737373', marginBottom: 32, textAlign: 'center' as const },
  field: { marginBottom: 16 },
  label: { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#525252' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #E5E5E5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' as const },
  loginBtn: { width: '100%', padding: '10px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600, marginTop: 8 },
  divider: { textAlign: 'center' as const, margin: '20px 0', color: '#A3A3A3', fontSize: 13 },
  googleBtn: { width: '100%', padding: '10px', backgroundColor: '#fff', color: '#525252', border: '1px solid #E5E5E5', borderRadius: 6, cursor: 'pointer', fontSize: 14 },
  forgotLink: { textAlign: 'center' as const, marginTop: 16, fontSize: 13, color: '#3B82F6', cursor: 'pointer' },
};
