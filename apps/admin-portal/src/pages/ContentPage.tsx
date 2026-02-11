import type { CSSProperties } from 'react';
import { PageContainer } from '../components/layout/PageContainer';

const styles: Record<string, CSSProperties> = {
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 24px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  placeholder: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '32px 24px',
    textAlign: 'center' as const,
    color: '#9ca3af',
    fontSize: '14px',
    border: '1px dashed #e5e7eb',
  },
  announcementItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
  },
  announcementTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  announcementMeta: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '0 0 8px 0',
  },
  announcementBody: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.5',
  },
  addBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
};

export const ContentPage = () => {
  return (
    <PageContainer title="Content Management">
      <h1 style={styles.title}>Content Management</h1>

      <div style={styles.grid}>
        {/* Announcements */}
        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.cardTitle}>Announcements</h3>
            <button style={styles.addBtn}>New Announcement</button>
          </div>
          <div style={styles.announcementItem}>
            <p style={styles.announcementTitle}>System Maintenance Scheduled</p>
            <p style={styles.announcementMeta}>
              Published: Feb 8, 2026 | Target: All Users
            </p>
            <p style={styles.announcementBody}>
              Our platform will undergo scheduled maintenance tonight. Expect
              brief downtime between 2:00 AM and 4:00 AM UTC.
            </p>
          </div>
          <div style={styles.announcementItem}>
            <p style={styles.announcementTitle}>New Feature: Real-time Tracking</p>
            <p style={styles.announcementMeta}>
              Published: Feb 5, 2026 | Target: Customers
            </p>
            <p style={styles.announcementBody}>
              We have launched real-time delivery tracking for all orders.
              Customers can now see their driver on a live map.
            </p>
          </div>
          <div style={styles.announcementItem}>
            <p style={styles.announcementTitle}>Updated Commission Structure</p>
            <p style={styles.announcementMeta}>
              Published: Jan 28, 2026 | Target: Restaurant Owners
            </p>
            <p style={styles.announcementBody}>
              We are updating our commission tiers effective March 1, 2026.
              Please review the new rates in your dashboard.
            </p>
          </div>
        </div>

        {/* Promotional Banners */}
        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.cardTitle}>Promotional Banners</h3>
            <button style={styles.addBtn}>Add Banner</button>
          </div>
          <div style={styles.placeholder}>
            Banner management placeholder -- Upload, schedule, and manage
            promotional banners shown in the customer app. Configure target
            audience, display dates, and click-through URLs
          </div>
        </div>

        {/* Push Notifications */}
        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.cardTitle}>Push Notifications</h3>
            <button style={styles.addBtn}>Send Notification</button>
          </div>
          <div style={styles.placeholder}>
            Push notification management placeholder -- Compose and send push
            notifications to users, restaurant owners, or drivers. View
            delivery stats and engagement metrics
          </div>
        </div>

        {/* FAQ / Help Content */}
        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.cardTitle}>FAQ &amp; Help Articles</h3>
            <button style={styles.addBtn}>Add Article</button>
          </div>
          <div style={styles.placeholder}>
            FAQ management placeholder -- Create and edit help articles
            and FAQ entries displayed in the app. Organize by category
            and manage search keywords
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
