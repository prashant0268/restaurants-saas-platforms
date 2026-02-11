import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/shared/FeatureCard';
import { TestimonialCard } from '../components/shared/TestimonialCard';

const styles: Record<string, CSSProperties> = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '96px 48px 80px',
    backgroundColor: '#fafafa',
  },
  heroTag: {
    fontSize: 14,
    fontWeight: 600,
    color: '#e63946',
    backgroundColor: '#fef2f2',
    padding: '6px 16px',
    borderRadius: 20,
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 20,
    maxWidth: 800,
    lineHeight: 1.1,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#6b7280',
    margin: 0,
    marginBottom: 40,
    maxWidth: 600,
    lineHeight: 1.6,
  },
  heroCtas: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryCta: {
    padding: '16px 36px',
    fontSize: 17,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 10,
    textDecoration: 'none',
    transition: 'background-color 0.2s',
  },
  secondaryCta: {
    padding: '16px 36px',
    fontSize: 17,
    fontWeight: 700,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    border: '2px solid #e5e7eb',
    borderRadius: 10,
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  section: {
    padding: '80px 48px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    margin: 0,
    marginBottom: 48,
    textAlign: 'center',
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  },
  stepsRow: {
    display: 'flex',
    gap: 32,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  step: {
    flex: '1 1 250px',
    maxWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 16,
  },
  stepNumber: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e63946',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 700,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  stepDescription: {
    fontSize: 15,
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.6,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
  },
  testimonialRow: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
  },
  ctaSection: {
    padding: '80px 48px',
    backgroundColor: '#e63946',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
    marginBottom: 32,
  },
  ctaButton: {
    padding: '16px 48px',
    fontSize: 18,
    fontWeight: 700,
    backgroundColor: '#ffffff',
    color: '#e63946',
    border: 'none',
    borderRadius: 10,
    textDecoration: 'none',
    display: 'inline-block',
  },
};

const steps = [
  {
    number: 1,
    title: 'Sign Up',
    description:
      'Create your restaurant profile in minutes. No technical skills required.',
  },
  {
    number: 2,
    title: 'Set Up Your Menu',
    description:
      'Upload your menu with photos, prices, and modifiers. We make it easy.',
  },
  {
    number: 3,
    title: 'Start Receiving Orders',
    description:
      'Go live and accept orders from your kiosk, website, or mobile app.',
  },
];

const features = [
  {
    title: 'Online Ordering',
    description: 'Accept orders from your website, app, and in-store kiosks with a unified platform.',
    icon: '&#128187;',
  },
  {
    title: 'Delivery Management',
    description: 'Integrated delivery tracking with driver dispatch and real-time customer updates.',
    icon: '&#128666;',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track sales, popular items, peak hours, and customer behavior in real time.',
    icon: '&#128200;',
  },
  {
    title: 'Marketing Tools',
    description: 'Send promotions, loyalty rewards, and targeted campaigns to your customers.',
    icon: '&#128227;',
  },
  {
    title: 'Kitchen Display',
    description: 'Digital kitchen display system that streamlines order preparation and reduces errors.',
    icon: '&#127859;',
  },
  {
    title: 'Multi-Location',
    description: 'Manage multiple restaurant locations from a single dashboard with unified reporting.',
    icon: '&#127970;',
  },
];

const testimonials = [
  {
    quote: 'Since switching to RestaurantOS, our online orders have increased by 40%. The kiosk system has been a game changer for our lunch rush.',
    author: 'Maria Santos',
    role: 'Owner',
    restaurant: 'Casa Bonita',
  },
  {
    quote: 'The analytics dashboard gives us insights we never had before. We optimized our menu and saw a 25% increase in average order value.',
    author: 'James Chen',
    role: 'General Manager',
    restaurant: 'Golden Dragon',
  },
  {
    quote: 'Setup was incredibly easy. We were live and accepting orders within a day. The support team is also fantastic.',
    author: 'Sarah Johnson',
    role: 'Owner',
    restaurant: 'The Corner Bistro',
  },
];

export const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <span style={styles.heroTag}>The #1 Restaurant Platform</span>
        <h1 style={styles.heroTitle}>
          Everything Your Restaurant Needs to Thrive
        </h1>
        <p style={styles.heroSubtitle}>
          Streamline ordering, delivery, analytics, and marketing in one
          powerful platform built for modern restaurants.
        </p>
        <div style={styles.heroCtas}>
          <Link to="/contact" style={styles.primaryCta}>
            Get Started Free
          </Link>
          <Link to="/features" style={styles.secondaryCta}>
            See All Features
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <p style={styles.sectionSubtitle}>
          Get your restaurant online in three simple steps
        </p>
        <div style={styles.stepsRow}>
          {steps.map((step) => (
            <div key={step.number} style={styles.step}>
              <div style={styles.stepNumber}>{step.number}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ ...styles.section, backgroundColor: '#fafafa' }}>
        <h2 style={styles.sectionTitle}>Powerful Features</h2>
        <p style={styles.sectionSubtitle}>
          Everything you need to run a successful restaurant
        </p>
        <div style={styles.featureGrid}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              iconPlaceholder={feature.icon}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Loved by Restaurants</h2>
        <p style={styles.sectionSubtitle}>
          Hear from restaurant owners who transformed their business
        </p>
        <div style={styles.testimonialRow}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Transform Your Restaurant?</h2>
        <p style={styles.ctaSubtitle}>
          Join thousands of restaurants already using RestaurantOS
        </p>
        <Link to="/contact" style={styles.ctaButton}>
          Start Your Free Trial
        </Link>
      </section>
    </div>
  );
};
