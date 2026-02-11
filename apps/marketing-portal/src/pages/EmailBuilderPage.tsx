import { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  lastModified: string;
  usedIn: number;
}

const mockTemplates: EmailTemplate[] = [
  { id: '1', name: 'Promotional Offer', category: 'Promotion', lastModified: '2026-02-08', usedIn: 5 },
  { id: '2', name: 'Weekly Newsletter', category: 'Newsletter', lastModified: '2026-02-06', usedIn: 12 },
  { id: '3', name: 'New Menu Announcement', category: 'Announcement', lastModified: '2026-02-03', usedIn: 2 },
  { id: '4', name: 'Loyalty Rewards Update', category: 'Loyalty', lastModified: '2026-01-29', usedIn: 4 },
  { id: '5', name: 'Event Invitation', category: 'Event', lastModified: '2026-01-25', usedIn: 3 },
  { id: '6', name: 'Re-engagement', category: 'Retention', lastModified: '2026-01-20', usedIn: 2 },
];

const contentBlocks = [
  { id: 'header', label: 'Header', icon: '🔝' },
  { id: 'text', label: 'Text Block', icon: '📝' },
  { id: 'image', label: 'Image', icon: '🖼' },
  { id: 'button', label: 'Button', icon: '🔘' },
  { id: 'divider', label: 'Divider', icon: '➖' },
  { id: 'columns', label: '2 Columns', icon: '📊' },
  { id: 'product', label: 'Product Card', icon: '🍽' },
  { id: 'social', label: 'Social Links', icon: '🔗' },
  { id: 'footer', label: 'Footer', icon: '🔚' },
];

export const EmailBuilderPage = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'templates'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <PageContainer
      title="Email Builder"
      subtitle="Create and manage email templates"
    >
      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'templates' ? styles.tabActive : {}),
          }}
          onClick={() => setActiveTab('templates')}
        >
          Templates Library
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'builder' ? styles.tabActive : {}),
          }}
          onClick={() => setActiveTab('builder')}
        >
          Template Editor
        </button>
      </div>

      {/* Templates Library */}
      {activeTab === 'templates' && (
        <div>
          <div style={styles.toolbar}>
            <h3 style={styles.sectionTitle}>Email Templates</h3>
            <button
              style={styles.createButton}
              onClick={() => setActiveTab('builder')}
            >
              + New Template
            </button>
          </div>

          <div style={styles.templateGrid}>
            {mockTemplates.map((template) => (
              <div
                key={template.id}
                style={{
                  ...styles.templateCard,
                  ...(selectedTemplate === template.id ? styles.templateCardSelected : {}),
                }}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div style={styles.templatePreview}>
                  <div style={styles.previewMock}>
                    <div style={styles.previewHeader} />
                    <div style={styles.previewLine} />
                    <div style={styles.previewLineShort} />
                    <div style={styles.previewImage} />
                    <div style={styles.previewLine} />
                    <div style={styles.previewButton} />
                  </div>
                </div>
                <div style={styles.templateInfo}>
                  <h4 style={styles.templateName}>{template.name}</h4>
                  <div style={styles.templateMeta}>
                    <span style={styles.templateCategory}>{template.category}</span>
                    <span style={styles.templateDate}>{template.lastModified}</span>
                  </div>
                  <span style={styles.templateUsage}>
                    Used in {template.usedIn} campaign{template.usedIn !== 1 ? 's' : ''}
                  </span>
                </div>
                <div style={styles.templateActions}>
                  <button
                    style={styles.editTemplateButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('builder');
                    }}
                  >
                    Edit
                  </button>
                  <button style={styles.duplicateButton}>Duplicate</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Editor */}
      {activeTab === 'builder' && (
        <div style={styles.editorLayout}>
          {/* Left Panel - Content Blocks */}
          <div style={styles.blocksPanel}>
            <h3 style={styles.panelTitle}>Content Blocks</h3>
            <p style={styles.panelDescription}>
              Drag blocks to build your email template.
            </p>
            <div style={styles.blocksList}>
              {contentBlocks.map((block) => (
                <div key={block.id} style={styles.blockItem}>
                  <span style={styles.blockIcon}>{block.icon}</span>
                  <span style={styles.blockLabel}>{block.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Email Preview */}
          <div style={styles.previewPanel}>
            <div style={styles.previewToolbar}>
              <input
                type="text"
                style={styles.templateNameInput}
                placeholder="Template Name"
                defaultValue="New Email Template"
              />
              <div style={styles.previewActions}>
                <button style={styles.previewActionButton}>Preview</button>
                <button style={styles.sendTestButton}>Send Test</button>
                <button style={styles.saveTemplateButton}>Save</button>
              </div>
            </div>
            <div style={styles.emailCanvas}>
              <div style={styles.canvasPlaceholder}>
                <div style={styles.emailMock}>
                  {/* Mock email header */}
                  <div style={styles.mockHeader}>
                    <div style={styles.mockLogo} />
                    <span style={styles.mockBrand}>Restaurant Name</span>
                  </div>

                  {/* Mock hero image */}
                  <div style={styles.mockHero}>
                    <span style={styles.mockHeroText}>Hero Image</span>
                  </div>

                  {/* Mock content */}
                  <div style={styles.mockContent}>
                    <div style={styles.mockTitle} />
                    <div style={styles.mockText} />
                    <div style={styles.mockText} />
                    <div style={styles.mockTextShort} />
                  </div>

                  {/* Mock CTA */}
                  <div style={styles.mockCta}>
                    <div style={styles.mockCtaButton}>Order Now</div>
                  </div>

                  {/* Mock footer */}
                  <div style={styles.mockFooter}>
                    <div style={styles.mockFooterText} />
                    <span style={styles.mockUnsubscribe}>Unsubscribe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Properties */}
          <div style={styles.propertiesPanel}>
            <h3 style={styles.panelTitle}>Properties</h3>
            <div style={styles.propertyGroup}>
              <label style={styles.propertyLabel}>Subject Line</label>
              <input
                type="text"
                style={styles.propertyInput}
                placeholder="Email subject..."
              />
            </div>
            <div style={styles.propertyGroup}>
              <label style={styles.propertyLabel}>Preview Text</label>
              <input
                type="text"
                style={styles.propertyInput}
                placeholder="Preview text..."
              />
            </div>
            <div style={styles.propertyGroup}>
              <label style={styles.propertyLabel}>Background Color</label>
              <input
                type="color"
                style={styles.colorInput}
                defaultValue="#ffffff"
              />
            </div>
            <div style={styles.propertyGroup}>
              <label style={styles.propertyLabel}>Font Family</label>
              <select style={styles.propertyInput}>
                <option>Arial</option>
                <option>Helvetica</option>
                <option>Georgia</option>
                <option>Verdana</option>
              </select>
            </div>
            <div style={styles.propertyGroup}>
              <label style={styles.propertyLabel}>Content Width</label>
              <select style={styles.propertyInput}>
                <option>600px</option>
                <option>640px</option>
                <option>700px</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  tabs: {
    display: 'flex',
    gap: 0,
    marginBottom: 24,
    borderBottom: '2px solid #e2e8f0',
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    color: '#718096',
    marginBottom: -2,
  },
  tabActive: {
    color: '#6c63ff',
    borderBottomColor: '#6c63ff',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16,
  },
  templateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '2px solid #e2e8f0',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  templateCardSelected: {
    borderColor: '#6c63ff',
  },
  templatePreview: {
    padding: 16,
    backgroundColor: '#f7fafc',
    display: 'flex',
    justifyContent: 'center',
  },
  previewMock: {
    width: 160,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  previewHeader: {
    height: 20,
    backgroundColor: '#6c63ff',
    borderRadius: 2,
    marginBottom: 8,
  },
  previewLine: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 4,
  },
  previewLineShort: {
    height: 6,
    width: '60%',
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 8,
  },
  previewImage: {
    height: 40,
    backgroundColor: '#edf2f7',
    borderRadius: 2,
    marginBottom: 8,
  },
  previewButton: {
    height: 16,
    width: '50%',
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    margin: '8px auto 0',
  },
  templateInfo: {
    padding: '12px 16px',
  },
  templateName: {
    margin: '0 0 4px',
    fontSize: 14,
    fontWeight: 600,
    color: '#2d3748',
  },
  templateMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  templateCategory: {
    fontSize: 12,
    color: '#6c63ff',
    fontWeight: 500,
  },
  templateDate: {
    fontSize: 12,
    color: '#a0aec0',
  },
  templateUsage: {
    fontSize: 12,
    color: '#718096',
  },
  templateActions: {
    display: 'flex',
    gap: 8,
    padding: '8px 16px',
    borderTop: '1px solid #edf2f7',
  },
  editTemplateButton: {
    flex: 1,
    padding: '6px 12px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
  },
  duplicateButton: {
    flex: 1,
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    color: '#4a5568',
  },
  editorLayout: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr 240px',
    gap: 16,
    minHeight: 600,
  },
  blocksPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 16,
  },
  panelTitle: {
    margin: '0 0 8px',
    fontSize: 14,
    fontWeight: 600,
    color: '#2d3748',
  },
  panelDescription: {
    margin: '0 0 16px',
    fontSize: 12,
    color: '#a0aec0',
  },
  blocksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  blockItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 12px',
    backgroundColor: '#f7fafc',
    borderRadius: 6,
    cursor: 'grab',
    border: '1px solid #e2e8f0',
    fontSize: 13,
    color: '#4a5568',
  },
  blockIcon: {
    fontSize: 16,
  },
  blockLabel: {
    fontWeight: 500,
  },
  previewPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
  },
  previewToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
  },
  templateNameInput: {
    border: '1px solid #e2e8f0',
    borderRadius: 4,
    padding: '6px 10px',
    fontSize: 14,
    fontWeight: 500,
    width: 200,
  },
  previewActions: {
    display: 'flex',
    gap: 8,
  },
  previewActionButton: {
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    color: '#4a5568',
  },
  sendTestButton: {
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    color: '#4a5568',
  },
  saveTemplateButton: {
    padding: '6px 12px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
  },
  emailCanvas: {
    flex: 1,
    padding: 24,
    backgroundColor: '#edf2f7',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
  },
  canvasPlaceholder: {
    width: 600,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  emailMock: {
    padding: 0,
  },
  mockHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '20px 24px',
    backgroundColor: '#6c63ff',
  },
  mockLogo: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  mockBrand: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
  },
  mockHero: {
    height: 200,
    backgroundColor: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockHeroText: {
    color: '#a0aec0',
    fontSize: 14,
  },
  mockContent: {
    padding: '24px 32px',
  },
  mockTitle: {
    height: 20,
    width: '70%',
    backgroundColor: '#2d3748',
    borderRadius: 2,
    marginBottom: 16,
  },
  mockText: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 8,
  },
  mockTextShort: {
    height: 8,
    width: '50%',
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  mockCta: {
    padding: '16px 32px 32px',
    textAlign: 'center' as const,
  },
  mockCtaButton: {
    display: 'inline-block',
    padding: '12px 32px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
  },
  mockFooter: {
    padding: '16px 32px',
    backgroundColor: '#f7fafc',
    textAlign: 'center' as const,
  },
  mockFooterText: {
    height: 6,
    width: '60%',
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    margin: '0 auto 8px',
  },
  mockUnsubscribe: {
    fontSize: 11,
    color: '#a0aec0',
  },
  propertiesPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 16,
  },
  propertyGroup: {
    marginBottom: 16,
  },
  propertyLabel: {
    display: 'block',
    marginBottom: 4,
    fontSize: 12,
    fontWeight: 500,
    color: '#718096',
  },
  propertyInput: {
    width: '100%',
    padding: '6px 10px',
    border: '1px solid #e2e8f0',
    borderRadius: 4,
    fontSize: 13,
    boxSizing: 'border-box' as const,
  },
  colorInput: {
    width: '100%',
    height: 32,
    border: '1px solid #e2e8f0',
    borderRadius: 4,
    cursor: 'pointer',
  },
};
