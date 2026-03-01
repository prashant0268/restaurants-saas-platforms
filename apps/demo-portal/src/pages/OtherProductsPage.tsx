import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Header } from '../components/layout/Header';
import { FeatureList } from '../components/shared/FeatureList';
import { MockPhoneFrame } from '../components/shared/MockPhoneFrame';
import { MockDashboardFrame } from '../components/shared/MockDashboardFrame';

type TabKey =
  | 'order-tracker'
  | 'kitchen-display'
  | 'kiosk'
  | 'driver-app'
  | 'website-builder'
  | 'delivery-integrations'
  | 'pos-integration';

interface TabConfig {
  key: TabKey;
  label: string;
  description: string;
  features: string[];
}

const tabs: TabConfig[] = [
  {
    key: 'order-tracker',
    label: 'Order Tracker',
    description:
      'Give your customers real-time visibility into their order status with live tracking, push notifications, and estimated delivery times.',
    features: [
      'Real-time GPS tracking',
      'Push notification updates',
      'Delivery ETA countdown',
      'Driver contact info',
      'Order modification requests',
    ],
  },
  {
    key: 'kitchen-display',
    label: 'Kitchen Display',
    description:
      'Streamline your kitchen operations with a digital display system that manages order queues, tracks prep times, and routes tickets to the right stations.',
    features: [
      'Order queue management',
      'Prep time tracking',
      'Priority ordering',
      'Station routing',
      'Ticket management',
    ],
  },
  {
    key: 'kiosk',
    label: 'Kiosk App',
    description:
      'Enable self-service ordering with an intuitive kiosk application that supports contactless payments, upselling, and multiple languages.',
    features: [
      'Self-service ordering',
      'Contactless payment',
      'Upsell suggestions',
      'Multi-language support',
      'Accessibility compliant',
    ],
  },
  {
    key: 'driver-app',
    label: 'Driver App',
    description:
      'Equip your delivery drivers with a powerful mobile app featuring optimized routing, earnings tracking, and proof-of-delivery capture.',
    features: [
      'Route optimization',
      'Earnings tracking',
      'Delivery proof capture',
      'Real-time navigation',
      'Batch delivery support',
    ],
  },
  {
    key: 'website-builder',
    label: 'Website Builder',
    description:
      'Create a stunning restaurant website with built-in online ordering, SEO optimization, and seamless integration with your existing systems.',
    features: [
      'Custom domain support',
      'SEO optimization',
      'Online ordering integration',
      'Photo gallery',
      'Google Maps integration',
    ],
  },
  {
    key: 'delivery-integrations',
    label: 'Delivery Integrations',
    description:
      'Expand your reach by integrating with major delivery platforms. Manage orders from Grubhub, Seamless, Uber Eats, and more in one unified dashboard.',
    features: [
      'Grubhub integration',
      'Seamless/Grubhub+ integration',
      'Uber Eats integration',
      'DoorDash integration',
      'Unified order management',
      'Real-time menu synchronization',
    ],
  },
  {
    key: 'pos-integration',
    label: 'POS Integration',
    description:
      'Seamlessly connect with leading POS systems like Square, Toast, and Clover. Sync inventory, orders, and payments in real-time for complete operational harmony.',
    features: [
      'Square POS integration',
      'Toast POS integration',
      'Clover POS integration',
      'Real-time payment sync',
      'Inventory management',
      'Employee scheduling sync',
    ],
  },
];

const styles: Record<string, CSSProperties> = {
  page: {
    padding: 0,
  },
  tabBar: {
    display: 'flex',
    gap: '4px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '4px',
    marginBottom: '24px',
  },
  tab: {
    flex: 1,
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  tabActive: {
    flex: 1,
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  contentArea: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
    minWidth: 0,
  },
  description: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#374151',
    margin: '0 0 24px 0',
  },
  featuresHeading: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 14px 0',
  },
  frameArea: {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  // Order Tracker mock content
  otContent: {
    padding: '16px',
  },
  otOrderNum: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#0d9488',
    margin: '0 0 4px 0',
  },
  otTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  otSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    marginBottom: '20px',
  },
  otStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    position: 'relative',
  },
  otDot: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    flexShrink: 0,
  },
  otDotActive: {
    backgroundColor: '#0d9488',
    color: '#ffffff',
  },
  otDotCompleted: {
    backgroundColor: '#ccfbf1',
    color: '#0d9488',
  },
  otDotPending: {
    backgroundColor: '#f1f5f9',
    color: '#94a3b8',
  },
  otStepLabel: {
    fontSize: '14px',
    fontWeight: 500,
    margin: 0,
  },
  otLine: {
    width: '2px',
    height: '12px',
    marginLeft: '11px',
  },
  otEta: {
    backgroundColor: '#ccfbf1',
    borderRadius: '10px',
    padding: '14px 16px',
    textAlign: 'center',
  },
  otEtaLabel: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 4px 0',
  },
  otEtaValue: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#0d9488',
    margin: 0,
  },
  // KDS mock content
  kdsContainer: {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    minHeight: '380px',
  },
  kdsColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  kdsColumnHeader: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '6px 8px',
    borderRadius: '6px',
    textAlign: 'center',
    margin: 0,
  },
  kdsCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '11px',
  },
  kdsOrderNum: {
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px 0',
    fontSize: '12px',
  },
  kdsItem: {
    color: '#374151',
    margin: '2px 0',
  },
  kdsTime: {
    color: '#6b7280',
    fontSize: '10px',
    marginTop: '6px',
  },
  // Kiosk mock content
  kioskContent: {
    padding: '16px',
  },
  kioskHeading: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 12px 0',
  },
  kioskCategories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '16px',
  },
  kioskCat: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '14px 10px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  kioskCatEmoji: {
    fontSize: '28px',
    display: 'block',
    marginBottom: '4px',
  },
  kioskCatName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  kioskBrowse: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  // Driver App mock content
  driverContent: {
    padding: '16px',
  },
  driverHeading: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#6b7280',
    margin: '0 0 12px 0',
  },
  driverCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    marginBottom: '16px',
  },
  driverAddress: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  driverMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  driverMetaItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  driverMetaLabel: {
    fontSize: '11px',
    color: '#6b7280',
    margin: 0,
  },
  driverMetaValue: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  driverButtons: {
    display: 'flex',
    gap: '10px',
  },
  driverAccept: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  driverDecline: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  // Website Builder mock content
  wbHero: {
    backgroundColor: '#0d9488',
    padding: '32px 20px',
    textAlign: 'center',
  },
  wbHeroTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 4px 0',
  },
  wbHeroSub: {
    fontSize: '13px',
    color: '#ccfbf1',
    margin: 0,
  },
  wbSection: {
    padding: '20px',
  },
  wbSectionTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 12px 0',
  },
  wbMenuPreview: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '20px',
  },
  wbMenuItem: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '12px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  wbMenuEmoji: {
    fontSize: '24px',
    display: 'block',
    marginBottom: '4px',
  },
  wbMenuName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  wbMenuPrice: {
    fontSize: '11px',
    color: '#0d9488',
    fontWeight: 600,
    margin: '2px 0 0 0',
  },
  wbInfoRow: {
    display: 'flex',
    gap: '12px',
  },
  wbInfoCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '12px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  wbInfoLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#6b7280',
    margin: '0 0 4px 0',
  },
  wbInfoValue: {
    fontSize: '12px',
    color: '#111827',
    margin: 0,
    lineHeight: '1.4',
  },
  // Delivery Integrations content
  deliveryContent: {
    padding: '20px',
  },
  deliveryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  platformCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  platformIcon: {
    fontSize: '32px',
    flexShrink: 0,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  platformStatus: {
    fontSize: '12px',
    color: '#16a34a',
    fontWeight: 500,
    margin: 0,
  },
  // POS Integration content
  posContent: {
    padding: '20px',
  },
  posGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
  },
  posCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  posIcon: {
    fontSize: '28px',
    flexShrink: 0,
  },
  posInfo: {
    flex: 1,
  },
  posName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 6px 0',
  },
  posDescription: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
};

const orderSteps = [
  { label: 'Confirmed', status: 'completed' },
  { label: 'Preparing', status: 'active' },
  { label: 'Ready', status: 'pending' },
  { label: 'Out for Delivery', status: 'pending' },
  { label: 'Delivered', status: 'pending' },
];

const OrderTrackerContent = () => (
  <div style={styles.otContent}>
    <p style={styles.otOrderNum}>Order #ORD-1042</p>
    <p style={styles.otTitle}>Track Your Order</p>
    <div style={styles.otSteps}>
      {orderSteps.map((step, idx) => {
        const dotStyle =
          step.status === 'active'
            ? styles.otDotActive
            : step.status === 'completed'
              ? styles.otDotCompleted
              : styles.otDotPending;
        const labelColor =
          step.status === 'active'
            ? '#0d9488'
            : step.status === 'completed'
              ? '#374151'
              : '#94a3b8';
        return (
          <div key={step.label}>
            <div style={styles.otStep}>
              <span style={{ ...styles.otDot, ...dotStyle }}>
                {step.status === 'completed' ? '\u2713' : idx + 1}
              </span>
              <p style={{ ...styles.otStepLabel, color: labelColor }}>
                {step.label}
              </p>
            </div>
            {idx < orderSteps.length - 1 && (
              <div
                style={{
                  ...styles.otLine,
                  backgroundColor:
                    step.status === 'completed' ? '#0d9488' : '#e5e7eb',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
    <div style={styles.otEta}>
      <p style={styles.otEtaLabel}>Estimated Time</p>
      <p style={styles.otEtaValue}>18 min</p>
    </div>
  </div>
);

const KitchenDisplayContent = () => (
  <div style={styles.kdsContainer}>
    <div style={styles.kdsColumn}>
      <p
        style={{
          ...styles.kdsColumnHeader,
          backgroundColor: '#fef3c7',
          color: '#92400e',
        }}
      >
        New Orders
      </p>
      <div style={styles.kdsCard}>
        <p style={styles.kdsOrderNum}>#1042</p>
        <p style={styles.kdsItem}>1x Margherita Pizza</p>
        <p style={styles.kdsItem}>1x Garlic Bread</p>
        <p style={styles.kdsTime}>2 min ago</p>
      </div>
      <div style={styles.kdsCard}>
        <p style={styles.kdsOrderNum}>#1043</p>
        <p style={styles.kdsItem}>2x Classic Burger</p>
        <p style={styles.kdsTime}>1 min ago</p>
      </div>
    </div>
    <div style={styles.kdsColumn}>
      <p
        style={{
          ...styles.kdsColumnHeader,
          backgroundColor: '#dbeafe',
          color: '#1e40af',
        }}
      >
        In Progress
      </p>
      <div style={styles.kdsCard}>
        <p style={styles.kdsOrderNum}>#1040</p>
        <p style={styles.kdsItem}>1x Grilled Salmon</p>
        <p style={styles.kdsItem}>1x Caprese Salad</p>
        <p style={styles.kdsTime}>8 min ago</p>
      </div>
    </div>
    <div style={styles.kdsColumn}>
      <p
        style={{
          ...styles.kdsColumnHeader,
          backgroundColor: '#dcfce7',
          color: '#166534',
        }}
      >
        Ready
      </p>
      <div style={styles.kdsCard}>
        <p style={styles.kdsOrderNum}>#1038</p>
        <p style={styles.kdsItem}>1x Tiramisu</p>
        <p style={styles.kdsItem}>2x Espresso</p>
        <p style={styles.kdsTime}>12 min ago</p>
      </div>
    </div>
  </div>
);

const KioskContent = () => (
  <div style={styles.kioskContent}>
    <p style={styles.kioskHeading}>Browse Menu</p>
    <div style={styles.kioskCategories}>
      {[
        { emoji: '\u{1F355}', name: 'Pizza' },
        { emoji: '\u{1F354}', name: 'Burgers' },
        { emoji: '\u{1F35D}', name: 'Pasta' },
        { emoji: '\u{1F957}', name: 'Salads' },
        { emoji: '\u{1F370}', name: 'Desserts' },
        { emoji: '\u{1F379}', name: 'Drinks' },
      ].map((cat) => (
        <div key={cat.name} style={styles.kioskCat}>
          <span style={styles.kioskCatEmoji}>{cat.emoji}</span>
          <p style={styles.kioskCatName}>{cat.name}</p>
        </div>
      ))}
    </div>
    <button style={styles.kioskBrowse}>Start Ordering</button>
  </div>
);

const DriverAppContent = () => (
  <div style={styles.driverContent}>
    <p style={styles.driverHeading}>Current Delivery</p>
    <div style={styles.driverCard}>
      <p style={styles.driverAddress}>742 Evergreen Terrace</p>
      <div style={styles.driverMeta}>
        <div style={styles.driverMetaItem}>
          <p style={styles.driverMetaLabel}>Distance</p>
          <p style={styles.driverMetaValue}>2.3 mi</p>
        </div>
        <div style={styles.driverMetaItem}>
          <p style={styles.driverMetaLabel}>Earnings</p>
          <p style={{ ...styles.driverMetaValue, color: '#0d9488' }}>$8.50</p>
        </div>
        <div style={styles.driverMetaItem}>
          <p style={styles.driverMetaLabel}>Items</p>
          <p style={styles.driverMetaValue}>3</p>
        </div>
      </div>
      <div style={styles.driverButtons}>
        <button style={styles.driverAccept}>Accept</button>
        <button style={styles.driverDecline}>Decline</button>
      </div>
    </div>
  </div>
);

const DeliveryIntegrationsContent = () => (
  <div style={styles.deliveryContent}>
    <div style={styles.deliveryGrid}>
      {[
        { icon: '🍕', name: 'Grubhub', status: 'Connected' },
        { icon: '📱', name: 'Seamless', status: 'Connected' },
        { icon: '🚗', name: 'Uber Eats', status: 'Connected' },
        { icon: '🏃', name: 'DoorDash', status: 'Not Connected' },
      ].map((platform) => (
        <div key={platform.name} style={styles.platformCard}>
          <span style={styles.platformIcon}>{platform.icon}</span>
          <div style={styles.platformInfo}>
            <p style={styles.platformName}>{platform.name}</p>
            <p
              style={{
                ...styles.platformStatus,
                color: platform.status === 'Connected' ? '#16a34a' : '#f59e0b',
              }}
            >
              {platform.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const POSIntegrationContent = () => (
  <div style={styles.posContent}>
    <div style={styles.posGrid}>
      {[
        {
          icon: '⬜',
          name: 'Square POS',
          desc: 'Complete payment & order sync',
        },
        {
          icon: '🟨',
          name: 'Toast POS',
          desc: 'Enterprise-grade integration',
        },
        {
          icon: '🔷',
          name: 'Clover POS',
          desc: 'Real-time inventory management',
        },
      ].map((pos) => (
        <div key={pos.name} style={styles.posCard}>
          <span style={styles.posIcon}>{pos.icon}</span>
          <div style={styles.posInfo}>
            <p style={styles.posName}>{pos.name}</p>
            <p style={styles.posDescription}>{pos.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WebsiteBuilderContent = () => (
  <div>
    <div style={styles.wbHero}>
      <p style={styles.wbHeroTitle}>Bella Cucina</p>
      <p style={styles.wbHeroSub}>Authentic Italian Dining</p>
    </div>
    <div style={styles.wbSection}>
      <p style={styles.wbSectionTitle}>Our Menu</p>
      <div style={styles.wbMenuPreview}>
        {[
          { emoji: '\u{1F355}', name: 'Margherita', price: '$14.99' },
          { emoji: '\u{1F35D}', name: 'Carbonara', price: '$16.99' },
          { emoji: '\u{1F41F}', name: 'Salmon', price: '$22.99' },
          { emoji: '\u{1F370}', name: 'Tiramisu', price: '$8.99' },
        ].map((item) => (
          <div key={item.name} style={styles.wbMenuItem}>
            <span style={styles.wbMenuEmoji}>{item.emoji}</span>
            <p style={styles.wbMenuName}>{item.name}</p>
            <p style={styles.wbMenuPrice}>{item.price}</p>
          </div>
        ))}
      </div>
      <div style={styles.wbInfoRow}>
        <div style={styles.wbInfoCard}>
          <p style={styles.wbInfoLabel}>Hours</p>
          <p style={styles.wbInfoValue}>
            Mon-Sat
            <br />
            11AM - 10PM
          </p>
        </div>
        <div style={styles.wbInfoCard}>
          <p style={styles.wbInfoLabel}>Location</p>
          <p style={styles.wbInfoValue}>
            123 Main St
            <br />
            Downtown
          </p>
        </div>
      </div>
    </div>
  </div>
);

const tabContentRenderers: Record<TabKey, () => ReactNode> = {
  'order-tracker': () => <OrderTrackerContent />,
  'kitchen-display': () => <KitchenDisplayContent />,
  'kiosk': () => <KioskContent />,
  'driver-app': () => <DriverAppContent />,
  'website-builder': () => <WebsiteBuilderContent />,
  'delivery-integrations': () => <DeliveryIntegrationsContent />,
  'pos-integration': () => <POSIntegrationContent />,
};

const tabFrameType: Record<TabKey, 'phone' | 'dashboard'> = {
  'order-tracker': 'phone',
  'kitchen-display': 'dashboard',
  'kiosk': 'phone',
  'driver-app': 'phone',
  'website-builder': 'dashboard',
  'delivery-integrations': 'dashboard',
  'pos-integration': 'dashboard',
};

const tabFrameTitles: Record<TabKey, string> = {
  'order-tracker': 'Order Tracker',
  'kitchen-display': 'Kitchen Display System',
  'kiosk': 'Self-Service Kiosk',
  'driver-app': 'Driver App',
  'website-builder': 'bellacucina.restaurant.app',
  'delivery-integrations': 'Delivery Integrations',
  'pos-integration': 'POS Integration',
};

export const OtherProductsPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('order-tracker');

  const currentTab = tabs.find((t) => t.key === activeTab)!;
  const frameType = tabFrameType[activeTab];
  const content = tabContentRenderers[activeTab]();

  return (
    <div style={styles.page}>
      <Header
        title="More Products"
        subtitle="Complete your restaurant technology stack"
      />

      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            style={activeTab === tab.key ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.contentArea}>
        <div style={styles.textContent}>
          <p style={styles.description}>{currentTab.description}</p>
          <p style={styles.featuresHeading}>Key Features</p>
          <FeatureList features={currentTab.features} />
        </div>
        <div style={styles.frameArea}>
          {frameType === 'phone' ? (
            <MockPhoneFrame title={tabFrameTitles[activeTab]}>
              {content}
            </MockPhoneFrame>
          ) : (
            <MockDashboardFrame
              title={tabFrameTitles[activeTab]}
              url={
                activeTab === 'website-builder'
                  ? 'bellacucina.restaurant.app'
                  : undefined
              }
            >
              {content}
            </MockDashboardFrame>
          )}
        </div>
      </div>
    </div>
  );
};
