import { create } from 'zustand';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'demo'
  | 'converted'
  | 'lost';

export type LeadSource =
  | 'website'
  | 'referral'
  | 'cold_call'
  | 'trade_show'
  | 'social_media'
  | 'other';

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
  date: string;
  createdBy: string;
}

export interface Lead {
  id: string;
  restaurantName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  source: LeadSource;
  status: LeadStatus;
  estimatedValue: number;
  assignedTo: string;
  lastActivity: string;
  nextFollowUp?: string;
  notes: string;
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

interface LeadsState {
  leads: Lead[];
  selectedLead: Lead | null;
  filterStatus: LeadStatus | 'all';
  isLoading: boolean;
  error: string | null;
  setLeads: (leads: Lead[]) => void;
  setSelectedLead: (lead: Lead | null) => void;
  setFilterStatus: (status: LeadStatus | 'all') => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  addActivity: (leadId: string, activity: Activity) => void;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    restaurantName: 'Bella Italia',
    contactName: 'Marco Rossi',
    contactEmail: 'marco@bellaitalia.com',
    contactPhone: '(555) 123-4567',
    source: 'website',
    status: 'qualified',
    estimatedValue: 99,
    assignedTo: 'Sarah Johnson',
    lastActivity: '2026-02-08',
    nextFollowUp: '2026-02-12',
    notes: 'Interested in Professional plan. Has 3 locations.',
    activities: [
      {
        id: 'a1',
        type: 'call',
        description: 'Initial discovery call - interested in multi-location support',
        date: '2026-02-05',
        createdBy: 'Sarah Johnson',
      },
      {
        id: 'a2',
        type: 'email',
        description: 'Sent pricing details and feature comparison',
        date: '2026-02-06',
        createdBy: 'Sarah Johnson',
      },
      {
        id: 'a3',
        type: 'meeting',
        description: 'Demo scheduled for Feb 12',
        date: '2026-02-08',
        createdBy: 'Sarah Johnson',
      },
    ],
    createdAt: '2026-02-01',
    updatedAt: '2026-02-08',
  },
  {
    id: '2',
    restaurantName: 'Golden Dragon',
    contactName: 'Li Wei',
    contactEmail: 'liwei@goldendragon.com',
    contactPhone: '(555) 234-5678',
    source: 'referral',
    status: 'new',
    estimatedValue: 49,
    assignedTo: 'Mike Chen',
    lastActivity: '2026-02-09',
    notes: 'Referred by existing customer. Single location.',
    activities: [
      {
        id: 'a4',
        type: 'note',
        description: 'Lead received via referral from Sushi Zen',
        date: '2026-02-09',
        createdBy: 'Mike Chen',
      },
    ],
    createdAt: '2026-02-09',
    updatedAt: '2026-02-09',
  },
  {
    id: '3',
    restaurantName: 'Taco Fiesta',
    contactName: 'Carlos Mendez',
    contactEmail: 'carlos@tacofiesta.com',
    contactPhone: '(555) 345-6789',
    source: 'trade_show',
    status: 'demo',
    estimatedValue: 199,
    assignedTo: 'Sarah Johnson',
    lastActivity: '2026-02-07',
    nextFollowUp: '2026-02-10',
    notes: 'Enterprise prospect with 12 locations. Very interested.',
    activities: [
      {
        id: 'a5',
        type: 'meeting',
        description: 'Met at Food Tech Expo 2026',
        date: '2026-01-28',
        createdBy: 'Sarah Johnson',
      },
      {
        id: 'a6',
        type: 'call',
        description: 'Follow-up call - discussed enterprise features',
        date: '2026-02-03',
        createdBy: 'Sarah Johnson',
      },
      {
        id: 'a7',
        type: 'email',
        description: 'Sent enterprise proposal',
        date: '2026-02-05',
        createdBy: 'Sarah Johnson',
      },
      {
        id: 'a8',
        type: 'meeting',
        description: 'Product demo completed - positive feedback',
        date: '2026-02-07',
        createdBy: 'Sarah Johnson',
      },
    ],
    createdAt: '2026-01-28',
    updatedAt: '2026-02-07',
  },
  {
    id: '4',
    restaurantName: 'Le Petit Bistro',
    contactName: 'Marie Dubois',
    contactEmail: 'marie@lepetitbistro.com',
    contactPhone: '(555) 456-7890',
    source: 'cold_call',
    status: 'contacted',
    estimatedValue: 49,
    assignedTo: 'Mike Chen',
    lastActivity: '2026-02-06',
    nextFollowUp: '2026-02-11',
    notes: 'Small bistro, budget conscious.',
    activities: [
      {
        id: 'a9',
        type: 'call',
        description: 'Cold call - showed some interest, asked for more info',
        date: '2026-02-06',
        createdBy: 'Mike Chen',
      },
    ],
    createdAt: '2026-02-06',
    updatedAt: '2026-02-06',
  },
  {
    id: '5',
    restaurantName: 'Sushi Zen',
    contactName: 'Yuki Tanaka',
    contactEmail: 'yuki@sushizen.com',
    contactPhone: '(555) 567-8901',
    source: 'website',
    status: 'converted',
    estimatedValue: 99,
    assignedTo: 'Sarah Johnson',
    lastActivity: '2026-01-25',
    notes: 'Successfully converted. Professional plan. 2 locations.',
    activities: [
      {
        id: 'a10',
        type: 'meeting',
        description: 'Contract signed - Professional plan',
        date: '2026-01-25',
        createdBy: 'Sarah Johnson',
      },
    ],
    createdAt: '2026-01-10',
    updatedAt: '2026-01-25',
  },
  {
    id: '6',
    restaurantName: 'BBQ Ranch',
    contactName: 'Jake Thompson',
    contactEmail: 'jake@bbqranch.com',
    contactPhone: '(555) 678-9012',
    source: 'social_media',
    status: 'lost',
    estimatedValue: 49,
    assignedTo: 'Mike Chen',
    lastActivity: '2026-01-20',
    notes: 'Went with competitor. Budget was the main concern.',
    activities: [
      {
        id: 'a11',
        type: 'call',
        description: 'Informed us they chose a competitor',
        date: '2026-01-20',
        createdBy: 'Mike Chen',
      },
    ],
    createdAt: '2026-01-05',
    updatedAt: '2026-01-20',
  },
];

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: mockLeads,
  selectedLead: null,
  filterStatus: 'all',
  isLoading: false,
  error: null,

  setLeads: (leads) => set({ leads }),

  setSelectedLead: (lead) => set({ selectedLead: lead }),

  setFilterStatus: (status) => set({ filterStatus: status }),

  addLead: (lead) =>
    set((state) => ({ leads: [...state.leads, lead] })),

  updateLead: (id, updates) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...updates } : lead
      ),
    })),

  addActivity: (leadId, activity) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId
          ? { ...lead, activities: [...lead.activities, activity] }
          : lead
      ),
    })),
}));
