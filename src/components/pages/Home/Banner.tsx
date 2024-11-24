import {
  Box,
  Image,
  Stack,
  Text,
  VStack,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Banner() {
  const { colorMode } = useColorMode();
  const polygonImageSrc =
    colorMode === "dark" ? "/images/polygon1_dark_mode.svg" : "/images/polygon1.svg";
  const goMapBox = colorMode === "dark" ? "gray.800" : "gray.100";
  const cardBox = colorMode === "dark" ? "gray.700" : "white";
  const subCardBox = colorMode === "dark" ? "gray.600" : "#EEEEEE";
  const serviceContent = useColorModeValue("#1F1F1F", "white");
  const serviceTagContent = useColorModeValue("#2E2E2E", "gray.400");

  return (
    <Stack
      direction={{ md: "row", sm: "column" }}
      maxW={"1712px"}
      marginX={"auto"}
      pt={6}
      mt={{ sm: "40px", md: "0px" }}
      alignItems={{ sm: "center" }}
      justifyContent={"space-between"}
    >
      <Box
        w={{ sm: "600px", md: "1424px" }}
        h={{ md: "808px" }}
        borderRadius={"36px"}
        position={"relative"}
      >
        <Box
          right={0}
          top={0}
          position={"absolute"}
          w={"180px"}
          h={"68px"}
          bg={goMapBox}
          borderBottomLeftRadius={"24px"}
        >
          <Link to={"/map"}>
            <Stack
              flexDirection={"row"}
              justifyContent="center"
              alignItems="center"
              h={"100%"}
              marginY={"auto"}
            >
              <Text fontSize="16px" fontWeight="bold" display="flex" alignItems="center">
                지도 보러 가기
              </Text>
              <FaArrowCircleRight size={24} cursor={"pointer"} />
            </Stack>
          </Link>
        </Box>
        <Box right={"178px"} top={"-2px"} position={"absolute"} w={"38px"} h={"38px"}>
          <Image src={polygonImageSrc}></Image>
        </Box>
        <Box right={"-2px"} top={"66px"} position={"absolute"} w={"38px"} h={"38px"}>
          <Image src={polygonImageSrc}></Image>
        </Box>
        <Image src="/images/banner.png" borderRadius={"36px"}></Image>
      </Box>

      <Stack
        direction={{ sm: "row", md: "column" }}
        w={{ sm: "600px", md: "272px" }}
        h={{ sm: "200px", md: "808px" }}
        justifyContent={"space-between"}
      >
        <Box
          w={{ sm: "200px", md: "272px" }}
          h={{ sm: "200px", md: "272px" }}
          borderRadius={"24px"}
          bg={"#F37021"}
          textAlign={"center"}
          color={"#1F1F1F"}
        >
          <Text fontSize={{ sm: "18px", md: "24px" }} fontWeight={"700"} mt={{ sm: 16, md: 20 }}>
            거래 가능한 부동산 건 수
          </Text>
          <Text fontSize={{ sm: "20px", md: "32px" }} fontWeight={"700"} mt={4}>
            2,100,000 건
          </Text>
        </Box>
        <VStack
          w={{ sm: "200px", md: "272px" }}
          h={{ sm: "200px", md: "272px" }}
          p={"4"}
          borderRadius={"24px"}
          bg={cardBox}
          justifyContent={"space-between"}
        >
          <Box bg={"#1F1F1F"} w={"180px"} borderRadius={"24px"} textAlign={"center"}>
            <Text fontSize={16} color={"white"} lineHeight={"32px"}>
              우리 서비스는?
            </Text>
          </Box>
          <Text fontSize={16} color={serviceContent}>
            가을의 낙엽이 떨어지듯 우리 회사 주식도 배앰.. 한번만 살려주세요
          </Text>
          <Text fontSize={12} color={serviceTagContent}>
            #부동산은 이집어때 #가을 좋아
          </Text>
        </VStack>
        <VStack
          w={{ sm: "200px", md: "272px" }}
          h={{ sm: "200px", md: "272px" }}
          borderRadius={"24px"}
          bg={cardBox}
          p={4}
        >
          <VStack justifyContent={"flex-start"} gap={0}>
            <Image h={"30px"} src="/images/Crown.webp" />
            <Text lineHeight={"16px"} fontSize={16} fontWeight={"bold"}>
              인기지역
            </Text>
          </VStack>
          <VStack w={"100%"} h={"100%"} justifyContent={"space-between"} pt={{ sm: 1, md: 4 }}>
            <Box
              px={4}
              bg={subCardBox}
              w={"100%"}
              textAlign={"center"}
              borderRadius={12}
              boxShadow={"inset 0px 1px 4px rgba(0, 0, 0, 0.25)"}
            >
              <Text fontSize={16} fontWeight={"bold"} lineHeight={{ sm: "28px", md: "48px" }}>
                1. 서울 강남구
              </Text>
            </Box>
            <Box
              px={4}
              bg={subCardBox}
              w={"100%"}
              textAlign={"center"}
              borderRadius={12}
              boxShadow={"inset 0px 1px 4px rgba(0, 0, 0, 0.25)"}
            >
              <Text fontSize={16} fontWeight={"bold"} lineHeight={{ sm: "28px", md: "48px" }}>
                2. 서울 송파구
              </Text>
            </Box>
            <Box
              px={4}
              bg={subCardBox}
              w={"100%"}
              textAlign={"center"}
              borderRadius={12}
              boxShadow={"inset 0px 1px 4px rgba(0, 0, 0, 0.25)"}
            >
              <Text fontSize={16} fontWeight={"bold"} lineHeight={{ sm: "28px", md: "48px" }}>
                3. 서울 서초구
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Stack>
    </Stack>
  );
}
