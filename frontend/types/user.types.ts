export type UserRole = "user" | "recruiter" | "admin";


export interface User {
    id: string;
    email: string;
    role: UserRole;
    name: string;
  }