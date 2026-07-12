import { apiClient } from "@/lib/api/apiClient";
import { authClient } from "@/lib/api/authClient";
import { LoginPayload } from "@/types/api/auth.requests";
import {
  LoginResponse,
  RefreshSessionResponse,
} from "@/types/api/auth.response";

import { SignupFormValues } from "@/lib/validators/auth.validator";

import type { User } from "@/types/user.types";

export class AuthService {
  static async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await authClient.post<LoginResponse>(
      "/auth/login",
      payload
    );

    return response.data;
  }

  static async signup(payload: SignupFormValues) {
    const response = await authClient.post("/auth/signup", payload);

    return response.data;
  }

  static async refreshSession(): Promise<RefreshSessionResponse> {
    const response = await authClient.post<RefreshSessionResponse>(
      "/auth/refresh"
    );

    return response.data;
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  }

  static async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>(
      "/auth/forgot-password",
      { email }
    );
    return data;
  }

  static async resetPassword(payload: {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>(
      "/auth/reset-password",
      {
        email: payload.email,
        otp: payload.otp,
        new_password: payload.newPassword,
        confirm_password: payload.confirmPassword,
      }
    );
    return data;
  }
}
