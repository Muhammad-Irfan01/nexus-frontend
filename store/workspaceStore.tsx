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
  inviteMember: (workspaceId: string, email: string) => Promise<void>;
  updateMemberRole: (workspaceId: string, memberId: string, role: string) => Promise<void>;
  removeMember: (workspaceId: string, memberId: string) => Promise<void>;
  getWorkspaceSetting: (workspaceId: string) => Promise<any>;
  updateWorkspaceSetting: (workspaceId: string, dto: any) => Promise<any>;
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

  inviteMember: async (workspaceId, email) => {
    await apiClient(`workspace/${workspaceId}/invite`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    toast.success('Invitation sent');
  },

  updateMemberRole: async (workspaceId, memberId, role) => {
    await apiClient(`workspace/${workspaceId}/members/${memberId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
    toast.success('Role updated');
  },

  removeMember: async (workspaceId, memberId) => {
    await apiClient(`workspace/${workspaceId}/members/${memberId}`, {
      method: 'DELETE',
    });
    toast.success('Member removed');
  },

  getWorkspaceSetting: async (workspaceId) => {
    return await apiClient<any>(`workspace/${workspaceId}/settings`);
  },

  updateWorkspaceSetting: async (workspaceId, dto) => {
    return await apiClient<any>(`workspace/${workspaceId}/settings`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
  },
}));
