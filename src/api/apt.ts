import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/v1"
    : "https://ezip.world/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

interface Bound {
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
}

export interface AptData {
  id: string;
  lat: number;
  lng: number;
  name: string;
  minAmount: number;
  maxAmount: number;
}

interface AptResponse {
  aptInfos: AptData[];
}

export interface DongAvgData {
  dong: string;
  lat: number;
  lng: number;
  avgPrice: number;
}

export interface SigunguAvgData {
  sigungu: string;
  lat: number;
  lng: number;
  avgPrice: number;
}

export interface SidoAvgData {
  sido: string;
  lat: number;
  lng: number;
  avgPrice: number;
}

// API 요청 함수
export const getApts = async (bounds: Bound): Promise<AptData[]> => {
  try {
    const response = await axiosInstance.post<AptResponse>("/apt/bound", {
      bottomLat: bounds.sw.lat,
      leftLng: bounds.sw.lng,
      topLat: bounds.ne.lat,
      rightLng: bounds.ne.lng,
    });
    return response.data.aptInfos;
  } catch (error: any) {
    console.error("Failed to fetch apartments:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch apartments");
  }
};

export const getDongAvg = async (bounds: Bound): Promise<DongAvgData[]> => {
  try {
    const response = await axiosInstance.post<DongAvgData[]>("/cityavg/dong", {
      bottomLat: bounds.sw.lat,
      leftLng: bounds.sw.lng,
      topLat: bounds.ne.lat,
      rightLng: bounds.ne.lng,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch dong averages:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch dong averages");
  }
};

export const getSigunguAvg = async (bounds: Bound): Promise<SigunguAvgData[]> => {
  try {
    const response = await axiosInstance.post<SigunguAvgData[]>("/cityavg/sigungu", {
      bottomLat: bounds.sw.lat,
      leftLng: bounds.sw.lng,
      topLat: bounds.ne.lat,
      rightLng: bounds.ne.lng,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch sigungu averages:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch sigungu averages");
  }
};

export const getSidoAvg = async (bounds: Bound): Promise<SidoAvgData[]> => {
  try {
    const response = await axiosInstance.get<SidoAvgData[]>("/cityavg/sido", {
      params: {
        swLat: bounds.sw.lat,
        swLng: bounds.sw.lng,
        neLat: bounds.ne.lat,
        neLng: bounds.ne.lng,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch sido averages:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch sido averages");
  }
};
