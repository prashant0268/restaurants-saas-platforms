import type { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { StatusBadge } from '../components/shared/StatusBadge';

const styles: Record<string, CSSProperties> = {
  backBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  message: {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '12px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  messageUser: {
    backgroundColor: '#f3f4f6',
    borderLeft: '3px solid #d1d5db',
  },
  messageAdmin: {
    backgroundColor: '#dbeafe',
    borderLeft: '3px solid #3b82f6',
  },
  messageMeta: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    fontWeight: 600,
  },
  messageText: {
    color: '#374151',
    margin: 0,
  },
  replyBox: {
    marginTop: '16px',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  sendBtn: {
    marginTop: '12px',
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
  },
  infoLabel: {
    color: '#6b7280',
    fontWeight: 500,
  },
  infoValue: {
    color: '#111827',
  },
};

export const SupportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <PageContainer title="Ticket Detail">
      <button style={styles.backBtn} onClick={() => navigate('/support')}>
        &larr; Back to Support
      </button>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Ticket #{id} <StatusBadge status="open" />
          </h1>
          <p style={styles.subtitle}>
            Order never delivered but charged | Opened: Feb 9, 2026
          </p>
        </div>
        <div style={styles.actions}>
          <button
            style={{ ...styles.actionBtn, backgroundColor: '#d1fae5', color: '#065f46' }}
          >
            Resolve
          </button>
          <button
            style={{ ...styles.actionBtn, backgroundColor: '#fef3c7', color: '#92400e' }}
          >
            Escalate
          </button>
          <button
            style={{ ...styles.actionBtn, backgroundColor: '#e5e7eb', color: '#374151' }}
          >
            Close
          </button>
        </div>
      </div>

      <div style={styles.grid}>
        {/* Conversation */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Conversation</h3>

          <div style={{ ...styles.message, ...styles.messageUser }}>
            <p style={styles.messageMeta}>Alice Johnson -- Feb 9, 2026 12:30 PM</p>
            <p style={styles.messageText}>
              I placed an order yesterday (Order #12456) and it says it was
              delivered, but I never received it. I was charged $34.50.
              Can you please look into this and issue a refund?
            </p>
          </div>

          <div style={{ ...styles.message, ...styles.messageAdmin }}>
            <p style={styles.messageMeta}>Support Agent (Mike) -- Feb 9, 2026 1:15 PM</p>
            <p style={styles.messageText}>
              Hi Alice, thank you for reaching out. I am looking into this
              now. I can see the order was marked as delivered by the driver.
              Let me verify the GPS logs and contact the driver for more details.
            </p>
          </div>

          <div style={{ ...styles.message, ...styles.messageUser }}>
            <p style={styles.messageMeta}>Alice Johnson -- Feb 9, 2026 2:00 PM</p>
            <p style={styles.messageText}>
              Thank you for the quick response. I have been waiting at
              home all afternoon and no one came to my door. Please
              resolve this as soon as possible.
            </p>
          </div>

          {/* Reply Box */}
          <div style={styles.replyBox}>
            <textarea
              style={styles.textarea}
              placeholder="Type your reply..."
            />
            <button style={styles.sendBtn}>Send Reply</button>
          </div>
        </div>

        {/* Ticket Info */}
        <div>
          <div style={{ ...styles.card, marginBottom: '24px' }}>
            <h3 style={styles.cardTitle}>Ticket Details</h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status</span>
              <span style={styles.infoValue}><StatusBadge status="open" /></span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Priority</span>
              <span style={styles.infoValue}><StatusBadge status="cancelled" label="High" /></span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Category</span>
              <span style={styles.infoValue}>Dispute</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Submitted By</span>
              <span style={styles.infoValue}>Alice Johnson</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Related Order</span>
              <span style={styles.infoValue}>#ORD-12456</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Assigned To</span>
              <span style={styles.infoValue}>Mike (Support Agent)</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Created</span>
              <span style={styles.infoValue}>Feb 9, 2026 12:30 PM</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Last Updated</span>
              <span style={styles.infoValue}>Feb 9, 2026 2:00 PM</span>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Related Information</h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Restaurant</span>
              <span style={styles.infoValue}>Pizza Palace</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Driver</span>
              <span style={styles.infoValue}>David Miller</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Order Amount</span>
              <span style={styles.infoValue}>$34.50</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
