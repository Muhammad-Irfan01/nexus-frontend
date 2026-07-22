import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';

interface AnalyticsState {
  overview: any;
  recentActivity: any[];
  usage: any[];
  usageOverTime: any[];
  isLoading: boolean;
  fetchAnalytics: (workspaceId: string) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  overview: null,
  recentActivity: [],
  usage: [],
  usageOverTime: [],
  isLoading: false,

  fetchAnalytics: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const [overview, recentActivity, usage, usageOverTime] = await Promise.all([
        apiClient<any>(`analytics/${workspaceId}/overview`),
        apiClient<any[]>(`analytics/${workspaceId}/recent-activity`),
        apiClient<any[]>(`analytics/${workspaceId}/usage`),
        apiClient<any[]>(`analytics/${workspaceId}/usage-over-time`),
      ]);
      set({ overview, recentActivity, usage, usageOverTime, isLoading: false });
    } catch {
      set({ overview: null, recentActivity: [], usage: [], usageOverTime: [], isLoading: false });
    }
  },
}));
