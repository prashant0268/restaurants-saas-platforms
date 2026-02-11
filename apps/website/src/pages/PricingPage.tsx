import { type CSSProperties } from 'react';
import { PricingCard } from '../components/shared/PricingCard';

const styles: Record<string, CSSProperties> = {
  container: {
    padding: '80px 48px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 64,
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
    maxWidth: 560,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  },
  cardsRow: {
    display: 'flex',
    gap: 32,
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  faq: {
    marginTop: 80,
    textAlign: 'center',
  },
  faqTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 32,
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 24,
    textAlign: 'left',
  },
  faqItem: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    border: '1px solid #f0f0f0',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 15,
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.6,
  },
};

const plans = [
  {
    name: 'Basic',
    price: 49,
    description: 'Perfect for single-location restaurants just getting started.',
    features: [
      'Online ordering website',
      'Up to 50 menu items',
      'Basic analytics',
      'Email support',
      'Self-service kiosk (1 device)',
      'Standard payment processing',
    ],
  },
  {
    name: 'Professional',
    price: 99,
    description: 'For growing restaurants that need more power and flexibility.',
    features: [
      'Everything in Basic',
      'Unlimited menu items',
      'Advanced analytics & reports',
      'Priority support',
      'Self-service kiosk (up to 5)',
      'Delivery management',
      'Marketing tools & promotions',
      'Kitchen display system',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 199,
    description: 'For multi-location operations with advanced needs.',
    features: [
      'Everything in Professional',
      'Multi-location management',
      'Unlimited kiosk devices',
      'Custom branding & white-label',
      'API access & integrations',
      'Dedicated account manager',
      'Custom reports & exports',
      'SLA & uptime guarantee',
    ],
  },
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We integrate with all major payment processors including Stripe, Square, and PayPal for your customers.',
  },
  {
    question: 'Do you charge transaction fees?',
    answer: 'We do not charge any additional transaction fees. You only pay your payment processor\'s standard rates.',
  },
];

export const PricingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Simple, Transparent Pricing</h1>
        <p style={styles.subtitle}>
          Choose the plan that fits your restaurant. All plans include a
          14-day free trial.
        </p>
      </div>

      <div style={styles.cardsRow}>
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            highlighted={plan.highlighted}
          />
        ))}
      </div>

      <div style={styles.faq}>
        <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
        <div style={styles.faqGrid}>
          {faqs.map((faq) => (
            <div key={faq.question} style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>{faq.question}</h3>
              <p style={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
