import { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';

type AssetType = 'all' | 'image' | 'banner' | 'template' | 'video';

interface Asset {
  id: string;
  name: string;
  type: AssetType;
  dimensions: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  usedIn: number;
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'brunch-hero-banner.jpg',
    type: 'banner',
    dimensions: '1200x628',
    size: '245 KB',
    uploadedBy: 'Marketing Admin',
    uploadedAt: '2026-02-08',
    usedIn: 3,
  },
  {
    id: '2',
    name: 'valentines-promo.png',
    type: 'image',
    dimensions: '800x800',
    size: '182 KB',
    uploadedBy: 'Marketing Admin',
    uploadedAt: '2026-02-05',
    usedIn: 2,
  },
  {
    id: '3',
    name: 'spring-menu-template.html',
    type: 'template',
    dimensions: '-',
    size: '12 KB',
    uploadedBy: 'Marketing Admin',
    uploadedAt: '2026-02-03',
    usedIn: 1,
  },
  {
    id: '4',
    name: 'loyalty-badge.svg',
    type: 'image',
    dimensions: '200x200',
    size: '8 KB',
    uploadedBy: 'Designer',
    uploadedAt: '2026-01-28',
    usedIn: 5,
  },
  {
    id: '5',
    name: 'happy-hour-banner.jpg',
    type: 'banner',
    dimensions: '1200x628',
    size: '310 KB',
    uploadedBy: 'Marketing Admin',
    uploadedAt: '2026-01-25',
    usedIn: 2,
  },
  {
    id: '6',
    name: 'app-promo-video.mp4',
    type: 'video',
    dimensions: '1920x1080',
    size: '4.2 MB',
    uploadedBy: 'Marketing Admin',
    uploadedAt: '2026-01-20',
    usedIn: 1,
  },
  {
    id: '7',
    name: 'newsletter-header.png',
    type: 'image',
    dimensions: '600x200',
    size: '95 KB',
    uploadedBy: 'Designer',
    uploadedAt: '2026-01-18',
    usedIn: 8,
  },
  {
    id: '8',
    name: 'promo-email-template.html',
    type: 'template',
    dimensions: '-',
    size: '18 KB',
    uploadedBy: 'Marketing Admin',
    uploadedAt: '2026-01-15',
    usedIn: 4,
  },
];

const typeFilters: Array<{ value: AssetType; label: string }> = [
  { value: 'all', label: 'All Assets' },
  { value: 'image', label: 'Images' },
  { value: 'banner', label: 'Banners' },
  { value: 'template', label: 'Templates' },
  { value: 'video', label: 'Videos' },
];

const getTypeIcon = (type: AssetType): string => {
  switch (type) {
    case 'image': return '🖼';
    case 'banner': return '🏞';
    case 'template': return '📄';
    case 'video': return '🎬';
    default: return '📁';
  }
};

export const AssetLibraryPage = () => {
  const [filter, setFilter] = useState<AssetType>('all');

  const filteredAssets =
    filter === 'all'
      ? mockAssets
      : mockAssets.filter((a) => a.type === filter);

  return (
    <PageContainer
      title="Asset Library"
      subtitle="Manage images, banners, and templates"
    >
      {/* Stats */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Total Assets"
          value={mockAssets.length}
          icon="📁"
        />
        <StatsCard
          title="Images & Banners"
          value={mockAssets.filter((a) => a.type === 'image' || a.type === 'banner').length}
          icon="🖼"
        />
        <StatsCard
          title="Templates"
          value={mockAssets.filter((a) => a.type === 'template').length}
          icon="📄"
        />
        <StatsCard
          title="Storage Used"
          value="5.1 MB"
          icon="💾"
        />
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.filters}>
          {typeFilters.map((f) => (
            <button
              key={f.value}
              style={{
                ...styles.filterButton,
                ...(filter === f.value ? styles.filterButtonActive : {}),
              }}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button style={styles.uploadButton}>
          + Upload Asset
        </button>
      </div>

      {/* Asset Grid */}
      <div style={styles.assetGrid}>
        {filteredAssets.map((asset) => (
          <div key={asset.id} style={styles.assetCard}>
            <div style={styles.assetPreview}>
              <span style={styles.assetIcon}>{getTypeIcon(asset.type)}</span>
              <span style={styles.assetTypeBadge}>{asset.type}</span>
            </div>
            <div style={styles.assetInfo}>
              <h4 style={styles.assetName}>{asset.name}</h4>
              <div style={styles.assetMeta}>
                <span>{asset.dimensions}</span>
                <span>{asset.size}</span>
              </div>
              <div style={styles.assetFooter}>
                <span style={styles.assetUsage}>
                  Used in {asset.usedIn} campaign{asset.usedIn !== 1 ? 's' : ''}
                </span>
                <span style={styles.assetDate}>{asset.uploadedAt}</span>
              </div>
            </div>
            <div style={styles.assetActions}>
              <button style={styles.actionButton} title="Preview">👁</button>
              <button style={styles.actionButton} title="Copy URL">📋</button>
              <button style={styles.actionButton} title="Delete">🗑</button>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div style={styles.emptyState}>
          <p>No {filter} assets found. Upload your first asset!</p>
        </div>
      )}
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  filters: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    color: '#4a5568',
  },
  filterButtonActive: {
    backgroundColor: '#6c63ff',
    borderColor: '#6c63ff',
    color: '#ffffff',
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  assetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
  assetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
  },
  assetPreview: {
    height: 140,
    backgroundColor: '#f7fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  assetIcon: {
    fontSize: 48,
  },
  assetTypeBadge: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    padding: '2px 8px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 500,
    color: '#4a5568',
    textTransform: 'capitalize' as const,
  },
  assetInfo: {
    padding: '12px 16px',
  },
  assetName: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: '#2d3748',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  assetMeta: {
    display: 'flex',
    gap: 12,
    marginTop: 4,
    fontSize: 12,
    color: '#a0aec0',
  },
  assetFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  assetUsage: {
    fontSize: 12,
    color: '#718096',
  },
  assetDate: {
    fontSize: 12,
    color: '#a0aec0',
  },
  assetActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 4,
    padding: '8px 12px',
    borderTop: '1px solid #edf2f7',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    padding: '4px 8px',
    borderRadius: 4,
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: 60,
    color: '#a0aec0',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
};
