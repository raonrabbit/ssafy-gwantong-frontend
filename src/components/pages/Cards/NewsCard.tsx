import React from "react";
import { Box, VStack, Text, Link } from "@chakra-ui/react";

type NewsCardProps = {
  title: string;
  description: string;
  date: string;
  originallink: string;
};

const NewsCard: React.FC<NewsCardProps> = ({ title, description, date, originallink }) => {
  return (
    <Link href={originallink} isExternal _hover={{ textDecoration: "none" }}>
      <Box
        bg="white"
        p="10px"
        borderRadius="16px"
        width={"500px"}
        height={"280px"}
        boxShadow="lg"
        _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
        transition="all 0.3s ease"
        overflow="hidden"
      >
        {/* 제목 영역 */}
        <Box
          //bg="gray.300"
          color="black"
          fontWeight="bold"
          fontSize="22px"
          p={3}
          letterSpacing="wide"
        >
          {title}
        </Box>

        {/* 본문 영역 */}
        <VStack align="start" justifyContent="space-between" p={4} spacing={4}>
          {/* 설명 */}
          <Box>
            <Text fontSize="20px" color="gray.700" noOfLines={3}>
              {description}
            </Text>
          </Box>

          {/* 날짜 */}
          <Box alignSelf="flex-end">
            <Text fontSize="14px" color="gray.500">
              {date}
            </Text>
          </Box>
        </VStack>
      </Box>
    </Link>
  );
};

export default NewsCard;
