export type UserRole = "candidate" | "recruiter" | "admin";


export interface User {
    id: string;
    email: string;
    role: UserRole;
    name: string;
  }