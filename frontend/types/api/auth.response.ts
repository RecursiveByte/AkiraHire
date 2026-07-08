import type { User } from "../user.types";


export interface LoginResponse {
  accessToken: string;
  user: User;
}


export interface RefreshSessionResponse {
  accessToken: string;
  user:User
}
