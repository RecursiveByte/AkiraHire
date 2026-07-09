import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await AuthService.logout();

      useAuthStore.getState().clearAuth();

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
}