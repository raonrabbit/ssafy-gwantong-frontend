import axios from "axios";
import { ApiResponse, LoginApiResponse } from "../types/api";

const API_BASE_URL = "http://localhost:8080/api/auth";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/v1/"
      : "https://ezip.world/api/v1/",
  withCredentials: true, // 쿠키도 같이 보내겠다는 뜻임. 로그인관련 세션아이디를 가져올수있음.
});

interface userData {
  email: string;
  password: string;
  nickname: string;
}

export const kakaoLogin = async (code: string) => {
  try {
    const response = await axiosInstance.post("auth/login/kakao", { code });
    return response.data;
  } catch (error: any) {
    console.error("Kakao Login failed:", error.response?.data || error.message);
    throw error.response?.data || "Kakao Login failed";
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("auth/logout");
    return response.data;
  } catch (error: any) {
    console.error("Kakao Login failed:", error.response?.data || error.message);
    throw error.response?.data || "Kakao Login failed";
  }
};

// export const login = async (email: string, password: string): Promise<LoginApiResponse> => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/login`,
//       { email, password },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data as LoginApiResponse; // 반환 데이터를 LoginApiResponse로 캐스팅
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.response?.data?.error || "Login failed",
//     };
//   }
// };

export const login = async (email: string, password: string): Promise<LoginApiResponse> => {
  console.log("email : " + email + ", password: " + password);
  const response = {
    success: true,
    data: {
      token: "tokenmotherfucker",
      user: {
        email: email,
        nickname: "이재백",
        profileImage: "https://~~",
      },
    },
  };
  return response;
};

export const register = async (userData: userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "An error occurred during registration.";
  }
};

export const sendVerificationCode = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-code`, { email });
    return response.data as ApiResponse; // 예: { success: true }
  } catch (error: any) {
    throw error.response?.data || "Failed to send verification code.";
  }
};

export const verifyCode = async (email: string, code: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-code`, { email, code });
    return response.data as ApiResponse; // 예: { success: true }
  } catch (error: any) {
    throw error.response?.data || "Failed to verify code.";
  }
};
