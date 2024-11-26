import React, { useEffect, useState } from "react";
import { Box, Grid, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import NewsCard from "../Cards/NewsCard";
import NewsTitleCard from "../Cards/NewsTitleCard";
import { localAxios } from "../../../api/http-commons";

// 뉴스 데이터 타입 정의
type NewsData = {
  title: string;
  originallink: string;
  description: string;
  pubDate: string;
};

// HTML 태그 제거 및 HTML 엔티티 디코딩 함수
const cleanHtml = (text: string) => {
  if (!text) return "";

  // HTML 태그 제거
  const noHtml = text.replace(/<[^>]*>/g, "");

  // HTML 엔티티 디코딩
  const parser = new DOMParser();
  const decodedText = parser.parseFromString(noHtml, "text/html").body.textContent || "";

  return decodedText;
};

type NewsItem = {
  title: string;
  originallink: string;
  description: string;
  pubDate: string;
};

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsData[]>([]);
  const myAxios = localAxios();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await myAxios.get("/news");
        const data = response.data as { news: NewsItem[] }; // 강제 타입 지정
        const items = Array.isArray(data.news)
          ? data.news.map((item) => ({
              title: cleanHtml(item?.title || "제목 없음"),
              originallink: item?.originallink || "#",
              description: cleanHtml(item?.description || "설명이 없습니다."),
              pubDate: item?.pubDate ? new Date(item.pubDate).toLocaleDateString() : "날짜 없음",
            }))
          : [];
        setNews(items);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  return (
    <VStack maxWidth="1712px" gap={10} mt={12} align="stretch" marginX="auto">
      {/* 헤더 */}
      <HStack alignItems="center">
        <Image height="78px" src="/images/News.webp" />
        <Heading as="h1" size="lg">
          오늘의 뉴스
        </Heading>
      </HStack>

      {/* 좌측 카드와 우측 리스트 */}
      <Box display="flex" justifyContent={"space-between"}>
        {/* 좌측: 2x2 카드 */}
        <Grid templateColumns="1fr 1fr" gap={4}>
          {news.slice(0, 4).map((newsItem, index) => (
            <NewsCard
              key={index}
              title={newsItem.title}
              description={newsItem.description}
              date={newsItem.pubDate}
              originallink={newsItem.originallink}
            />
          ))}
        </Grid>

        <Box width="2.5px" bg="gray.300"></Box>

        {/* 우측: 제목 리스트 */}
        <VStack align="stretch" spacing={3} justifyContent="space-between">
          {news.slice(4, 10).map((newsItem, index) => (
            <NewsTitleCard
              key={index}
              title={newsItem.title}
              originallink={newsItem.originallink}
            />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default NewsList;
