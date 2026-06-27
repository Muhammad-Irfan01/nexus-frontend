import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface BillingState {
  subscription: any;
  isLoading: boolean;
  fetchSubscription: (workspaceId: string) => Promise<void>;
  createCheckoutSession: (workspaceId: string, priceId: string) => Promise<string>;
  createPortalSession: (workspaceId: string) => Promise<string>;
}

export const useBillingStore = create<BillingState>((set) => ({
  subscription: null,
  isLoading: false,

  fetchSubscription: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const subscription = await apiClient<any>(`billing/${workspaceId}`);
      set({ subscription, isLoading: false });
    } catch {
      set({ subscription: null, isLoading: false });
    }
  },

  createCheckoutSession: async (workspaceId, priceId) => {
    try {
      const response = await apiClient<{ url: string }>(`billing/${workspaceId}/checkout`, {
        method: 'POST',
        body: JSON.stringify({ priceId }),
      });
      return response.url;
    } catch (error: any) {
      toast("Checkout Failed", {
        description: error.message || "Unable to initiate checkout.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  createPortalSession: async (workspaceId) => {
    try {
      const response = await apiClient<{ url: string }>(`billing/${workspaceId}/portal`, {
        method: 'POST',
      });
      return response.url;
    } catch (error: any) {
      toast("Portal Access Failed", {
        description: error.message || "Unable to access billing portal.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
