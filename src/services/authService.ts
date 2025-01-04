import axios from "axios";

const isDevelopment = true; // You can toggle this manually for now
const API_URL = "http://localhost:3000/api"; // Default API URL

interface LoginCredentials {
  username: string;
  password: string;
}

interface SignUpData extends LoginCredentials {
  email: string;
}

interface ResetPasswordData {
  email: string;
  phone: string;
  otp: string;
  newPassword: string;
}

// For development/testing
const mockAuthResponse = {
  token: "mock-token",
  user: {
    username: "testuser",
    email: "test@example.com",
  },
};

class AuthService {
  private async request<T>(endpoint: string, options: any): Promise<T> {
    if (isDevelopment) {
      // Mock response for development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockAuthResponse as T);
        }, 1000);
      });
    }

    try {
      const response = await axios({
        url: `${API_URL}${endpoint}`,
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

  async login(credentials: LoginCredentials) {
    return this.request("/auth/login", {
      method: "POST",
      data: credentials,
    });
  }

  async signup(data: SignUpData) {
    return this.request("/auth/signup", {
      method: "POST",
      data,
    });
  }

  async resetPassword(data: ResetPasswordData) {
    return this.request("/auth/reset-password", {
      method: "POST",
      data,
    });
  }

  async validateToken(token: string) {
    return this.request("/auth/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const authService = new AuthService();
