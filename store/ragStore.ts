import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export interface AskQuestionDto {
  workspaceId: string;
  question: string;
}

interface RagState {
  isLoading: boolean;
  askQuestion: (dto: AskQuestionDto) => Promise<any>;
}

export const useRagStore = create<RagState>((set) => ({
  isLoading: false,

  askQuestion: async (dto) => {
    set({ isLoading: true });
    const promise = apiClient<any>('rag/ask', {
      method: 'POST',
      body: JSON.stringify(dto),
    });

    toast.promise(promise, {
      loading: 'Thinking...',
      success: 'Answer received.',
      error: 'Failed to get answer.',
    });

    try {
      const answer = await promise;
      set({ isLoading: false });
      return answer;
    } catch (error: any) {
      set({ isLoading: false });
      toast("Error", {
        description: error.message || "Unable to get answer.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
