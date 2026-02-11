import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';

interface FeatureSection {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
}

const featureSections: FeatureSection[] = [
  {
    id: 'ordering',
    title: 'Online Ordering',
    description:
      'Accept orders from every channel: your website, mobile app, self-service kiosks, and third-party platforms. All orders flow into a single unified system.',
    highlights: [
      'Custom branded ordering website',
      'Self-service kiosk application',
      'Mobile-optimized checkout',
      'Real-time order notifications',
      'Modifier and customization support',
      'Scheduled orders and pre-ordering',
    ],
    icon: '&#128187;',
  },
  {
    id: 'delivery',
    title: 'Delivery Management',
    description:
      'Manage your own delivery fleet or integrate with third-party couriers. Track every delivery in real time from kitchen to doorstep.',
    highlights: [
      'Driver dispatch and routing',
      'Real-time GPS tracking for customers',
      'Delivery zone configuration',
      'Third-party courier integration',
      'Automated delivery fee calculation',
      'Driver performance analytics',
    ],
    icon: '&#128666;',
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    description:
      'Make data-driven decisions with comprehensive analytics. Track sales, popular items, peak hours, and customer behavior across all locations.',
    highlights: [
      'Real-time sales dashboard',
      'Revenue and profit tracking',
      'Popular items and category reports',
      'Peak hours and demand forecasting',
      'Customer lifetime value analysis',
      'Exportable reports (CSV, PDF)',
    ],
    icon: '&#128200;',
  },
  {
    id: 'marketing',
    title: 'Marketing & Loyalty',
    description:
      'Grow your customer base with built-in marketing tools. Create promotions, manage loyalty programs, and send targeted campaigns.',
    highlights: [
      'Loyalty points and rewards program',
      'Promotional codes and discounts',
      'Email and SMS campaigns',
      'Push notifications',
      'Customer segmentation',
      'Automated re-engagement campaigns',
    ],
    icon: '&#128227;',
  },
  {
    id: 'kitchen',
    title: 'Kitchen Display System',
    description:
      'Replace paper tickets with a digital kitchen display. Orders appear instantly, organized by priority, with preparation timers and status tracking.',
    highlights: [
      'Real-time order display',
      'Priority and timing management',
      'Station-based routing',
      'Preparation time tracking',
      'Order bump and completion workflow',
      'Multi-screen support',
    ],
    icon: '&#127859;',
  },
];

const styles: Record<string, CSSProperties> = {
  header: {
    textAlign: 'center',
    padding: '80px 48px 48px',
  },
  title: {
    fontSize: 42,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    margin: 0,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  },
  section: {
    padding: '64px 48px',
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    gap: 64,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sectionReverse: {
    padding: '64px 48px',
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    gap: 64,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
  },
  textContent: {
    flex: '1 1 400px',
  },
  sectionIcon: {
    fontSize: 48,
    marginBottom: 16,
    display: 'block',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 17,
    color: '#6b7280',
    margin: 0,
    marginBottom: 24,
    lineHeight: 1.7,
  },
  highlightList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 12,
  },
  highlightItem: {
    fontSize: 15,
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    lineHeight: 1.5,
  },
  check: {
    color: '#10b981',
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  imagePlaceholder: {
    flex: '1 1 360px',
    minHeight: 280,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 80,
    color: '#e5e7eb',
    border: '1px solid #f0f0f0',
  },
  divider: {
    maxWidth: 1200,
    margin: '0 auto',
    border: 'none',
    borderTop: '1px solid #f0f0f0',
  },
  ctaSection: {
    padding: '80px 48px',
    textAlign: 'center',
    backgroundColor: '#fafafa',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    margin: 0,
    marginBottom: 32,
  },
  ctaButton: {
    padding: '16px 48px',
    fontSize: 17,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 10,
    textDecoration: 'none',
    display: 'inline-block',
  },
};

export const FeaturesPage = () => {
  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>All the Features You Need</h1>
        <p style={styles.subtitle}>
          A complete platform to manage ordering, delivery, analytics,
          marketing, and kitchen operations.
        </p>
      </div>

      {featureSections.map((feature, idx) => (
        <div key={feature.id}>
          {idx > 0 && <hr style={styles.divider} />}
          <section
            style={idx % 2 === 0 ? styles.section : styles.sectionReverse}
          >
            <div style={styles.textContent}>
              <span
                style={styles.sectionIcon}
                dangerouslySetInnerHTML={{ __html: feature.icon }}
                aria-hidden="true"
              />
              <h2 style={styles.sectionTitle}>{feature.title}</h2>
              <p style={styles.sectionDescription}>{feature.description}</p>
              <ul style={styles.highlightList}>
                {feature.highlights.map((h) => (
                  <li key={h} style={styles.highlightItem}>
                    <span style={styles.check}>&#10003;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={styles.imagePlaceholder} aria-hidden="true">
              <span
                dangerouslySetInnerHTML={{ __html: feature.icon }}
              />
            </div>
          </section>
        </div>
      ))}

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>See It in Action</h2>
        <p style={styles.ctaSubtitle}>
          Start your free trial today and explore all features
        </p>
        <Link to="/contact" style={styles.ctaButton}>
          Get Started Free
        </Link>
      </section>
    </div>
  );
};
