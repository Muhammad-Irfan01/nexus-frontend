import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface EmbeddingState {
  isLoading: boolean;
  generateEmbeddings: (documentId: string) => Promise<void>;
  getEmbeddingStatus: (documentId: string) => Promise<any>;
  retryEmbeddings: (documentId: string) => Promise<void>;
}

export const useEmbeddingStore = create<EmbeddingState>((set) => ({
  isLoading: false,

  generateEmbeddings: async (documentId) => {
    set({ isLoading: true });
    const promise = apiClient<void>(`embedding/generate/${documentId}`, {
      method: 'POST',
    });

    toast.promise(promise, {
      loading: 'Generating embeddings...',
      success: 'Embeddings generation started.',
      error: 'Failed to start generation.',
    });

    try {
      await promise;
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getEmbeddingStatus: async (documentId) => {
    set({ isLoading: true });
    try {
      const status = await apiClient<any>(`embedding/status/${documentId}`);
      set({ isLoading: false });
      return status;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  retryEmbeddings: async (documentId) => {
    set({ isLoading: true });
    const promise = apiClient<void>(`embedding/retry/${documentId}`, {
      method: 'POST',
    });

    toast.promise(promise, {
      loading: 'Retrying embeddings...',
      success: 'Retrying generation.',
      error: 'Failed to retry.',
    });

    try {
      await promise;
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
