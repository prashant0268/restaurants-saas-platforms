import { create } from 'zustand';

type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'scheduled';
type CampaignChannel = 'email' | 'sms' | 'push' | 'in-app';

interface Campaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  audience: string;
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  createdAt: string;
  scheduledAt?: string;
}

interface CampaignState {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  isLoading: boolean;
  filter: CampaignStatus | 'all';
  setFilter: (filter: CampaignStatus | 'all') => void;
  fetchCampaigns: () => Promise<void>;
  selectCampaign: (id: string) => void;
  clearSelection: () => void;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Weekend Brunch Special',
    channel: 'email',
    status: 'active',
    audience: 'Brunch Lovers',
    sentCount: 5200,
    deliveredCount: 5100,
    openedCount: 2340,
    clickedCount: 890,
    createdAt: '2026-02-01',
  },
  {
    id: '2',
    name: 'Valentine\'s Day Dinner',
    channel: 'push',
    status: 'scheduled',
    audience: 'All Customers',
    sentCount: 0,
    deliveredCount: 0,
    openedCount: 0,
    clickedCount: 0,
    createdAt: '2026-02-05',
    scheduledAt: '2026-02-14',
  },
  {
    id: '3',
    name: 'Loyalty Points Reminder',
    channel: 'sms',
    status: 'completed',
    audience: 'Loyalty Members',
    sentCount: 3400,
    deliveredCount: 3350,
    openedCount: 2100,
    clickedCount: 670,
    createdAt: '2026-01-20',
  },
  {
    id: '4',
    name: 'New Menu Launch',
    channel: 'email',
    status: 'draft',
    audience: 'Regular Diners',
    sentCount: 0,
    deliveredCount: 0,
    openedCount: 0,
    clickedCount: 0,
    createdAt: '2026-02-08',
  },
  {
    id: '5',
    name: 'Happy Hour Flash Sale',
    channel: 'push',
    status: 'paused',
    audience: 'Happy Hour Segment',
    sentCount: 1800,
    deliveredCount: 1750,
    openedCount: 920,
    clickedCount: 340,
    createdAt: '2026-02-03',
  },
];

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  selectedCampaign: null,
  isLoading: false,
  filter: 'all',

  setFilter: (filter) => {
    set({ filter });
  },

  fetchCampaigns: async () => {
    set({ isLoading: true });
    try {
      // TODO: Replace with Firestore query
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ campaigns: mockCampaigns, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  selectCampaign: (id: string) => {
    const campaign = get().campaigns.find((c) => c.id === id) ?? null;
    set({ selectedCampaign: campaign });
  },

  clearSelection: () => {
    set({ selectedCampaign: null });
  },
}));
