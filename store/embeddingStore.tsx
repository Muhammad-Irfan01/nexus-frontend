import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface EmbeddingState {
  embeddingStatus: any;
  isLoading: boolean;
  generateEmbeddings: (documentId: string) => Promise<void>;
  fetchEmbeddingStatus: (documentId: string) => Promise<void>;
  retryEmbeddings: (documentId: string) => Promise<void>;
}

export const useEmbeddingStore = create<EmbeddingState>((set) => ({
  embeddingStatus: null,
  isLoading: false,

  generateEmbeddings: async (documentId) => {
    try {
      await apiClient(`embeddings/document/${documentId}/generate`, { method: 'POST' });
      toast("Embeddings Queued", {
        description: "Embedding generation started.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      toast("Generation Failed", {
        description: error.message || "Unable to queue embeddings.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  fetchEmbeddingStatus: async (documentId) => {
    set({ isLoading: true });
    try {
      const status = await apiClient<any>(`embeddings/document/${documentId}/status`);
      set({ embeddingStatus: status, isLoading: false });
    } catch {
      set({ embeddingStatus: null, isLoading: false });
    }
  },

  retryEmbeddings: async (documentId) => {
    try {
      await apiClient(`embeddings/document/${documentId}/retry`, { method: 'POST' });
      toast("Retry Initiated", {
        description: "Retrying failed embeddings.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      toast("Retry Failed", {
        description: error.message || "Unable to retry embeddings.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
