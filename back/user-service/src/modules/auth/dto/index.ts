import { UserRole } from "src/enum/role.enum";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  member_id: string;
  role: UserRole;
}