import { Box, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import { useRef } from "react";
import ApartmentBookmark from "./ApartmentBookmark";
import DealBookmark from "./DealBookmark";

export default function BookmarkPageComponent() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const pageWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: pageIndex * pageWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      style={{ alignItems: "center" }}
      pt="40px"
      pb="60px"
      display="flex"
      justifyContent="center"
    >
      <VStack width="80%">
        {/* 메뉴 버튼 */}
        <Box display="flex" justifyContent="center" marginBottom="16px">
          <Button onClick={() => handleScrollToPage(0)} colorScheme="blue" marginRight="8px">
            아파트
          </Button>
          <Button onClick={() => handleScrollToPage(1)} colorScheme="blue">
            매물
          </Button>
        </Box>

        {/* 스크롤 컨테이너 */}
        <Box
          ref={scrollContainerRef}
          width="100%"
          height="80%" // 콘텐츠 높이 고정
          overflow="hidden" // 다른 페이지가 보이지 않도록 설정
          display="flex"
          scrollSnapType="x mandatory"
          scrollBehavior="smooth"
        >
          {/* 아파트 콘텐츠 */}
          <Box
            flex="0 0 100%"
            scrollSnapAlign="center"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ApartmentBookmark />
          </Box>
          {/* 매물 콘텐츠 */}
          <Box
            flex="0 0 100%"
            scrollSnapAlign="center"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <DealBookmark />
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
