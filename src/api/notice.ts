import { localAxios } from "./http-commons"; // Adjust the path as necessary

const axiosInstance = localAxios();

interface Notice {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  author: Author;
}

interface NoticesResponse {
  notices: Notice[];
}

interface Author {
  active: boolean;
  admin: boolean;
  createdAt: string;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
  status: string;
  updatedAt: string;
}

export const getRecentNotices = async (): Promise<Notice[]> => {
  try {
    const response = await axiosInstance.get<NoticesResponse>("notice/recent");
    return response.data.notices;
  } catch (error: any) {
    console.error("Failed to fetch recent notices:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch recent notices");
  }
};

export const getNotices = async (page: any): Promise<Notice[]> => {
  try {
    const response = await axiosInstance.get<NoticesResponse>("notice", {
      params: {
        size: 5,
        page: page,
        sort: "id",
      },
    });
    return response.data.notices;
  } catch (error: any) {
    console.error("Failed to fetch notices:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch recent notices");
  }
};

export const getNotice = async (id: number): Promise<Notice & { tags: string[] }> => {
  try {
    const response = await axiosInstance.get<{ notice: Notice }>(`notice/${id}`);
    return {
      ...response.data.notice,
      ...response.data.notice?.author,
      tags: generateRandomTags(),
    };
  } catch (error: any) {
    console.error("Failed to fetch notice details:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to fetch notice details");
  }
};

export const saveNotice = async (title: string, content: string): Promise<void> => {
  try {
    await axiosInstance.post(
      "notice",
      { title, content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error: any) {
    console.error("Failed to save notice:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to save notice");
  }
};

export const updateNotice = async (
  id: number,
  updatedNotice: { title: string; content: string }
): Promise<void> => {
  try {
    await axiosInstance.put(`notice/${id}`, updatedNotice);
  } catch (error: any) {
    console.error("Failed to update notice:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to update notice");
  }
};

export const deleteNotice = async (id: number): Promise<void> => {
  try {
    await localAxios().delete(`notice/${id}`);
  } catch (error: any) {
    console.error("Failed to delete notice:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to delete notice");
  }
};

// 태그를 임의로 생성하는 함수
const generateRandomTags = (): string[] => {
  const possibleTags = [
    "#공지사항",
    "#업데이트",
    "#이벤트",
    "#중요",
    "#알림",
    "#긴급",
    "#새로운 소식",
  ];
  const tagCount = Math.floor(Math.random() * 3) + 1; // 태그 개수: 1~3개
  return Array.from(
    { length: tagCount },
    () => possibleTags[Math.floor(Math.random() * possibleTags.length)]
  );
};
