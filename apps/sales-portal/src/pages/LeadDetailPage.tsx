import type { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useLeadsStore } from '../stores/leadsStore';

const activityTypeIcons: Record<string, string> = {
  call: '\u{1F4DE}',
  email: '\u{1F4E7}',
  meeting: '\u{1F91D}',
  note: '\u{1F4DD}',
};

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1200px',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '32px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
    paddingBottom: '12px',
    borderBottom: '1px solid #e5e7eb',
  },
  field: {
    marginBottom: '16px',
  },
  fieldLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 4px 0',
  },
  fieldValue: {
    fontSize: '15px',
    color: '#111827',
    margin: 0,
  },
  restaurantHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  restaurantName: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  contactName: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
  },
  statusActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  editButton: {
    padding: '8px 20px',
    borderRadius: '8px',
    border: '1px solid #3b82f6',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  timeline: {
    position: 'relative' as const,
    paddingLeft: '32px',
  },
  timelineLine: {
    position: 'absolute' as const,
    left: '11px',
    top: '8px',
    bottom: '8px',
    width: '2px',
    backgroundColor: '#e5e7eb',
  },
  timelineItem: {
    position: 'relative' as const,
    marginBottom: '20px',
    paddingBottom: '4px',
  },
  timelineDot: {
    position: 'absolute' as const,
    left: '-28px',
    top: '4px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '2px solid #3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    zIndex: 1,
  },
  timelineContent: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
  },
  timelineType: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#3b82f6',
    textTransform: 'capitalize' as const,
    margin: '0 0 4px 0',
  },
  timelineDesc: {
    fontSize: '14px',
    color: '#374151',
    margin: '0 0 4px 0',
  },
  timelineMeta: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  notesArea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    backgroundColor: '#f9fafb',
  },
  followUpCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    border: '1px solid #bfdbfe',
    marginBottom: '16px',
  },
  followUpLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1d4ed8',
    margin: 0,
  },
  followUpDate: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#1e40af',
    margin: 0,
  },
  notFound: {
    textAlign: 'center' as const,
    padding: '60px 20px',
  },
  notFoundTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  notFoundText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
};

export const LeadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { leads } = useLeadsStore();

  const lead = leads.find((l) => l.id === id);

  if (!lead) {
    return (
      <>
        <Header title="Lead Detail" />
        <div style={styles.notFound}>
          <h2 style={styles.notFoundTitle}>Lead not found</h2>
          <p style={styles.notFoundText}>
            The lead you are looking for does not exist or has been removed.
          </p>
          <button
            style={{ ...styles.backButton, marginTop: '16px' }}
            onClick={() => navigate('/leads')}
          >
            Back to Leads
          </button>
        </div>
      </>
    );
  }

  const sortedActivities = [...lead.activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Header title="Lead Detail" />
      <div style={styles.container}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/leads')}
        >
          &larr; Back to Leads
        </button>

        <div style={styles.restaurantHeader}>
          <div>
            <h1 style={styles.restaurantName}>{lead.restaurantName}</h1>
            <p style={styles.contactName}>{lead.contactName}</p>
          </div>
          <div style={styles.statusActions}>
            <StatusBadge status={lead.status} />
            <button style={styles.editButton}>Edit Lead</button>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Contact Information</h3>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Email</p>
              <p style={styles.fieldValue}>{lead.contactEmail}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Phone</p>
              <p style={styles.fieldValue}>{lead.contactPhone}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Source</p>
              <p style={{ ...styles.fieldValue, textTransform: 'capitalize' }}>
                {lead.source.replace('_', ' ')}
              </p>
            </div>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Estimated Value</p>
              <p style={styles.fieldValue}>${lead.estimatedValue}/mo</p>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Assignment & Tracking</h3>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Assigned To</p>
              <p style={styles.fieldValue}>{lead.assignedTo}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Created</p>
              <p style={styles.fieldValue}>{lead.createdAt}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Last Updated</p>
              <p style={styles.fieldValue}>{lead.updatedAt}</p>
            </div>
            {lead.nextFollowUp && (
              <div style={styles.followUpCard}>
                <div>
                  <p style={styles.followUpLabel}>Next Follow-up</p>
                  <p style={styles.followUpDate}>{lead.nextFollowUp}</p>
                </div>
              </div>
            )}
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Notes</h3>
            <textarea
              style={styles.notesArea}
              defaultValue={lead.notes}
              placeholder="Add notes about this lead..."
            />
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              Activity Timeline ({lead.activities.length})
            </h3>
            <div style={styles.timeline}>
              <div style={styles.timelineLine} />
              {sortedActivities.map((activity) => (
                <div key={activity.id} style={styles.timelineItem}>
                  <div style={styles.timelineDot}>
                    {activityTypeIcons[activity.type] ?? ''}
                  </div>
                  <div style={styles.timelineContent}>
                    <p style={styles.timelineType}>
                      {activity.type}
                    </p>
                    <p style={styles.timelineDesc}>
                      {activity.description}
                    </p>
                    <p style={styles.timelineMeta}>
                      {activity.date} &middot; {activity.createdBy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
