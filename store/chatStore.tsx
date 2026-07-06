import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export interface CreateConversationDto {
  workspaceId: string;
  title: string;
}

export interface SendMessageDto {
  message: string;
}

interface ChatState {
  conversations: any[];
  isLoading: boolean;
  createConversation: (dto: CreateConversationDto) => Promise<any>;
  getConversations: (workspaceId: string) => Promise<void>;
  getConversation: (id: string) => Promise<any>;
  sendMessage: (conversationId: string, dto: SendMessageDto) => Promise<any>;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  isLoading: false,

  createConversation: async (dto) => {
    set({ isLoading: true });
    // Remove workspaceId from the body as it's passed in the URL
    const { workspaceId, ...body } = dto;
    
    const promise = apiClient<any>(`chat/workspace/${workspaceId}/conversations`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    toast.promise(promise, {
      loading: 'Creating conversation...',
      success: 'Conversation started.',
      error: 'Failed to start conversation.',
    });

    try {
      const conversation = await promise;
      set((state) => ({ conversations: [...state.conversations, conversation], isLoading: false }));
      return conversation;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getConversations: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const conversations = await apiClient<any[]>(`chat/workspace/${workspaceId}/conversations`);
      set({ conversations, isLoading: false });
    } catch (error) {
      set({ isLoading: false, conversations: [] });
      toast.error('Failed to load conversations'); 
    }
  },

  getConversation: async (id) => {
    set({ isLoading: true });
    try {
      const conversation = await apiClient<any>(`chat/conversations/${id}`);
      set({ isLoading: false });
      return conversation;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  sendMessage: async (conversationId, dto) => {
    set({ isLoading: true });
    const promise = apiClient<any>(`chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(dto),
    });

    toast.promise(promise, {
      loading: 'Sending message...',
      success: 'Message sent.',
      error: 'Failed to send message.',
    });

    try {
      const message = await promise;
      set({ isLoading: false });
      return message;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
