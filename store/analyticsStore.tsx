import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';

interface AnalyticsState {
  overview: any;
  recentActivity: any[];
  usage: any[];
  isLoading: boolean;
  fetchAnalytics: (workspaceId: string) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  overview: null,
  recentActivity: [],
  usage: [],
  isLoading: false,

  fetchAnalytics: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const [overview, recentActivity, usage] = await Promise.all([
        apiClient<any>(`analytics/${workspaceId}/overview`),
        apiClient<any[]>(`analytics/${workspaceId}/recent-activity`),
        apiClient<any[]>(`analytics/${workspaceId}/usage`),
      ]);
      set({ overview, recentActivity, usage, isLoading: false });
    } catch {
      set({ overview: null, recentActivity: [], usage: [], isLoading: false });
    }
  },
}));
