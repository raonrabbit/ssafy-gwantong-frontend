import axios from "axios";
import { ApiResponse, LoginApiResponse } from "../types/api";
import { localAxios } from "./http-commons";

const API_BASE_URL = "http://localhost:8080/api/auth";

const axiosInstance = localAxios();

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
