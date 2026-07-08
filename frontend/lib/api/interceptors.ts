import { apiClient } from "./apiClient";
import { useAuthStore } from "@/store/authStore";


export function setupInterceptors() {

  apiClient.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
}