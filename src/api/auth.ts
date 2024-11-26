import { localAxios } from "./http-commons";

const axiosInstance = localAxios();

export const kakaoLogin = async (code: string) => {
  try {
    const response = await axiosInstance.post("auth/login/kakao", { code });
    return response.data;
  } catch (error: any) {
    console.error("Kakao Login failed:", error.response?.data || error.message);
    throw error.response?.data || "Kakao Login failed";
  }
};

export const googleLogin = async (code: string) => {
  try {
    const response = await axiosInstance.post("auth/login/google", { code });
    return response.data;
  } catch (error: any) {
    console.error("Google Login failed:", error.response?.data || error.message);
    throw error.response?.data || "Google Login failed";
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
