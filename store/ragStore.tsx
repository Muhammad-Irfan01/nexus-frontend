import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface RagState {
  isLoading: boolean;
  askQuestion: (workspaceId: string, question: string) => Promise<any>;
}

export const useRagStore = create<RagState>((set) => ({
  isLoading: false,

  askQuestion: async (workspaceId, question) => {
    set({ isLoading: true });
    try {
      const response = await apiClient<any>(`rag/${workspaceId}/ask`, {
        method: 'POST',
        body: JSON.stringify({ question }),
      });
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      toast("Query Failed", {
        description: error.message || "Unable to process RAG query.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
