import { localAxios } from "./http-commons";

const axiosInstance = localAxios();

interface Bound {
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
}

export interface AptData {
  id: string;
  lat: number;
  lng: number;
  name: string;
  price: { min: number; max: number };
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
    const response = await axiosInstance.get<AptData[]>("/map", {
      params: {
        swLat: bounds.sw.lat,
        swLng: bounds.sw.lng,
        neLat: bounds.ne.lat,
        neLng: bounds.ne.lng,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch apartments:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch apartments");
  }
};

export const getDongAvg = async (bounds: Bound): Promise<DongAvgData[]> => {
  try {
    const response = await axiosInstance.get<DongAvgData[]>("/cityavg/dong", {
      params: {
        swLat: bounds.sw.lat,
        swLng: bounds.sw.lng,
        neLat: bounds.ne.lat,
        neLng: bounds.ne.lng,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch dong averages:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch dong averages");
  }
};

export const getSigunguAvg = async (bounds: Bound): Promise<SigunguAvgData[]> => {
  try {
    const response = await axiosInstance.get<SigunguAvgData[]>("/cityavg/sigungu", {
      params: {
        swLat: bounds.sw.lat,
        swLng: bounds.sw.lng,
        neLat: bounds.ne.lat,
        neLng: bounds.ne.lng,
      },
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
