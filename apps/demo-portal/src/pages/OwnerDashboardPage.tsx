import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Header } from '../components/layout/Header';
import { MockDashboardFrame } from '../components/shared/MockDashboardFrame';
import { FeatureList } from '../components/shared/FeatureList';
import { mockAnalytics, mockOrders, mockStaff } from '../data/mockDemoData';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ClipboardList,
  Users,
  Settings,
} from 'lucide-react';

const analyticsFeatures = [
  'Real-time revenue tracking',
  'Customer demographics',
  'Peak hour analysis',
  'Menu performance insights',
  'Custom date ranges',
];

const ordersFeatures = [
  'Live order feed',
  'Status management',
  'Order modification',
  'Refund processing',
  'Kitchen communication',
];

const staffFeatures = [
  'Shift scheduling',
  'Role-based permissions',
  'Time tracking',
  'Performance metrics',
  'Payroll integration',
];

const settingsFeatures = [
  'Multi-location management',
  'Operating hours control',
  'Delivery zone mapping',
  'Tax configuration',
  'Notification preferences',
];

const orderStatusColors: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: '#dbeafe', color: '#2563eb' },
  preparing: { bg: '#fef9c3', color: '#ca8a04' },
  ready: { bg: '#dcfce7', color: '#16a34a' },
  out_for_delivery: { bg: '#e0e7ff', color: '#4f46e5' },
  delivered: { bg: '#f3f4f6', color: '#6b7280' },
};

const staffStatusColors: Record<string, { bg: string; color: string }> = {
  'on-shift': { bg: '#dcfce7', color: '#16a34a' },
  'off-shift': { bg: '#f3f4f6', color: '#6b7280' },
};

const settingsItems = [
  {
    icon: '🏢',
    title: 'Restaurant Info',
    description: 'Name, address, contact details, and branding',
  },
  {
    icon: '🕐',
    title: 'Operating Hours',
    description: 'Set opening and closing times for each day',
  },
  {
    icon: '📍',
    title: 'Delivery Zones',
    description: 'Define delivery areas and set distance-based fees',
  },
  {
    icon: '💳',
    title: 'Payment Settings',
    description: 'Payment methods, tax rates, and tip configuration',
  },
  {
    icon: '🔔',
    title: 'Notifications',
    description: 'Email, SMS, and push notification preferences',
  },
];

// ─── Dashboard Content Components ────────────────────────

const AnalyticsDashboardContent = () => (
  <div>
    <div style={dashboardStyles.statsGrid}>
      <div style={dashboardStyles.statCard}>
        <p style={dashboardStyles.statLabel}>Today's Revenue</p>
        <p style={dashboardStyles.statValue}>${mockAnalytics.revenue.today.toLocaleString()}</p>
        <p style={dashboardStyles.statTrend}>+{mockAnalytics.revenue.trend}%</p>
      </div>
      <div style={dashboardStyles.statCard}>
        <p style={dashboardStyles.statLabel}>Orders</p>
        <p style={dashboardStyles.statValue}>{mockAnalytics.orders.today}</p>
        <p style={dashboardStyles.statTrend}>+{mockAnalytics.orders.trend}%</p>
      </div>
      <div style={dashboardStyles.statCard}>
        <p style={dashboardStyles.statLabel}>Customers</p>
        <p style={dashboardStyles.statValue}>{mockAnalytics.customers.new}</p>
        <p style={dashboardStyles.statTrend}>+{mockAnalytics.customers.trend}%</p>
      </div>
      <div style={dashboardStyles.statCard}>
        <p style={dashboardStyles.statLabel}>Rating</p>
        <p style={dashboardStyles.statValue}>{mockAnalytics.rating.average}</p>
        <p style={{ ...dashboardStyles.statTrend, color: '#6b7280' }}>
          {mockAnalytics.rating.total} reviews
        </p>
      </div>
    </div>
    <p style={dashboardStyles.topItemsHeader}>Top Selling Items</p>
    {mockAnalytics.topItems.map((item) => (
      <div key={item.name} style={dashboardStyles.topItem}>
        <span style={dashboardStyles.topItemName}>{item.name}</span>
        <span style={dashboardStyles.topItemStat}>{item.orders} orders</span>
      </div>
    ))}
  </div>
);

const OrdersDashboardContent = () => (
  <div style={{ overflowX: 'auto' }}>
    <table style={dashboardStyles.orderTable}>
      <thead>
        <tr>
          <th style={dashboardStyles.orderTh}>Order</th>
          <th style={dashboardStyles.orderTh}>Customer</th>
          <th style={dashboardStyles.orderTh}>Total</th>
          <th style={dashboardStyles.orderTh}>Status</th>
          <th style={dashboardStyles.orderTh}>Time</th>
        </tr>
      </thead>
      <tbody>
        {mockOrders.map((order) => {
          const statusColor = orderStatusColors[order.status] ?? {
            bg: '#f3f4f6',
            color: '#374151',
          };
          const label = order.status.replace(/_/g, ' ');
          return (
            <tr key={order.id}>
              <td style={dashboardStyles.orderTd}>{order.id}</td>
              <td style={dashboardStyles.orderTd}>{order.customer}</td>
              <td style={dashboardStyles.orderTd}>${order.total.toFixed(2)}</td>
              <td style={dashboardStyles.orderTd}>
                <span
                  style={{
                    ...dashboardStyles.orderStatusBadge,
                    backgroundColor: statusColor.bg,
                    color: statusColor.color,
                  }}
                >
                  {label}
                </span>
              </td>
              <td style={dashboardStyles.orderTd}>{order.time}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const StaffDashboardContent = () => (
  <div>
    {mockStaff.map((member) => {
      const statusColor = staffStatusColors[member.status] ?? {
        bg: '#f3f4f6',
        color: '#6b7280',
      };
      const label = member.status.replace(/-/g, ' ');
      return (
        <div key={member.id} style={dashboardStyles.staffRow}>
          <div style={dashboardStyles.staffInfo}>
            <p style={dashboardStyles.staffName}>{member.name}</p>
            <p style={dashboardStyles.staffRole}>{member.role}</p>
          </div>
          <div style={dashboardStyles.staffRight}>
            <span style={dashboardStyles.staffHours}>{member.hours}</span>
            <span
              style={{
                ...dashboardStyles.staffStatusBadge,
                backgroundColor: statusColor.bg,
                color: statusColor.color,
              }}
            >
              {label}
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

const SettingsDashboardContent = () => (
  <div>
    {settingsItems.map((item) => (
      <div key={item.title} style={dashboardStyles.settingsRow}>
        <div style={dashboardStyles.settingsIcon}>
          <span>{item.icon}</span>
        </div>
        <div style={dashboardStyles.settingsInfo}>
          <p style={dashboardStyles.settingsTitle}>{item.title}</p>
          <p style={dashboardStyles.settingsDescription}>{item.description}</p>
        </div>
        <span style={dashboardStyles.settingsChevron}>›</span>
      </div>
    ))}
  </div>
);

// ─── Screen interface ────────────────────────────────────

interface DashboardScreen {
  id: string;
  label: string;
  icon: typeof TrendingUp;
  title: string;
  description: string;
  features: string[];
  DashboardContent: () => ReactNode;
}

const screens: DashboardScreen[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    title: 'Business Analytics',
    description:
      'Get a complete picture of Pooja\'s restaurant performance with real-time dashboards. Track revenue, customer trends, and menu performance across custom date ranges.',
    features: analyticsFeatures,
    DashboardContent: AnalyticsDashboardContent,
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ClipboardList,
    title: 'Order Management',
    description:
      'Monitor every order in real time from confirmation through delivery. Manage statuses, process modifications, and keep the kitchen in sync with a live order feed.',
    features: ordersFeatures,
    DashboardContent: OrdersDashboardContent,
  },
  {
    id: 'staff',
    label: 'Staff',
    icon: Users,
    title: 'Staff Management',
    description:
      'Schedule shifts, assign roles, and track performance across your team. Integrated time tracking and payroll tools keep operations running smoothly.',
    features: staffFeatures,
    DashboardContent: StaffDashboardContent,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    title: 'Restaurant Settings',
    description:
      'Configure every aspect of Pooja from a single control panel. Manage locations, hours, delivery zones, payments, and notification preferences.',
    features: settingsFeatures,
    DashboardContent: SettingsDashboardContent,
  },
];

// ─── Styles ─────────────────────────────────────────────

const dashboardStyles: Record<string, CSSProperties> = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    padding: '16px',
  },
  statCard: {
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 4px 0',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 2px 0',
  },
  statTrend: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#16a34a',
    margin: 0,
  },
  topItemsHeader: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 16px 8px 16px',
  },
  topItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
  },
  topItemName: {
    fontSize: '13px',
    color: '#374151',
  },
  topItemStat: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#0d9488',
  },
  orderTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '13px',
  },
  orderTh: {
    textAlign: 'left' as const,
    padding: '10px 12px',
    backgroundColor: '#f1f5f9',
    color: '#6b7280',
    fontWeight: 600,
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  orderTd: {
    padding: '10px 12px',
    borderBottom: '1px solid #f1f5f9',
    color: '#374151',
  },
  orderStatusBadge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '9999px',
    textTransform: 'capitalize' as const,
  },
  staffRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
  },
  staffInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  staffName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  staffRole: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  staffRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  staffHours: {
    fontSize: '12px',
    color: '#6b7280',
  },
  staffStatusBadge: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '9999px',
  },
  settingsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
  },
  settingsIcon: {
    fontSize: '24px',
    flexShrink: 0,
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsInfo: {
    flex: 1,
    minWidth: 0,
  },
  settingsTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  settingsDescription: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '2px 0 0 0',
  },
  settingsChevron: {
    fontSize: '14px',
    color: '#9ca3af',
    flexShrink: 0,
  },
};

const pageStyles: Record<string, CSSProperties> = {
  page: {
    padding: '24px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  splitLayout: {
    display: 'flex',
    gap: '48px',
    alignItems: 'flex-start',
  },
  leftPanel: {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingTop: '8px',
  },
  carouselNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  arrowBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#374151',
    transition: 'border-color 0.15s, background-color 0.15s',
  },
  dots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#d1d5db',
    cursor: 'pointer',
    transition: 'background-color 0.15s, transform 0.15s',
    border: 'none',
    padding: 0,
  },
  dotActive: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#0d9488',
    cursor: 'pointer',
    transform: 'scale(1.25)',
    border: 'none',
    padding: 0,
  },
  screenTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '8px',
  },
  screenTab: {
    padding: '6px 14px',
    borderRadius: '9999px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  screenTabActive: {
    padding: '6px 14px',
    borderRadius: '9999px',
    border: '1px solid #0d9488',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 6px',
  },
  sectionDescription: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 20px',
    lineHeight: 1.6,
  },
  screenCounter: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: 500,
    marginTop: '4px',
  },
};

// ─── Component ──────────────────────────────────────────

export const OwnerDashboardPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screen = screens[activeIndex];

  const goPrev = () => setActiveIndex((i) => (i === 0 ? screens.length - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === screens.length - 1 ? 0 : i + 1));

  return (
    <div style={pageStyles.page}>
      <Header
        title="Owner Dashboard"
        subtitle="Complete business command center for Pooja Exotic Indian Cuisine"
      />

      <div style={pageStyles.splitLayout}>
        {/* Left: Dashboard Frame + carousel controls */}
        <div style={pageStyles.leftPanel}>
          <MockDashboardFrame title={screen.label}>
            <screen.DashboardContent />
          </MockDashboardFrame>

          {/* Carousel navigation */}
          <div style={pageStyles.carouselNav}>
            <button
              style={pageStyles.arrowBtn}
              onClick={goPrev}
              title="Previous screen"
            >
              <ChevronLeft size={18} />
            </button>
            <div style={pageStyles.dots}>
              {screens.map((s, i) => (
                <button
                  key={s.id}
                  style={i === activeIndex ? pageStyles.dotActive : pageStyles.dot}
                  onClick={() => setActiveIndex(i)}
                  title={s.label}
                />
              ))}
            </div>
            <button
              style={pageStyles.arrowBtn}
              onClick={goNext}
              title="Next screen"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <span style={pageStyles.screenCounter}>
            {activeIndex + 1} / {screens.length}
          </span>
        </div>

        {/* Right: Screen details */}
        <div style={pageStyles.rightPanel}>
          <div style={pageStyles.screenTabs}>
            {screens.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  style={i === activeIndex ? pageStyles.screenTabActive : pageStyles.screenTab}
                  onClick={() => setActiveIndex(i)}
                >
                  <Icon size={14} />
                  {s.label}
                </button>
              );
            })}
          </div>

          <div>
            <h2 style={pageStyles.sectionTitle}>{screen.title}</h2>
            <p style={pageStyles.sectionDescription}>{screen.description}</p>
          </div>

          <FeatureList features={screen.features} />
        </div>
      </div>
    </div>
  );
};
