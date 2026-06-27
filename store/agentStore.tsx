import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface CreateAgentDto {
    name: string;
    description?: string;
    type: string;
    systemPrompt: string;
}

interface AgentState {
  agents: any[];
  isLoading: boolean;
  createAgent: (workspaceId: string, dto: CreateAgentDto) => Promise<void>;
  fetchAgents: (workspaceId: string) => Promise<void>;
  updateAgent: (agentId: string, dto: any) => Promise<void>;
  deleteAgent: (agentId: string) => Promise<void>;
  executeAgent: (agentId: string, message: string) => Promise<any>;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  isLoading: false,

  createAgent: async (workspaceId, dto) => {
    set({ isLoading: true });
    try {
      await apiClient(`agents/workspace/${workspaceId}`, {
        method: 'POST',
        body: JSON.stringify(dto),
      });
      toast("Agent Created", {
        description: "Agent created successfully.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Creation Failed", {
        description: error.message || "Unable to create agent.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  fetchAgents: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const agents = await apiClient<any[]>(`agents/workspace/${workspaceId}`);
      set({ agents, isLoading: false });
    } catch {
      set({ agents: [], isLoading: false });
    }
  },

  updateAgent: async (agentId, dto) => {
    try {
      await apiClient(`agents/${agentId}`, {
        method: 'PATCH',
        body: JSON.stringify(dto),
      });
      toast("Agent Updated", {
        description: "Agent updated successfully.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      toast("Update Failed", {
        description: error.message || "Unable to update agent.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  deleteAgent: async (agentId) => {
    try {
      await apiClient(`agents/${agentId}`, { method: 'DELETE' });
      set((state) => ({
        agents: state.agents.filter((a) => a.id !== agentId),
      }));
      toast("Agent Deleted", {
        description: "Agent removed successfully.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      toast("Deletion Failed", {
        description: error.message || "Unable to delete agent.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  executeAgent: async (agentId, message) => {
    try {
      return await apiClient<any>(`agents/${agentId}/execute`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
    } catch (error: any) {
      toast("Execution Failed", {
        description: error.message || "Unable to execute agent.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
