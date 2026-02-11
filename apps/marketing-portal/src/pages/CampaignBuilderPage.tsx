import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';

type WizardStep = 'channel' | 'audience' | 'content' | 'schedule' | 'review';

const steps: Array<{ key: WizardStep; label: string; number: number }> = [
  { key: 'channel', label: 'Channel', number: 1 },
  { key: 'audience', label: 'Audience', number: 2 },
  { key: 'content', label: 'Content', number: 3 },
  { key: 'schedule', label: 'Schedule', number: 4 },
  { key: 'review', label: 'Review', number: 5 },
];

const channels = [
  { id: 'email', label: 'Email', description: 'Send email campaigns to your audience' },
  { id: 'sms', label: 'SMS', description: 'Text message campaigns for quick engagement' },
  { id: 'push', label: 'Push Notification', description: 'In-app push notifications' },
  { id: 'in-app', label: 'In-App Message', description: 'Display messages within the app' },
];

const audiences = [
  { id: 'all', label: 'All Customers', count: 12500 },
  { id: 'loyalty', label: 'Loyalty Members', count: 4200 },
  { id: 'brunch', label: 'Brunch Lovers', count: 1800 },
  { id: 'happy-hour', label: 'Happy Hour Regulars', count: 2100 },
  { id: 'new', label: 'New Customers (30 days)', count: 890 },
  { id: 'inactive', label: 'Inactive (60+ days)', count: 3400 },
];

export const CampaignBuilderPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>('channel');
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [campaignName, setCampaignName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [scheduleType, setScheduleType] = useState<'now' | 'scheduled'>('now');
  const [scheduleDate, setScheduleDate] = useState('');

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].key);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].key);
    }
  };

  const handleSaveDraft = () => {
    // TODO: Save to Firestore
    navigate('/campaigns');
  };

  const handleLaunch = () => {
    // TODO: Save and activate campaign
    navigate('/campaigns');
  };

  return (
    <PageContainer
      title="Campaign Builder"
      subtitle="Create a new marketing campaign"
    >
      {/* Step Indicator */}
      <div style={styles.stepIndicator}>
        {steps.map((step, idx) => (
          <div key={step.key} style={styles.stepItem}>
            <div
              style={{
                ...styles.stepCircle,
                ...(idx <= currentStepIndex ? styles.stepCircleActive : {}),
              }}
            >
              {step.number}
            </div>
            <span
              style={{
                ...styles.stepLabel,
                ...(idx <= currentStepIndex ? styles.stepLabelActive : {}),
              }}
            >
              {step.label}
            </span>
            {idx < steps.length - 1 && <div style={styles.stepLine} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div style={styles.stepContent}>
        {/* Step 1: Channel Selection */}
        {currentStep === 'channel' && (
          <div>
            <h3 style={styles.stepTitle}>Select Campaign Channel</h3>
            <p style={styles.stepDescription}>
              Choose how you want to reach your audience.
            </p>
            <div style={styles.channelGrid}>
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  style={{
                    ...styles.channelCard,
                    ...(selectedChannel === ch.id ? styles.channelCardSelected : {}),
                  }}
                  onClick={() => setSelectedChannel(ch.id)}
                >
                  <strong style={styles.channelLabel}>{ch.label}</strong>
                  <p style={styles.channelDescription}>{ch.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Audience Targeting */}
        {currentStep === 'audience' && (
          <div>
            <h3 style={styles.stepTitle}>Select Target Audience</h3>
            <p style={styles.stepDescription}>
              Choose a customer segment for this campaign.
            </p>
            <div style={styles.audienceList}>
              {audiences.map((aud) => (
                <button
                  key={aud.id}
                  style={{
                    ...styles.audienceItem,
                    ...(selectedAudience === aud.id ? styles.audienceItemSelected : {}),
                  }}
                  onClick={() => setSelectedAudience(aud.id)}
                >
                  <span style={styles.audienceName}>{aud.label}</span>
                  <span style={styles.audienceCount}>
                    {aud.count.toLocaleString()} contacts
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Content Editor */}
        {currentStep === 'content' && (
          <div>
            <h3 style={styles.stepTitle}>Campaign Content</h3>
            <p style={styles.stepDescription}>
              Compose your campaign message.
            </p>
            <div style={styles.formGroup}>
              <label style={styles.label}>Campaign Name</label>
              <input
                type="text"
                style={styles.input}
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Weekend Brunch Special"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject Line</label>
              <input
                type="text"
                style={styles.input}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Your exclusive weekend offer awaits!"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Message Body</label>
              <textarea
                style={styles.textarea}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your campaign message here..."
                rows={8}
              />
            </div>
            <p style={styles.hint}>
              Tip: Use the Email Builder for rich HTML templates.
            </p>
          </div>
        )}

        {/* Step 4: Schedule */}
        {currentStep === 'schedule' && (
          <div>
            <h3 style={styles.stepTitle}>Schedule Campaign</h3>
            <p style={styles.stepDescription}>
              Choose when to send your campaign.
            </p>
            <div style={styles.scheduleOptions}>
              <button
                style={{
                  ...styles.scheduleOption,
                  ...(scheduleType === 'now' ? styles.scheduleOptionSelected : {}),
                }}
                onClick={() => setScheduleType('now')}
              >
                <strong>Send Now</strong>
                <p style={styles.scheduleDescription}>
                  Campaign will be sent immediately after launch.
                </p>
              </button>
              <button
                style={{
                  ...styles.scheduleOption,
                  ...(scheduleType === 'scheduled' ? styles.scheduleOptionSelected : {}),
                }}
                onClick={() => setScheduleType('scheduled')}
              >
                <strong>Schedule for Later</strong>
                <p style={styles.scheduleDescription}>
                  Pick a date and time to send the campaign.
                </p>
              </button>
            </div>
            {scheduleType === 'scheduled' && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Send Date & Time</label>
                <input
                  type="datetime-local"
                  style={styles.input}
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
            )}
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 'review' && (
          <div>
            <h3 style={styles.stepTitle}>Review Campaign</h3>
            <p style={styles.stepDescription}>
              Review your campaign details before launching.
            </p>
            <div style={styles.reviewCard}>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Campaign Name</span>
                <span style={styles.reviewValue}>{campaignName || '(not set)'}</span>
              </div>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Channel</span>
                <span style={styles.reviewValue}>{selectedChannel || '(not set)'}</span>
              </div>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Audience</span>
                <span style={styles.reviewValue}>{selectedAudience || '(not set)'}</span>
              </div>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Subject</span>
                <span style={styles.reviewValue}>{subject || '(not set)'}</span>
              </div>
              <div style={styles.reviewRow}>
                <span style={styles.reviewLabel}>Schedule</span>
                <span style={styles.reviewValue}>
                  {scheduleType === 'now' ? 'Send Immediately' : scheduleDate || '(not set)'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={styles.actions}>
        <button
          style={styles.backButton}
          onClick={goBack}
          disabled={currentStepIndex === 0}
        >
          Back
        </button>
        <div style={styles.rightActions}>
          <button style={styles.draftButton} onClick={handleSaveDraft}>
            Save as Draft
          </button>
          {currentStep === 'review' ? (
            <button style={styles.launchButton} onClick={handleLaunch}>
              Launch Campaign
            </button>
          ) : (
            <button style={styles.nextButton} onClick={goNext}>
              Next Step
            </button>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 0,
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    color: '#718096',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 600,
  },
  stepCircleActive: {
    backgroundColor: '#6c63ff',
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 13,
    color: '#a0aec0',
    fontWeight: 500,
  },
  stepLabelActive: {
    color: '#2d3748',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#e2e8f0',
    margin: '0 8px',
  },
  stepContent: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 32,
    marginBottom: 24,
    minHeight: 300,
  },
  stepTitle: {
    margin: '0 0 8px',
    fontSize: 20,
    fontWeight: 600,
    color: '#1a202c',
  },
  stepDescription: {
    margin: '0 0 24px',
    fontSize: 14,
    color: '#718096',
  },
  channelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
  },
  channelCard: {
    padding: 20,
    borderRadius: 8,
    border: '2px solid #e2e8f0',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    textAlign: 'left' as const,
  },
  channelCardSelected: {
    borderColor: '#6c63ff',
    backgroundColor: '#f5f3ff',
  },
  channelLabel: {
    fontSize: 16,
    color: '#2d3748',
  },
  channelDescription: {
    margin: '8px 0 0',
    fontSize: 13,
    color: '#718096',
  },
  audienceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  audienceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    borderRadius: 8,
    border: '2px solid #e2e8f0',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    textAlign: 'left' as const,
  },
  audienceItemSelected: {
    borderColor: '#6c63ff',
    backgroundColor: '#f5f3ff',
  },
  audienceName: {
    fontSize: 14,
    fontWeight: 500,
    color: '#2d3748',
  },
  audienceCount: {
    fontSize: 13,
    color: '#718096',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 500,
    color: '#4a5568',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  },
  hint: {
    fontSize: 12,
    color: '#a0aec0',
    fontStyle: 'italic',
  },
  scheduleOptions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 24,
  },
  scheduleOption: {
    padding: 20,
    borderRadius: 8,
    border: '2px solid #e2e8f0',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    textAlign: 'left' as const,
  },
  scheduleOptionSelected: {
    borderColor: '#6c63ff',
    backgroundColor: '#f5f3ff',
  },
  scheduleDescription: {
    margin: '8px 0 0',
    fontSize: 13,
    color: '#718096',
  },
  reviewCard: {
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    padding: 24,
    border: '1px solid #e2e8f0',
  },
  reviewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #edf2f7',
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: '#718096',
  },
  reviewValue: {
    fontSize: 14,
    fontWeight: 500,
    color: '#2d3748',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    color: '#4a5568',
  },
  rightActions: {
    display: 'flex',
    gap: 12,
  },
  draftButton: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    color: '#4a5568',
  },
  nextButton: {
    padding: '10px 24px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  launchButton: {
    padding: '10px 24px',
    backgroundColor: '#38a169',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
};
