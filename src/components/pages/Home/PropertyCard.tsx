import {
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineApartment } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { FaArrowDown, FaFire } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type PropertyCardProps = {
  aptId: string;
  aptName: string;
  buildYear: number;
  recentMonth: string;
  recentPrice: number;
  previousMonth: string;
  previousPrice: number;
  jibun: string;
  roadName: string;
  sidoName: string;
  gugunName: string;
  dongName: string;
  percentChange: number; // 전달 대비 이번 달 상승 비율
};

export default function PropertyCard({
  aptId,
  aptName,
  buildYear,
  recentMonth,
  recentPrice,
  previousMonth,
  previousPrice,
  jibun,
  roadName,
  sidoName,
  gugunName,
  dongName,
  percentChange,
}: PropertyCardProps) {
  const cardBox = useColorModeValue("white", "gray.700");
  const cardTagContent = useColorModeValue("#F7FAFC", "gray.500");

  const toast = useToast();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);

  const handleBookmarkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user || !token) {
      toast({
        title: "로그인이 필요합니다.",
        description: "즐겨찾기를 추가하려면 로그인해주세요.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    }
  };

  return (
    <Box
      borderRadius="24px"
      bg={cardBox}
      boxShadow="md"
      maxWidth={"416"}
      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
      transition="all 0.3s ease"
      position={"relative"}
    >
      <Box overflow={"hidden"} borderTopLeftRadius={"24"} borderTopRightRadius={"24"} maxH={"234"}>
        <Image src={`/images/${aptId}.png.jpeg`} alt={roadName} objectFit={"cover"} />
        {/* 상승률과 불 아이콘 */}
        <HStack
          position="absolute"
          top="12px"
          left="12px"
          bg="white"
          borderRadius="full"
          px="2"
          py="1"
          boxShadow="sm"
          align="center"
        >
          <Text fontSize="sm" fontWeight="bold" color={"#FF4500"}>
            +${percentChange.toFixed(1)}%
          </Text>
          <FaFire size={16} color="#FF4500" />
        </HStack>
      </Box>
      <Stack spacing={2} p={5} h={"303"}>
        <HStack justifyContent={"space-between"}>
          <HStack spacing={2}>
            <MdOutlineApartment fill="#1F1F1F" size={24} />
            <Box w={"62px"} bg={cardTagContent} textAlign={"center"} borderRadius={24}>
              <Text lineHeight={8} fontSize="sm">
                아파트
              </Text>
            </Box>
            <Box w={"62px"} bg={cardTagContent} textAlign={"center"} borderRadius={24}>
              <Text lineHeight={8} fontSize="sm">
                매매
              </Text>
            </Box>
            <Box w={"62px"} bg={cardTagContent} textAlign={"center"} borderRadius={24}>
              <Text lineHeight={8} fontSize="sm">
                {recentMonth.split("-")[0]}년
              </Text>
            </Box>
            <Box w={"62px"} bg={cardTagContent} textAlign={"center"} borderRadius={24}>
              <Text lineHeight={8} fontSize="sm">
                {recentMonth.split("-")[1]}월
              </Text>
            </Box>
          </HStack>
          <FiBookmark size={24} cursor={"pointer"} onClick={handleBookmarkClick} />
        </HStack>
        <VStack justifyContent={"space-between"} align={"start"} h={"100%"}>
          <VStack align={"start"} mt={3}>
            <Text fontSize={"26px"} lineHeight={9}>
              {aptName}
            </Text>
            <Text fontWeight="bold" fontSize={"17px"} lineHeight={9}>
              평당 가격 {recentPrice.toFixed(0)}만
            </Text>
            <Text fontWeight={"thin"} fontSize="sm" lineHeight={9}>
              {buildYear}년 준공
            </Text>
          </VStack>
          <Text color="#666666" fontSize="xs">
            {sidoName} {gugunName}
            <br /> {dongName} {roadName}
          </Text>
        </VStack>
      </Stack>
      <VStack
        pos={"absolute"}
        bottom={"20px"}
        right={"20px"}
        w={"180px"}
        h={"auto"}
        bg={useColorModeValue("gray.100", "gray.800")}
        borderRadius={"16px"}
        boxShadow={"md"}
        p={4}
        spacing={3}
        align="stretch"
      >
        {/* 이전 달 정보 */}
        <VStack align="start" spacing={1}>
          <Text fontSize="xs" color="gray.500">
            {previousMonth}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {previousPrice.toFixed(1)}만 원
          </Text>
        </VStack>

        {/* 변화량 표시 */}
        <HStack spacing={3} justifyContent="center">
          {percentChange > 0 ? (
            <FaFire size={18} color="#FF4500" />
          ) : (
            <FaArrowDown size={18} color="#007BFF" />
          )}
          <Text fontSize="lg" fontWeight="bold" color={percentChange > 0 ? "red.500" : "blue.500"}>
            {percentChange > 0 ? `+${percentChange.toFixed(1)}%` : `${percentChange.toFixed(1)}%`}
          </Text>
        </HStack>

        {/* 최근 달 정보 */}
        <VStack align="start" spacing={1}>
          <Text fontSize="xs" color="gray.500">
            {recentMonth}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {recentPrice.toFixed(1)}만 원
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
