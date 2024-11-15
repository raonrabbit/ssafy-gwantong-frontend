import axios from "axios";
import { ApiResponse } from "../types/api";
const API_BASE_URL = "http://localhost:8080/api/auth";

interface userData {
  email: string;
  password: string;
  nickname: string;
}

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
