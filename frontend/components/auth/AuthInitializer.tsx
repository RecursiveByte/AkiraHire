"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { AuthService } from "@/services/common/auth.service";
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

        if (!mounted) return;

        clearAuth();

        const isNetworkError =
          error instanceof Error &&
          error.message.includes("Unable to reach the server");

        if (isNetworkError) {
          toast.error("Unable to reach the server. Please try again later.");
        }
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
