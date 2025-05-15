// Request Models
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface SignUpRequest {
  userName: string;
  password: string;
  userImageLink?: string;
}

export interface RegisterAdminRequest {
  username: string;
  password: string;
  userImageLink?: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// Response Models
export interface LoginResponse {
  token: string;
  userId: number;
  userName?: string;
  userImageLink?: string;
  userRoleinAuthorization: number;
}

export interface SignUpResponse {
  userId: number;
  userName?: string;
  userRole?: string;
  message?: string;
}

export enum UserRole {
  Admin = 0,
  User = 1,
  Moderator = 2
} 