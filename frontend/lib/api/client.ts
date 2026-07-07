import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const TEMP_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwidXNlcl9pZCI6Mywicm9sZSI6InJlY3J1aXRlciIsImVtYWlsIjoicmVjcnV0MUBleGFtcGxlLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3ODM0MjIxNDAsImV4cCI6MTc4MzQyOTM0MH0.DvHez7gRdZQQSth3qx055MjWVwoUKP3_hVQzQRYH82M";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${TEMP_ACCESS_TOKEN}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message ??
      "Something went wrong while talking to the server.";

    return Promise.reject(new Error(message));
  }
);