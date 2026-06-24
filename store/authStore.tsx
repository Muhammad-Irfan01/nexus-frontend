import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  forgotPassword: (dto: ForgotPasswordDto) => Promise<void>;
  resetPassword: (dto: ResetPasswordDto) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (dto) => {
    set({ isLoading: true });
    try {
      const response = await apiClient<{ accessToken: string; refreshToken: string; user: any }>('auth/login', {
        method: 'POST',
        body: JSON.stringify(dto),
      });
      localStorage.setItem('access_token', response.accessToken);
      localStorage.setItem('refresh_token', response.refreshToken);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
      toast("Connection Initialized", {
        description: "Authentication successful. Access granted.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Connection Rejected", {
        description: error.message || "Invalid credentials.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  register: async (dto) => {
    set({ isLoading: true });
    try {
      await apiClient('auth/register', {
        method: 'POST',
        body: JSON.stringify(dto),
      });
      set({ isLoading: false });
      toast("Account Provisioned", {
        description: "User identity created successfully.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Provisioning Failed", {
        description: error.message || "Unable to create account.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  forgotPassword: async (dto) => {
    set({ isLoading: true });
    try {
      await apiClient('auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(dto),
      });
      set({ isLoading: false });
      toast("Recovery Sent", {
        description: "Password reset link sent to your inbox.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast("Recovery Failed", {
        description: error.message || "Unable to send reset email.",
        icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
      });
      throw error;
    }
  },

  resetPassword: async (dto) => {
    set({ isLoading: true });
    try {
      await apiClient('auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(dto),
      });
      set({ isLoading: false });
      toast("Password Updated", {
        description: "Your credentials have been updated.",
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

  logout: async () => {
    set({ isLoading: true });
    try {
      await apiClient('auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      set({ user: null, isAuthenticated: false, isLoading: false });
      toast("Connection Terminated", {
        description: "Session destroyed.",
        icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
      });
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const user = await apiClient<any>('auth/me');
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
