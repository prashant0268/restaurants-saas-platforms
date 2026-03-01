import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  BarChart3,
  Megaphone,
  UtensilsCrossed,
  Tv,
  Package,
  Compass,
  DollarSign,
  FileText,
  Star,
  ArrowRight,
  Check,
  Globe,
  MessageSquareText,
  TrendingUp,
  Send,
  ShieldCheck,
  Search,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { FeatureList } from '../components/shared/FeatureList';
import { products } from '../data/mockProducts';
import { pricingTiers } from '../data/mockPricing';

const productIntros: Record<string, string> = {
  'customer-app':
    'Let your guests order Chicken Makhni, Lamb Biryani and more right from their phone.',
  'owner-dashboard':
    'Track every order from Tandoori to Desserts with real-time analytics built for your kitchen.',
  'social-media':
    'Promote your signature dishes like Goat Curry and Rasmalai across Instagram, Facebook and email.',
  'menu-builder':
    'Digitize all 8 categories — from Appetizers to Desserts — with dietary tags and photos.',
  'fire-tv':
    'Display your 38-item menu across 8 categories on in-store screens with auto-rotation.',
  'other-products':
    'Add order tracking, kitchen display, kiosk, delivery and a website — everything Pooja needs to scale.',
};


const proTier = pricingTiers.find((t) => t.id === 'professional')!;
const annualSavings = (proTier.monthlyPrice - proTier.annualPrice) * 12;

const proFeatures = [
  'Mobile Ordering App',
  'Unlimited menu items',
  'Owner Dashboard & Analytics',
  'Social Media Manager',
  'Fire TV Display',
  'Kitchen Display System',
  'Loyalty Program',
  'Table Reservations',
  'Personalized call support',
  'Email & Chat support',
];

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  hero: {
    textAlign: 'center',
    padding: '48px 32px 40px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    borderRadius: '16px',
    marginBottom: '40px',
    color: '#ffffff',
  },
  heroName: {
    fontSize: '36px',
    fontWeight: 700,
    margin: '0 0 8px',
    fontFamily: "'Playfair Display', Georgia, serif",
    letterSpacing: '0.5px',
  },
  heroTagline: {
    fontSize: '18px',
    fontWeight: 500,
    color: '#5eead4',
    margin: '0 0 12px',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: '#94a3b8',
    margin: 0,
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 6px',
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 24px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '48px',
  },
  opsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '48px',
  },
  productCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#ffffff',
  },
  productCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  productIconWrap: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#f0fdfa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0d9488',
    flexShrink: 0,
  },
  productName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  productIntro: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 14px',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  menuSection: {
    marginBottom: '48px',
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '14px',
    marginBottom: '16px',
  },
  menuCategoryCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '16px',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  menuCategoryEmoji: {
    fontSize: '28px',
    display: 'block',
    marginBottom: '6px',
  },
  menuCategoryName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 2px',
  },
  menuCategoryCount: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  menuSample: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
  },
  menuSampleChip: {
    fontSize: '12px',
    color: '#374151',
    backgroundColor: '#f3f4f6',
    padding: '4px 10px',
    borderRadius: '9999px',
  },
  menuFootnote: {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '14px',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  reviewsSection: {
    marginBottom: '48px',
  },
  reviewsBanner: {
    borderRadius: '14px',
    padding: '28px 32px',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginBottom: '20px',
  },
  reviewsBannerText: {
    flex: 1,
  },
  reviewsBannerTitle: {
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 6px',
  },
  reviewsBannerDesc: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: 0,
    lineHeight: 1.6,
  },
  reviewsStars: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexShrink: 0,
  },
  reviewsRating: {
    fontSize: '48px',
    fontWeight: 800,
    color: '#fbbf24',
    lineHeight: 1,
  },
  reviewsRatingLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '4px',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '20px',
  },
  reviewServiceCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '22px 20px',
    backgroundColor: '#ffffff',
  },
  reviewServiceIconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  reviewServiceIconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  reviewServiceName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  reviewServiceDesc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.5,
  },
  reviewsTestimonial: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px 24px',
    backgroundColor: '#fffbeb',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  testimonialQuote: {
    fontSize: '36px',
    color: '#f59e0b',
    lineHeight: 1,
    fontFamily: 'Georgia, serif',
    flexShrink: 0,
  },
  testimonialText: {
    fontSize: '14px',
    color: '#374151',
    margin: '0 0 6px',
    lineHeight: 1.6,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
    fontWeight: 500,
  },
  pricingSection: {
    marginBottom: '48px',
  },
  pricingCard: {
    border: '2px solid #0d9488',
    borderRadius: '14px',
    padding: '32px',
    backgroundColor: '#ffffff',
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
  },
  pricingLeft: {
    flex: '0 0 260px',
  },
  pricingBadge: {
    display: 'inline-block',
    backgroundColor: '#ccfbf1',
    color: '#0d9488',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    padding: '4px 10px',
    borderRadius: '9999px',
    marginBottom: '10px',
  },
  pricingName: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px',
  },
  pricingDesc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 16px',
    lineHeight: 1.5,
  },
  pricingPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '4px',
  },
  pricingAmount: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#111827',
  },
  pricingPeriod: {
    fontSize: '14px',
    color: '#6b7280',
  },
  pricingAnnual: {
    fontSize: '13px',
    color: '#0d9488',
    margin: '0 0 12px',
    fontWeight: 500,
  },
  pricingLink: {
    fontSize: '13px',
    color: '#0d9488',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontWeight: 500,
    textDecoration: 'underline',
  },
  pricingRight: {
    flex: 1,
  },
  pricingFeaturesTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    margin: '0 0 12px',
  },
  pricingFeaturesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  },
  pricingFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#374151',
  },
  ctaSection: {
    marginBottom: '32px',
  },
  ctaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  ctaCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '28px 24px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    textAlign: 'center',
  },
  ctaIconWrap: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#f0fdfa',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0d9488',
    marginBottom: '12px',
  },
  ctaTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 6px',
  },
  ctaDesc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 14px',
    lineHeight: 1.5,
  },
  ctaArrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#0d9488',
  },
};

export const CustomerPitchPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Header
        title="Customer Pitch"
        subtitle="Personalized platform overview for Pooja Exotic Indian Cuisine"
      />

      {/* Hero */}
      <div style={styles.hero}>
        <h2 style={styles.heroName}>Pooja Exotic Indian Cuisine</h2>
        <p style={styles.heroTagline}>Your Complete Digital Restaurant Platform</p>
        <p style={styles.heroSubtitle}>
          Welcome! We've prepared a personalized overview of how our platform will
          digitize and grow your restaurant — from mobile ordering to in-store displays.
        </p>
      </div>

      {/* Customer-Facing Products */}
      <h2 style={styles.sectionTitle}>What We'll Build For You</h2>
      <p style={styles.sectionSubtitle}>
        Customer-facing products that drive revenue, reviews, and repeat visits for Pooja.
      </p>
      <div style={styles.productGrid}>
        {/* Website / Google */}
        <div style={styles.productCard}>
          <div style={styles.productCardHeader}>
            <div style={styles.productIconWrap}>
              <Globe size={20} />
            </div>
            <h3 style={styles.productName}>Website & Google</h3>
          </div>
          <p style={styles.productIntro}>
            Put Pooja on the map — optimize your Google listing, collect 5-star reviews, and rank #1 for "Indian food near me."
          </p>
          <FeatureList
            features={[
              'Google Business Profile optimization',
              'Automated review collection via SMS & email',
              'AI-powered review responses',
              'Local SEO & search ranking boost',
              'Reputation monitoring & alerts',
            ]}
          />
        </div>

        {/* Mobile App */}
        {(() => {
          const p = products.find((x) => x.id === 'customer-app')!;
          return (
            <div style={styles.productCard}>
              <div style={styles.productCardHeader}>
                <div style={styles.productIconWrap}>
                  <Smartphone size={20} />
                </div>
                <h3 style={styles.productName}>Mobile App</h3>
              </div>
              <p style={styles.productIntro}>{productIntros[p.id]}</p>
              <FeatureList features={p.features} />
            </div>
          );
        })()}

        {/* AI-Oriented Marketing */}
        <div style={styles.productCard}>
          <div style={styles.productCardHeader}>
            <div style={styles.productIconWrap}>
              <Sparkles size={20} />
            </div>
            <h3 style={styles.productName}>AI Marketing</h3>
          </div>
          <p style={styles.productIntro}>
            Intelligent marketing for Pooja — personalized deals for repeat customers, smart notifications, and automated growth campaigns.
          </p>
          <FeatureList
            features={[
              'Personalized deals for repeat customers',
              'Smart push & SMS notifications',
              'AI-powered offer recommendations',
              'Birthday & anniversary surprises',
              'Churn prediction & win-back campaigns',
            ]}
          />
        </div>

        {/* Social Media Manager */}
        {(() => {
          const p = products.find((x) => x.id === 'social-media')!;
          return (
            <div style={styles.productCard}>
              <div style={styles.productCardHeader}>
                <div style={styles.productIconWrap}>
                  <Megaphone size={20} />
                </div>
                <h3 style={styles.productName}>{p.name}</h3>
              </div>
              <p style={styles.productIntro}>{productIntros[p.id]}</p>
              <FeatureList features={p.features} />
            </div>
          );
        })()}

        {/* TV Display */}
        {(() => {
          const p = products.find((x) => x.id === 'fire-tv')!;
          return (
            <div style={styles.productCard}>
              <div style={styles.productCardHeader}>
                <div style={styles.productIconWrap}>
                  <Tv size={20} />
                </div>
                <h3 style={styles.productName}>TV Display</h3>
              </div>
              <p style={styles.productIntro}>{productIntros[p.id]}</p>
              <FeatureList features={p.features} />
            </div>
          );
        })()}

        {/* Digital Menu */}
        <div style={styles.productCard}>
          <div style={styles.productCardHeader}>
            <div style={styles.productIconWrap}>
              <UtensilsCrossed size={20} />
            </div>
            <h3 style={styles.productName}>Digital Menu</h3>
          </div>
          <p style={styles.productIntro}>
            Give every guest instant access to Pooja's full menu via QR code — no app download needed.
          </p>
          <FeatureList
            features={[
              'QR code table-side menu access',
              'Real-time pricing & availability',
              'Dietary filters: vegetarian, vegan, GF',
              'High-res photos for every dish',
              'Multilingual support',
            ]}
          />
        </div>

        {/* Printables */}
        <div style={styles.productCard}>
          <div style={styles.productCardHeader}>
            <div style={styles.productIconWrap}>
              <Printer size={20} />
            </div>
            <h3 style={styles.productName}>Printables</h3>
          </div>
          <p style={styles.productIntro}>
            Professional printed materials for Pooja — menus, QR codes, Google review links, table tent cards, and more.
          </p>
          <FeatureList
            features={[
              'Custom-printed restaurant menus',
              'QR code stickers for table ordering',
              'Google review cards for easy feedback',
              'Dietary restriction & allergy cards',
              'Table tent cards & promotional inserts',
            ]}
          />
        </div>
      </div>

      {/* Operations & Management */}
      <h2 style={styles.sectionTitle}>Operations & Management</h2>
      <p style={styles.sectionSubtitle}>
        Behind-the-scenes tools to run Pooja's kitchen, staff, and growth efficiently.
      </p>
      <div style={styles.opsGrid}>
        {/* Owner Dashboard */}
        {(() => {
          const p = products.find((x) => x.id === 'owner-dashboard')!;
          return (
            <div style={styles.productCard}>
              <div style={styles.productCardHeader}>
                <div style={styles.productIconWrap}>
                  <BarChart3 size={20} />
                </div>
                <h3 style={styles.productName}>{p.name}</h3>
              </div>
              <p style={styles.productIntro}>{productIntros[p.id]}</p>
              <FeatureList features={p.features} />
            </div>
          );
        })()}

        {/* Menu Builder */}
        {(() => {
          const p = products.find((x) => x.id === 'menu-builder')!;
          return (
            <div style={styles.productCard}>
              <div style={styles.productCardHeader}>
                <div style={styles.productIconWrap}>
                  <UtensilsCrossed size={20} />
                </div>
                <h3 style={styles.productName}>{p.name}</h3>
              </div>
              <p style={styles.productIntro}>{productIntros[p.id]}</p>
              <FeatureList features={p.features} />
            </div>
          );
        })()}

        {/* More Products */}
        {(() => {
          const p = products.find((x) => x.id === 'other-products')!;
          const reorderedFeatures = [
            'Self-service Kiosk App',
            'Kitchen Display System',
            'Driver App for deliveries',
            'Order Tracker for customers',
            'Website Builder & SEO',
          ];
          return (
            <div style={styles.productCard}>
              <div style={styles.productCardHeader}>
                <div style={styles.productIconWrap}>
                  <Package size={20} />
                </div>
                <h3 style={styles.productName}>{p.name}</h3>
              </div>
              <p style={styles.productIntro}>{productIntros[p.id]}</p>
              <FeatureList features={reorderedFeatures} />
            </div>
          );
        })()}
      </div>


      {/* Website / Google Reviews */}
      <div style={styles.reviewsSection}>
        <h2 style={styles.sectionTitle}>Website & Google Reviews</h2>
        <p style={styles.sectionSubtitle}>
          Turn every happy guest at Pooja into a 5-star review — automatically.
        </p>

        {/* Rating banner */}
        <div style={styles.reviewsBanner}>
          <div style={styles.reviewsBannerText}>
            <p style={styles.reviewsBannerTitle}>
              Boost Pooja's Online Reputation
            </p>
            <p style={styles.reviewsBannerDesc}>
              90% of diners check reviews before trying a new restaurant. We'll help Pooja
              Exotic Indian Cuisine collect more reviews, respond faster, and climb local
              search rankings — so when someone searches "Indian food near me," you're on top.
            </p>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={styles.reviewsStars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={20}
                  color="#fbbf24"
                  fill={n <= 4 ? '#fbbf24' : 'none'}
                />
              ))}
            </div>
            <p style={styles.reviewsRating}>4.8</p>
            <p style={styles.reviewsRatingLabel}>Target rating</p>
          </div>
        </div>

        {/* Service cards */}
        <div style={styles.reviewsGrid}>
          {[
            {
              icon: <Send size={18} />,
              bg: '#eff6ff',
              color: '#2563eb',
              name: 'Automated Review Requests',
              desc: 'After every order or reservation, guests receive a friendly SMS or email asking them to rate their experience at Pooja.',
            },
            {
              icon: <Globe size={18} />,
              bg: '#f0fdfa',
              color: '#0d9488',
              name: 'Google Business Optimization',
              desc: 'We optimize your Google Business Profile — photos of Chicken Makhni, updated hours, menu link, and category tags for maximum visibility.',
            },
            {
              icon: <MessageSquareText size={18} />,
              bg: '#fdf4ff',
              color: '#a855f7',
              name: 'AI Review Responses',
              desc: 'Every review gets a thoughtful, personalized reply — thank loyal fans, address concerns, and show new guests you care.',
            },
            {
              icon: <TrendingUp size={18} />,
              bg: '#fff7ed',
              color: '#ea580c',
              name: 'Ratings Dashboard & Insights',
              desc: 'Track your average rating, review volume, and sentiment trends across Google, Yelp, and your website in one dashboard.',
            },
            {
              icon: <Search size={18} />,
              bg: '#fefce8',
              color: '#ca8a04',
              name: 'Local SEO & Search Ranking',
              desc: 'Rank higher for "Indian restaurant" and "biryani near me" with optimized keywords, structured data, and consistent NAP listings.',
            },
            {
              icon: <ShieldCheck size={18} />,
              bg: '#f0fdf4',
              color: '#16a34a',
              name: 'Reputation Monitoring & Alerts',
              desc: 'Get instant alerts for new reviews and negative feedback so you can respond within minutes — before it impacts your rating.',
            },
          ].map((service) => (
            <div key={service.name} style={styles.reviewServiceCard}>
              <div style={styles.reviewServiceIconRow}>
                <div
                  style={{
                    ...styles.reviewServiceIconWrap,
                    backgroundColor: service.bg,
                    color: service.color,
                  }}
                >
                  {service.icon}
                </div>
                <h3 style={styles.reviewServiceName}>{service.name}</h3>
              </div>
              <p style={styles.reviewServiceDesc}>{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Sample testimonial */}
        <div style={styles.reviewsTestimonial}>
          <span style={styles.testimonialQuote}>"</span>
          <div>
            <p style={styles.testimonialText}>
              Best Indian food in town! The Chicken Makhni is incredibly creamy and flavorful, and
              the Lamb Biryani is perfectly spiced. Service was warm and attentive. Will definitely
              be coming back with friends.
            </p>
            <p style={styles.testimonialAuthor}>
              — Sample 5-star review your guests will leave on Google
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={styles.pricingSection}>
        <h2 style={styles.sectionTitle}>Recommended Plan</h2>
        <p style={styles.sectionSubtitle}>
          The Professional plan covers everything Pooja needs to get started.
        </p>
        <div style={styles.pricingCard}>
          <div style={styles.pricingLeft}>
            <div style={styles.pricingBadge}>
              <Star size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Recommended
            </div>
            <h3 style={styles.pricingName}>{proTier.name}</h3>
            <p style={styles.pricingDesc}>{proTier.description}</p>
            <div style={styles.pricingPriceRow}>
              <span style={styles.pricingAmount}>${proTier.monthlyPrice}</span>
              <span style={styles.pricingPeriod}>/month</span>
            </div>
            <p style={styles.pricingAnnual}>
              Or ${proTier.annualPrice}/mo billed annually — save ${annualSavings}/year
            </p>
            <button
              style={styles.pricingLink}
              onClick={() => navigate('/pricing')}
            >
              View All Plans
            </button>
          </div>
          <div style={styles.pricingRight}>
            <p style={styles.pricingFeaturesTitle}>What's included:</p>
            <ul style={styles.pricingFeaturesList}>
              {proFeatures.map((feat) => (
                <li key={feat} style={styles.pricingFeatureItem}>
                  <Check size={14} color="#0d9488" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.sectionTitle}>Next Steps</h2>
        <p style={styles.sectionSubtitle}>Ready to get started? Pick your path.</p>
        <div style={styles.ctaGrid}>
          <div
            style={styles.ctaCard}
            onClick={() => navigate('/customer-app')}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#0d9488';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(13,148,136,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={styles.ctaIconWrap}>
              <Compass size={22} />
            </div>
            <h3 style={styles.ctaTitle}>Explore Products</h3>
            <p style={styles.ctaDesc}>Take a guided tour of every feature we offer.</p>
            <span style={styles.ctaArrow}>
              Start Tour <ArrowRight size={14} />
            </span>
          </div>
          <div
            style={styles.ctaCard}
            onClick={() => navigate('/pricing')}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#0d9488';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(13,148,136,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={styles.ctaIconWrap}>
              <DollarSign size={22} />
            </div>
            <h3 style={styles.ctaTitle}>View Pricing</h3>
            <p style={styles.ctaDesc}>Compare plans and find the right fit for Pooja.</p>
            <span style={styles.ctaArrow}>
              See Plans <ArrowRight size={14} />
            </span>
          </div>
          <div
            style={styles.ctaCard}
            onClick={() => navigate('/contract')}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#0d9488';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(13,148,136,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={styles.ctaIconWrap}>
              <FileText size={22} />
            </div>
            <h3 style={styles.ctaTitle}>Create Contract</h3>
            <p style={styles.ctaDesc}>Generate a ready-to-sign service agreement.</p>
            <span style={styles.ctaArrow}>
              Get Started <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
