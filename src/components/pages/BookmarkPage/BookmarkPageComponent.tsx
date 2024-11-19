import { Box, Button, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ApartmentBookmark from "./ApartmentBookmark";
import DealBookmark from "./DealBookmark";

export default function BookmarkPageComponent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const handleScrollToPage = (pageIndex: number) => {
    setActivePage(pageIndex);
    const pageWidth = scrollContainerRef.current?.offsetWidth || 0;
    scrollContainerRef.current?.scrollTo({ left: pageIndex * pageWidth, behavior: "smooth" });
  };

  return (
    <Box py="40px" display="flex" justifyContent="center" minH="100vh">
      <VStack width="1100px">
        {/* 메뉴 버튼 */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="60px"
          width="100%"
        >
          <Box display="flex" alignItems="center">
            <Image
              src="/images/heart.webp"
              width="32px"
              height="32px"
              m="16px"
              mr="12px"
              style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))" }}
            />
            <Text fontSize="24px" fontWeight="bold">
              관심 페이지
            </Text>
          </Box>
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            bg="black"
            width="180px"
            height="40px"
            borderRadius="24px"
            style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))" }}
          >
            {/* 슬라이드 배경 */}
            <Box
              position="absolute"
              top="0"
              left={activePage === 0 ? "0%" : "50%"}
              width="50%"
              height="100%"
              bg={useColorModeValue("customOrange.500", "customOrange.700")}
              borderRadius="24px"
              transition="left 0.3s ease-in-out"
            />
            {/* 버튼 */}
            {["아파트", "매물"].map((label, index) => (
              <Button
                key={label}
                onClick={() => handleScrollToPage(index)}
                bg="transparent"
                zIndex="1"
                variant={activePage === index ? "solid" : "ghost"}
                width="50%"
                _hover={{ bg: "none" }}
                color={activePage === index ? "black" : "white"}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* 스크롤 컨테이너 */}
        <Box
          ref={scrollContainerRef}
          width="100%"
          overflow="hidden"
          display="flex"
          scrollSnapType="x mandatory"
        >
          {activePage === 0 && (
            <Box
              flex="0 0 100%"
              scrollSnapAlign="center"
              height="100%"
              display="flex"
              justifyContent="center"
            >
              <ApartmentBookmark />
            </Box>
          )}
          {activePage === 1 && (
            <Box
              flex="0 0 100%"
              scrollSnapAlign="center"
              height="100%"
              display="flex"
              justifyContent="center"
            >
              <DealBookmark />
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
