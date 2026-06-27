import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle, Cpu } from "lucide-react";

interface DocumentState {
  documents: any[];
  isLoading: boolean;
  uploadDocument: (workspaceId: string, file: File) => Promise<void>;
  fetchWorkspaceDocuments: (workspaceId: string) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  isLoading: false,

  uploadDocument: async (workspaceId, file) => {
    set({ isLoading: true });
    
    const formData = new FormData();
    formData.append('file', file);
    
    const promise = apiClient<any>(`documents/workspace/${workspaceId}/upload`, {
        method: 'POST',
        body: formData,
    });

    toast.promise(promise, {
        loading: 'Uploading document...',
        success: 'Document uploaded and processing.',
        error: 'Upload failed.',
        icon: <Cpu className="w-4 h-4 text-accent-highlight animate-pulse" />
    });

    try {
        await promise;
        set({ isLoading: false });
    } catch (error) {
        set({ isLoading: false });
        throw error;
    }
  },

  fetchWorkspaceDocuments: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const documents = await apiClient<any[]>(`documents/workspace/${workspaceId}`);
      set({ documents, isLoading: false });
    } catch {
      set({ documents: [], isLoading: false });
    }
  },

  deleteDocument: async (documentId) => {
    try {
      await apiClient(`documents/${documentId}`, { method: 'DELETE' });
      set((state) => ({
        documents: state.documents.filter((d) => d.id !== documentId),
      }));
      toast("Document Deleted", {
        description: "Document removed successfully.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      toast("Deletion Failed", {
        description: error.message || "Unable to delete document.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
