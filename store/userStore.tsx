import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  timezone?: string;
}

export interface ChangePasswordDto {
  password?: string;
  newPassword?: string;
}

interface UserState {
  profile: any | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (dto: UpdateProfileDto) => Promise<void>;
  changePassword: (dto: ChangePasswordDto) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,

  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const profile = await apiClient<any>('users/profile');
      set({ profile, isLoading: false });
    } catch {
      set({ profile: null, isLoading: false });
    }
  },

  updateProfile: async (dto) => {
    set({ isLoading: true });
    try {
      const profile = await apiClient<any>('users/profile', {
        method: 'PATCH',
        body: JSON.stringify(dto),
      });
      set({ profile, isLoading: false });
      toast("Profile Updated", {
        description: "Your profile information has been saved.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Update Failed", {
        description: error.message || "Unable to update profile.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  changePassword: async (dto) => {
    set({ isLoading: true });
    try {
      await apiClient('users/change-password', {
        method: 'PATCH',
        body: JSON.stringify(dto),
      });
      set({ isLoading: false });
      toast("Password Updated", {
        description: "Your security credentials have been updated.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Update Failed", {
        description: error.message || "Unable to update password.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  deleteAccount: async () => {
    set({ isLoading: true });
    try {
      await apiClient('users/account', { method: 'DELETE' });
      set({ profile: null, isLoading: false });
      toast("Account Removed", {
        description: "Your account has been deleted.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Deletion Failed", {
        description: error.message || "Unable to delete account.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },
}));
