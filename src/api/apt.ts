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
  aiPriceChangePercent: number;
  monthComparisonPercent: number;
}

interface AptsResponse {
  aptInfos: AptData[];
}

interface AptResponse {
  aptInfo: AptData;
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

// 단일 거래 정보 인터페이스
interface TradeDetail {
  date: string; // 거래 날짜
  size: number; // 면적
  price: number; // 가격
  floor: string; // 층수
}

// 평균 가격 정보 인터페이스
interface GraphData {
  yearMonth: string; // 연월 정보 (예: "21.12")
  averagePrice: number; // 평균 가격
  isMaxMinPrice: string; // "최고" 또는 "최소" (선택적 필드)
  tradeCount: number;
}

// 아파트 상세 정보 인터페이스
interface ApartmentDetail {
  aptId: string; // 아파트 ID
  aptName: string; // 아파트 이름
  aptAddress: string; // 아파트 주소
  sizes: number[]; // 면적 배열
  threeYearAveragePrice: number; // 3년 평균 가격
  oneMonthAveragePrice: number; // 실거래 기준 1개월 평균 가격
  graphData: GraphData[]; // 연월별 평균 가격 데이터
  pyungGraphData: GraphData[]; // 연월별 평균 평당 가격 데이터
  tradeDetails: TradeDetail[]; // 거래 내역 데이터
  aiPredictedPrice: number; // AI 예측 가격
  aiPriceChangePercent: number; // AI 예측 가격 변동률
  monthComparisonPrice: number; // 1개월 전 가격
  monthComparisonPercent: number; // 1개월 전 가격 변동률
  lat: number;
  lng: number;
}

// API 요청 함수
export const getApts = async (bounds: Bound): Promise<AptData[]> => {
  try {
    const response = await axiosInstance.get<AptsResponse>("/apt/bound", {
      params: {
        bottomLat: bounds.sw.lat,
        leftLng: bounds.sw.lng,
        topLat: bounds.ne.lat,
        rightLng: bounds.ne.lng,
      },
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
    return response.data.cityAvgs;
  } catch (error: any) {
    console.error("Failed to fetch dong averages:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch dong averages");
  }
};

export const getAptInfosByName = async (aptName: string): Promise<AptData[]> => {
  try {
    const response = await axiosInstance.get<AptsResponse>("/apt/name", {
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

export const getAptFocusById = async (aptId: string): Promise<AptData> => {
  try {
    const response = await axiosInstance.get<AptResponse>("/apt/focus", {
      params: {
        aptId,
      },
    });
    return response.data.aptInfo;
  } catch (error: any) {
    console.error("Failed to fetch focused apartment:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch focused apartment");
  }
};

export const getAptDetailById = async (aptId: string) => {
  try {
    const response = await axiosInstance.get<ApartmentDetail>("/apt/detail", {
      params: {
        aptId,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch focused apartment:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch focused apartment");
  }
};
