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
      // id: string;
      email: string;
      nickname: string;
    };
  };
  error?: string;
}
