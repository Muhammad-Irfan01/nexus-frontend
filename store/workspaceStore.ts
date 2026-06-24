import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
}

interface WorkspaceState {
  workspaces: any[];
  isLoading: boolean;
  createWorkspace: (dto: CreateWorkspaceDto) => Promise<any>;
  getMyWorkspaces: () => Promise<void>;
  getWorkspaceById: (id: string) => Promise<any>;
  updateWorkspace: (id: string, dto: UpdateWorkspaceDto) => Promise<any>;
  deleteWorkspace: (id: string) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  isLoading: false,

  createWorkspace: async (dto) => {
    set({ isLoading: true });
    const promise = apiClient<any>('workspace', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    
    toast.promise(promise, {
      loading: 'Creating workspace...',
      success: 'Workspace created successfully.',
      error: 'Failed to create workspace.',
    });

    try {
      const workspace = await promise;
      set((state) => ({ workspaces: [...state.workspaces, workspace], isLoading: false }));
      return workspace;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getMyWorkspaces: async () => {
    set({ isLoading: true });
    try {
      const workspaces = await apiClient<any[]>('workspace');
      set({ workspaces, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch workspaces');
    }
  },

  getWorkspaceById: async (id) => {
    set({ isLoading: true });
    try {
      const workspace = await apiClient<any>(`workspace/${id}`);
      set({ isLoading: false });
      return workspace;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateWorkspace: async (id, dto) => {
    set({ isLoading: true });
    const promise = apiClient<any>(`workspace/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });

    toast.promise(promise, {
      loading: 'Updating workspace...',
      success: 'Workspace updated successfully.',
      error: 'Failed to update workspace.',
    });

    try {
      const workspace = await promise;
      set((state) => ({
        workspaces: state.workspaces.map((w) => w.id === id ? workspace : w),
        isLoading: false
      }));
      return workspace;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteWorkspace: async (id) => {
    set({ isLoading: true });
    try {
      await apiClient(`workspace/${id}`, { method: 'DELETE' });
      set((state) => ({
        workspaces: state.workspaces.filter((w) => w.id !== id),
        isLoading: false
      }));
      toast("Workspace Deleted", {
        description: "Workspace removed successfully.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Deletion Failed", {
        description: error.message || "Unable to delete workspace.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
