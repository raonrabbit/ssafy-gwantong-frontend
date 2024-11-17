export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface LoginApiResponse {
  success: boolean;
  data?: {
    token: string; // JWT 토큰
    user?: {
      email: string;
      nickname: string;
      avatarUrl: string;
    };
  };
  error?: string;
}
