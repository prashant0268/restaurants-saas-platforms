import { type CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Station } from '../stores/kitchenStore';

interface DisplaySettings {
  soundAlerts: boolean;
  autoAdvance: boolean;
  fontSize: 'small' | 'medium' | 'large';
  defaultStation: Station;
  screenBrightness: number;
  showCompletedOrders: boolean;
}

export const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<DisplaySettings>({
    soundAlerts: true,
    autoAdvance: false,
    fontSize: 'medium',
    defaultStation: 'all',
    screenBrightness: 100,
    showCompletedOrders: false,
  });

  const updateSetting = <K extends keyof DisplaySettings>(
    key: K,
    value: DisplaySettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          Back to Kitchen
        </button>
        <h1 style={styles.title}>Display Settings</h1>
      </div>

      <div style={styles.card}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Alerts</h2>

          <div style={styles.settingRow}>
            <div>
              <span style={styles.settingLabel}>Sound Alerts</span>
              <span style={styles.settingDesc}>
                Play a sound when new orders arrive
              </span>
            </div>
            <button
              onClick={() => updateSetting('soundAlerts', !settings.soundAlerts)}
              style={{
                ...styles.toggle,
                backgroundColor: settings.soundAlerts ? '#22c55e' : '#d1d5db',
              }}
              aria-label="Toggle sound alerts"
            >
              <span
                style={{
                  ...styles.toggleKnob,
                  transform: settings.soundAlerts
                    ? 'translateX(20px)'
                    : 'translateX(0)',
                }}
              />
            </button>
          </div>

          <div style={styles.settingRow}>
            <div>
              <span style={styles.settingLabel}>Auto-Advance</span>
              <span style={styles.settingDesc}>
                Automatically move to next status after timer
              </span>
            </div>
            <button
              onClick={() => updateSetting('autoAdvance', !settings.autoAdvance)}
              style={{
                ...styles.toggle,
                backgroundColor: settings.autoAdvance ? '#22c55e' : '#d1d5db',
              }}
              aria-label="Toggle auto-advance"
            >
              <span
                style={{
                  ...styles.toggleKnob,
                  transform: settings.autoAdvance
                    ? 'translateX(20px)'
                    : 'translateX(0)',
                }}
              />
            </button>
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Display</h2>

          <div style={styles.settingRow}>
            <div>
              <span style={styles.settingLabel}>Font Size</span>
              <span style={styles.settingDesc}>
                Adjust text size for readability
              </span>
            </div>
            <div style={styles.buttonGroup}>
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSetting('fontSize', size)}
                  style={{
                    ...styles.sizeButton,
                    backgroundColor:
                      settings.fontSize === size
                        ? '#3b82f6'
                        : 'rgba(255,255,255,0.1)',
                    color:
                      settings.fontSize === size
                        ? '#fff'
                        : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.settingRow}>
            <div>
              <span style={styles.settingLabel}>Show Completed Orders</span>
              <span style={styles.settingDesc}>
                Display recently completed orders
              </span>
            </div>
            <button
              onClick={() =>
                updateSetting('showCompletedOrders', !settings.showCompletedOrders)
              }
              style={{
                ...styles.toggle,
                backgroundColor: settings.showCompletedOrders
                  ? '#22c55e'
                  : '#d1d5db',
              }}
              aria-label="Toggle show completed orders"
            >
              <span
                style={{
                  ...styles.toggleKnob,
                  transform: settings.showCompletedOrders
                    ? 'translateX(20px)'
                    : 'translateX(0)',
                }}
              />
            </button>
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Station</h2>

          <div style={styles.settingRow}>
            <div>
              <span style={styles.settingLabel}>Default Station</span>
              <span style={styles.settingDesc}>
                Set which station this display filters by default
              </span>
            </div>
            <select
              value={settings.defaultStation}
              onChange={(e) =>
                updateSetting('defaultStation', e.target.value as Station)
              }
              style={styles.select}
              aria-label="Default station"
            >
              <option value="all">All Stations</option>
              <option value="grill">Grill</option>
              <option value="fry">Fry</option>
              <option value="salad">Salad</option>
              <option value="drinks">Drinks</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    padding: 20,
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 600,
    marginBottom: 24,
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
  },
  card: {
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    padding: 28,
    width: '100%',
    maxWidth: 600,
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.9)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: '24px 0',
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: '#fff',
    display: 'block',
  },
  settingDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    display: 'block',
    marginTop: 2,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 3,
    left: 3,
    transition: 'transform 0.2s',
  },
  buttonGroup: {
    display: 'flex',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 3,
  },
  sizeButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  select: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid rgba(255,255,255,0.2)',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    outline: 'none',
    minWidth: 140,
  },
};
