import type { CSSProperties } from 'react';

interface PipelineStageProps {
  stage: string;
  count: number;
  value: number;
  color: string;
  percentage: number;
}

const styles: Record<string, CSSProperties> = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    flex: '1',
    minWidth: '140px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  stage: {
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 8px 0',
  },
  count: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  value: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 12px 0',
  },
  barContainer: {
    width: '100%',
    height: '4px',
    backgroundColor: '#f3f4f6',
    borderRadius: '2px',
    overflow: 'hidden',
  },
};

export const PipelineStage = ({
  stage,
  count,
  value,
  color,
  percentage,
}: PipelineStageProps) => {
  const barFill: CSSProperties = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: color,
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  };

  return (
    <div style={styles.card}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: color,
        }}
      />
      <p style={{ ...styles.stage, color }}>{stage}</p>
      <p style={styles.count}>{count}</p>
      <p style={styles.value}>
        ${value.toLocaleString()}/mo
      </p>
      <div style={styles.barContainer}>
        <div style={barFill} />
      </div>
    </div>
  );
};
