import axios from "axios";

console.log(
  "NEXT_PUBLIC_BACKEND_URL:",
  process.env.NEXT_PUBLIC_BACKEND_URL
);


export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});
