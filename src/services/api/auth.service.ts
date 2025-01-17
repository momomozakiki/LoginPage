import axios from "axios";
import { Auth } from "../../types/auth";

export class AuthService {
  private static instance: AuthService;
  private API_URL = "http://localhost:3000/api";
  private isDevelopment = true;

  private mockAuthResponse: Auth.Response = {
    token: "mock-token",
    user: {
      id: "1",
      username: "testuser",
      email: "test@example.com",
    },
  };

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async request<T>(endpoint: string, options: any): Promise<T> {
    if (this.isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.mockAuthResponse as T);
        }, 1000);
      });
    }

    try {
      const response = await axios({
        url: `${this.API_URL}${endpoint}`,
        ...options,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred");
      }
      throw error;
    }
  }

  async login(credentials: Auth.Credentials): Promise<Auth.Response> {
    return this.request("/auth/login", {
      method: "POST",
      data: credentials,
    });
  }

  async validateToken(token: string): Promise<Auth.Response> {
    return this.request("/auth/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const authService = AuthService.getInstance();
