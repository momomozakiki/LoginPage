export namespace Auth {
  export interface User {
    id: string;
    username: string;
    email?: string;
    role?: 'user' | 'admin';
    createdAt?: Date;
  }

  export interface Credentials {
    username: string;
    password: string;
  }

  export interface SignUpCredentials {
    phoneNumber: string;
    countryCode: string;
    password: string;
  }

  export interface ResetPasswordData {
    countryCode: string;
    phoneNumber: string;
    newPassword: string;
    otp: string;
  }

  export interface Response {
    user: User;
    token: string;
  }
}
