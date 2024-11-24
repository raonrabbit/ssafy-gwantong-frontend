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
  minAmount: number;
  maxAmount: number;
}

interface AptResponse {
  aptInfos: AptData[];
}

export interface CityAvgData {
  city: string;
  lat: number;
  lng: number;
  avg: number;
}

interface CityResponse {
  cityAvgs: CityAvgData[];
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
export const geCityDongAvg = async (bounds: Bound, type: string): Promise<CityAvgData[]> => {
  try {
    const response = await axiosInstance.get<CityResponse>(`/cityavg/${type}`, {
      params: {
        bottomLat: bounds.sw.lat,
        leftLng: bounds.sw.lng,
        topLat: bounds.ne.lat,
        rightLng: bounds.ne.lng,
      },
    });
    console.log(response.data.cityAvgs);
    return response.data.cityAvgs;
  } catch (error: any) {
    console.error("Failed to fetch dong averages:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch dong averages");
  }
};

export const getAptInfosByName = async (aptName: string): Promise<AptData[]> => {
  try {
    const response = await axiosInstance.get<AptResponse>("/apt/name", {
      params: {
        aptName,
      },
    });
    return response.data.aptInfos;
  } catch (error: any) {
    console.error("Failed to fetch apartment information:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch apartment information");
  }
};
