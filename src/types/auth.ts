export interface User {
  id: string;
  username: string;
  email?: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  email: string;
  confirmPassword: string;
}
