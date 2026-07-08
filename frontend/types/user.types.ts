export type UserRole = "user" | "recruiter";


export interface User {
    id: string;
    email: string;
    role: UserRole;
    name: string;
  }