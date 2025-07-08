export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SendEmailRequest {
  email: string;
}

export interface SendCodeRequest {
  email: string;
  code: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface AuthService {
  sendEmail(request: SendEmailRequest): Promise<AuthResult>;
  sendCode(request: SendCodeRequest): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

export interface AuthContextValue extends AuthState {
  sendEmail: (email: string) => Promise<AuthResult>;
  sendCode: (email: string, code: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}
