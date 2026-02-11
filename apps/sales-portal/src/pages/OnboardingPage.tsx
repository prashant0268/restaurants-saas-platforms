import { type CSSProperties, useState } from 'react';
import { Header } from '../components/layout/Header';
import { StatusBadge } from '../components/shared/StatusBadge';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface OnboardingRestaurant {
  id: string;
  name: string;
  contactName: string;
  plan: string;
  startDate: string;
  progress: number;
  steps: OnboardingStep[];
}

const mockOnboardingRestaurants: OnboardingRestaurant[] = [
  {
    id: '1',
    name: 'Sushi Zen',
    contactName: 'Yuki Tanaka',
    plan: 'Professional',
    startDate: '2026-01-25',
    progress: 60,
    steps: [
      {
        id: 's1',
        title: 'Account Setup',
        description: 'Create restaurant profile and admin account',
        completed: true,
      },
      {
        id: 's2',
        title: 'Menu Configuration',
        description: 'Upload menu items, categories, and pricing',
        completed: true,
      },
      {
        id: 's3',
        title: 'Payment Integration',
        description: 'Connect payment processor and verify transactions',
        completed: true,
      },
      {
        id: 's4',
        title: 'Staff Training',
        description: 'Schedule and complete staff training session',
        completed: false,
      },
      {
        id: 's5',
        title: 'Go Live',
        description: 'Final review and launch the platform',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Taco Fiesta',
    contactName: 'Carlos Mendez',
    plan: 'Enterprise',
    startDate: '2026-02-08',
    progress: 20,
    steps: [
      {
        id: 's1',
        title: 'Account Setup',
        description: 'Create restaurant profile and admin account',
        completed: true,
      },
      {
        id: 's2',
        title: 'Menu Configuration',
        description: 'Upload menu items, categories, and pricing',
        completed: false,
      },
      {
        id: 's3',
        title: 'Multi-Location Setup',
        description: 'Configure all 12 locations with individual settings',
        completed: false,
      },
      {
        id: 's4',
        title: 'Payment Integration',
        description: 'Connect payment processor and verify transactions',
        completed: false,
      },
      {
        id: 's5',
        title: 'Staff Training',
        description: 'Schedule and complete staff training session',
        completed: false,
      },
      {
        id: 's6',
        title: 'Go Live',
        description: 'Final review and launch the platform',
        completed: false,
      },
    ],
  },
];

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  restaurantCards: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  restaurantName: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  restaurantMeta: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  progressSection: {
    marginBottom: '20px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  progressLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#6b7280',
    margin: 0,
  },
  progressPercent: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  progressBarBg: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  stepCompleted: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1fae5',
    backgroundColor: '#ecfdf5',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #d1d5db',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
    cursor: 'pointer',
  },
  checkboxCompleted: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #10b981',
    backgroundColor: '#10b981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
    color: '#ffffff',
    fontSize: '12px',
    cursor: 'pointer',
  },
  stepTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 2px 0',
  },
  stepTitleCompleted: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#065f46',
    margin: '0 0 2px 0',
    textDecoration: 'line-through',
  },
  stepDesc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
};

export const OnboardingPage = () => {
  const [restaurants, setRestaurants] = useState(mockOnboardingRestaurants);

  const toggleStep = (restaurantId: string, stepId: string) => {
    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id !== restaurantId) return r;
        const updatedSteps = r.steps.map((s) =>
          s.id === stepId ? { ...s, completed: !s.completed } : s
        );
        const completedCount = updatedSteps.filter((s) => s.completed).length;
        const progress = Math.round((completedCount / updatedSteps.length) * 100);
        return { ...r, steps: updatedSteps, progress };
      })
    );
  };

  return (
    <>
      <Header title="Restaurant Onboarding" />
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            Active Onboarding ({restaurants.length})
          </h3>
        </div>

        <div style={styles.restaurantCards}>
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.restaurantName}>{restaurant.name}</h3>
                  <p style={styles.restaurantMeta}>
                    {restaurant.contactName} &middot; {restaurant.plan} Plan
                    &middot; Started {restaurant.startDate}
                  </p>
                </div>
                <StatusBadge
                  status={restaurant.progress === 100 ? 'converted' : 'pending'}
                  label={restaurant.progress === 100 ? 'Complete' : 'In Progress'}
                />
              </div>

              <div style={styles.progressSection}>
                <div style={styles.progressHeader}>
                  <p style={styles.progressLabel}>Onboarding Progress</p>
                  <p style={styles.progressPercent}>{restaurant.progress}%</p>
                </div>
                <div style={styles.progressBarBg}>
                  <div
                    style={{
                      ...styles.progressBarFill,
                      width: `${restaurant.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div style={styles.stepsList}>
                {restaurant.steps.map((step) => (
                  <div
                    key={step.id}
                    style={step.completed ? styles.stepCompleted : styles.step}
                  >
                    <div
                      style={
                        step.completed
                          ? styles.checkboxCompleted
                          : styles.checkbox
                      }
                      onClick={() => toggleStep(restaurant.id, step.id)}
                    >
                      {step.completed && '\u2713'}
                    </div>
                    <div>
                      <p
                        style={
                          step.completed
                            ? styles.stepTitleCompleted
                            : styles.stepTitle
                        }
                      >
                        {step.title}
                      </p>
                      <p style={styles.stepDesc}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
