import type { CSSProperties } from 'react';

interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0px',
    marginBottom: '32px',
  },
  stepWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    minWidth: '100px',
  },
  circle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    border: '2px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#9ca3af',
  },
  circleActive: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    border: '2px solid #0d9488',
    backgroundColor: '#0d9488',
    color: '#ffffff',
  },
  circleComplete: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    border: '2px solid #0d9488',
    backgroundColor: '#ccfbf1',
    color: '#0d9488',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#9ca3af',
    textAlign: 'center' as const,
  },
  labelActive: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#0d9488',
    textAlign: 'center' as const,
  },
  labelComplete: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#0d9488',
    textAlign: 'center' as const,
  },
  connector: {
    width: '60px',
    height: '2px',
    backgroundColor: '#d1d5db',
    marginBottom: '28px',
  },
  connectorComplete: {
    width: '60px',
    height: '2px',
    backgroundColor: '#0d9488',
    marginBottom: '28px',
  },
};

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div style={styles.container}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isComplete = index < currentIndex;

        return (
          <div key={step.id} style={styles.stepWrapper}>
            <div style={styles.step}>
              <div
                style={
                  isActive
                    ? styles.circleActive
                    : isComplete
                      ? styles.circleComplete
                      : styles.circle
                }
              >
                {isComplete ? '\u2713' : index + 1}
              </div>
              <span
                style={
                  isActive
                    ? styles.labelActive
                    : isComplete
                      ? styles.labelComplete
                      : styles.label
                }
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                style={
                  isComplete ? styles.connectorComplete : styles.connector
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
