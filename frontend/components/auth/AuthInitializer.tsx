"use client";

import { useEffect } from "react";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

interface AuthInitializerProps {
  children: React.ReactNode;
}

import { setupInterceptors } from "@/lib/api/interceptors";

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { setAccessToken, setUser, clearAuth, setLoading, isLoading } =
    useAuthStore();

  useEffect(() => {
    setupInterceptors();
    let mounted = true;

    async function bootstrap() {
      try {
        const { accessToken } = await AuthService.refreshSession();

        if (!mounted) return;

        setAccessToken(accessToken);

        const user = await AuthService.getCurrentUser();

        if (!mounted) return;

        setUser(user);
      } catch (error) {
        console.error("Failed to initialize authentication:", error);

        if (!mounted) return;

        clearAuth();
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [setAccessToken, setUser, clearAuth, setLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
