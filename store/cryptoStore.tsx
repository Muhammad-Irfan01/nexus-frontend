import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';

interface CryptoState {
  apiKeys: any[];
  protocols: any[];
  isLoading: boolean;
  fetchCryptoData: (workspaceId: string) => Promise<void>;
  createApiKey: (workspaceId: string, name: string) => Promise<void>;
  deleteApiKey: (workspaceId: string, id: string) => Promise<void>;
  createProtocol: (workspaceId: string, name: string, configuration: any) => Promise<void>;
  deleteProtocol: (workspaceId: string, id: string) => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  apiKeys: [],
  protocols: [],
  isLoading: false,

  fetchCryptoData: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const [apiKeys, protocols] = await Promise.all([
        apiClient<any[]>(`crypto/${workspaceId}/keys`),
        apiClient<any[]>(`crypto/${workspaceId}/protocols`),
      ]);
      set({ apiKeys, protocols, isLoading: false });
    } catch {
      set({ apiKeys: [], protocols: [], isLoading: false });
    }
  },

  createApiKey: async (workspaceId, name) => {
    await apiClient(`crypto/${workspaceId}/keys`, { method: 'POST', body: JSON.stringify({ name }) });
    await get().fetchCryptoData(workspaceId);
  },

  deleteApiKey: async (workspaceId, id) => {
    await apiClient(`crypto/${workspaceId}/keys/${id}`, { method: 'DELETE' });
    await get().fetchCryptoData(workspaceId);
  },

  createProtocol: async (workspaceId, name, configuration) => {
    await apiClient(`crypto/${workspaceId}/protocols`, { method: 'POST', body: JSON.stringify({ name, configuration }) });
    await get().fetchCryptoData(workspaceId);
  },

  deleteProtocol: async (workspaceId, id) => {
    await apiClient(`crypto/${workspaceId}/protocols/${id}`, { method: 'DELETE' });
    await get().fetchCryptoData(workspaceId);
  },
}));
