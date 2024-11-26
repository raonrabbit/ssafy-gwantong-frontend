import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  HStack,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Flex,
  Grid,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { MdArrowBack, MdArrowDropDown } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import TradeChart from "./TradeChart";
import TradeList from "./TradeList";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAptDetailById } from "../../../api/apt";
import PyeongChart from "./PyeongChart";

interface MapResultProps {
  apartmentId: string;
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

const formatPriceToKorean = (price: number): string => {
  const billion = Math.floor(price / 10000);
  const thousand = Math.round(price % 10000);
  if (billion === 0) return `${thousand}만`;
  if (thousand === 0) return `${billion}억`;
  return `${billion}억 ${thousand}`;
};

export default function MapResult({ apartmentId }: MapResultProps) {
  const {
    data: apartment,
    isError,
    isLoading: isApartmentLoading,
    isFetching,
  } = useQuery<ApartmentDetail>({
    queryKey: ["apartmentDetail", apartmentId],
    queryFn: () => getAptDetailById(apartmentId),
    retry: 1,
    enabled: !!apartmentId,
  });
  const [searchValue, setSearchValue] = useState(apartment?.aptName || "");
  const [selectedSize, setSelectedSize] = useState<number | null>(null); // 선택한 평수 상태 추가
  const [isFixed, setIsFixed] = useState(false); // Fixed 상태 추가
  const sectionRef = useRef<HTMLDivElement>(null); // 관찰 대상 ref
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 ref
  const roadviewRef = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  // 다크모드 관련 색상 정의
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.900", "gray.200");
  const accentColor = useColorModeValue("#F37021", "#FF9C60");
  const subTextColor = useColorModeValue("#533B0C", "#888888");
  const menuBgColor = useColorModeValue("#FFFFFF", "gray.700");
  const borderColor = useColorModeValue("#FF9C60", "#4A5568");
  const tradeColor = useColorModeValue("white", "gray.800");
  const tradeTextColor = useColorModeValue("#1F1F1F", "#FAFAFA");
  const searchButtonColor = useColorModeValue("#FFFFFF", "gray.700");

  const apartmentDetailColor1 = useColorModeValue("gray.200", "gray.600");

  // 매매가 기준, 평당 기준 토글
  const [activeChart, setActiveChart] = useState<"trade" | "pyeong">("trade");
  const activeTabColor = "3px solid #F37021";
  const inactiveTabColor = "1px solid #cccccc";

  const handleSizeSelect = (size: number | null) => {
    setSelectedSize(size);
  };

  // 평수별 필터링된 거래 내역
  const filteredTradeDetails = apartment?.tradeDetails.filter((trade) =>
    selectedSize ? trade.size === selectedSize : true
  );

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleSearch = () => {
    if (searchValue)
      if (searchValue.trim() !== "") {
        navigate(`/map/search?query=${encodeURIComponent(searchValue)}`);
      }
  };

  const handleBackButton = () => {
    if (apartment?.aptName) navigate(`/map/search?query=${encodeURIComponent(apartment.aptName)}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && scrollContainerRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
        setIsFixed(top - containerTop <= 88 + 60); // 88px 헤더 높이와 비교
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // 초기 상태 설정
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Navigate to notfound if necessary
  useEffect(() => {
    if (!isLoading && (isError || !apartment)) {
      navigate("/notfound", { replace: true });
    }
  }, [isLoading, isError, apartment, navigate]);

  // Kakao Maps 로드뷰 설정
  useEffect(() => {
    if (!apartment || !roadviewRef.current) return;
    setSearchValue(apartment.aptName);
    const roadview = new window.kakao.maps.Roadview(roadviewRef.current);
    const roadviewClient = new window.kakao.maps.RoadviewClient();

    const lat = apartment.lat;
    const lng = apartment.lng;
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    setTimeout(
      () =>
        roadviewClient.getNearestPanoId(markerPosition, 500, (panoId) => {
          if (panoId) {
            roadview.setPanoId(panoId, markerPosition);

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(roadview);
          } else {
            console.warn("로드뷰 데이터를 찾을 수 없습니다.");
          }
        }),
      500
    );
  }, [apartment]); // apartment가 변경될 때만 로드뷰 로직 실행

  // 평수 계산 및 그룹화
  const groupedSizes = Array.from(new Set(apartment?.tradeDetails.map((trade) => trade.size))).sort(
    (a, b) => a - b
  ); // 중복 제거 및 정렬

  if (!apartment) return null; // navigate 후 렌더링 방지

  return (
    <Box
      ref={scrollContainerRef}
      position={"absolute"}
      left={"0"}
      top={"0"}
      minW={"358px"}
      height={"calc(100vh - 88px)"}
      bg={bgColor}
      zIndex={1}
      overflow={"auto"}
      className="no-scrollbar"
    >
      {/* 검색 Input */}
      <InputGroup p={"10px"}>
        <Input
          placeholder="아파트, 지역 검색"
          borderRadius={24}
          borderColor={accentColor}
          bg={menuBgColor}
          color={textColor}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          focusBorderColor={accentColor}
          _focus={{
            borderWidth: "1px",
            // borderColor: "#FF9C60",
            boxShadow: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // 엔터 키를 누르면 handleSearch 호출
            }
          }}
        />
        <InputRightAddon
          bg={accentColor}
          borderTopEndRadius={24}
          borderBottomEndRadius={24}
          borderColor={accentColor}
          px={3}
          onClick={handleSearch}
          cursor={"pointer"}
        >
          <FaSearch size={16} color={searchButtonColor} />
        </InputRightAddon>
      </InputGroup>

      {/* 헤더 섹션 */}
      {/* <Box
        ref={sectionRef}
        position={isFixed ? "fixed" : "relative"} // Fixed 상태
        top={isFixed ? "88px" : "0"} // 헤더 높이
        left="0"
        w="358px"
        zIndex={999}
        bg={accentColor}
        boxShadow={isFixed ? "md" : "none"} // 스크롤 시 그림자 추가
        transition="box-shadow 0.3s ease"
      > */}
      {/* 아파트 상세 정보 */}
      <HStack h={"52px"} bg={accentColor} justifyContent={"space-between"}>
        <HStack w={"52px"} justifyContent={"center"} onClick={handleBackButton} cursor={"pointer"}>
          <MdArrowBack size={24} color="white" />
        </HStack>
        <Box>
          <Text fontSize={"18px"} lineHeight={"32px"} color={"white"}>
            {apartment.aptName}
          </Text>
        </Box>
        <HStack w={"52px"} justifyContent={"center"}></HStack>
      </HStack>

      <HStack justifyContent={"center"} bg={accentColor} borderBottom={`1px solid ${borderColor}`}>
        <Text fontSize={"14px"} lineHeight={"27px"} color={subTextColor}>
          {apartment.aptAddress}
        </Text>
      </HStack>

      <HStack h={"40px"} bg={accentColor} gap={0}>
        <Menu>
          <MenuButton
            colorScheme={"customOrange"}
            as={Button}
            rightIcon={<IoIosArrowDown size={24} color="white" />}
            color="white"
            borderRadius={0}
            minW={"119px"}
            borderRight={`1px solid ${borderColor}`}
          >
            매매
          </MenuButton>
          <MenuList minWidth="110px" bg="#F37021" color="white" border="none">
            <MenuItem bg={accentColor} _hover={{ bg: borderColor }}>
              매매
            </MenuItem>
            <MenuItem bg={accentColor} _hover={{ bg: borderColor }}>
              전/월세
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            colorScheme={"customOrange"}
            as={Button}
            rightIcon={<IoIosArrowDown size={24} color="white" />}
            bg={accentColor}
            color="white"
            borderRadius={0}
            minW={"119px"}
            borderRight={`1px solid ${borderColor}`}
          >
            {selectedSize
              ? `${selectedSize}평`
              : groupedSizes.length > 0
              ? `${groupedSizes[0]}평`
              : "평수 선택"}
          </MenuButton>
          <MenuList minWidth="110px" bg={menuBgColor} color="white" border="none">
            {groupedSizes.map((size) => (
              <MenuItem
                key={size}
                bg={accentColor}
                _hover={{ bg: borderColor }}
                onClick={() => handleSizeSelect(size)}
              >
                {size}평
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <HStack minW={"119px"} justifyContent={"center"}>
          <FaRegHeart size={24} color="white" cursor={"pointer"} />
        </HStack>
      </HStack>
      {/* </Box> */}

      {/* 토글 */}
      <VStack py={5} mt={"5px"} bg={tradeColor} gap={0}>
        <HStack px={5} justifyContent={"space-between"} w={"100%"}>
          <Flex
            as="button"
            onClick={handleToggle}
            borderRadius="full"
            bg={apartmentDetailColor1}
            alignItems="center"
            justifyContent="space-between"
            w="100px"
            cursor="pointer"
            h={"25px"}
            paddingX={"1px"}
          >
            <Box
              w="50%"
              textAlign="center"
              borderRadius="full"
              bg={isOn ? "#FF9C60" : "transparent"}
              color={isOn ? "white" : "black"}
            >
              <Text fontSize="12px" lineHeight={"21px"}>
                매매
              </Text>
            </Box>
            <Box
              w="50%"
              textAlign="center"
              borderRadius="full"
              bg={!isOn ? "#FF9C60" : "transparent"}
              color={!isOn ? "white" : "black"}
            >
              <Text fontSize="12px" lineHeight={"21px"}>
                전월세
              </Text>
            </Box>
          </Flex>
          <Menu>
            <MenuButton
              border={"1px solid #FF9C60"}
              bg={tradeColor}
              color={"#FF9C60"}
              as={Button}
              rightIcon={<MdArrowDropDown size={17} />}
              _hover={{ bg: "white", color: "#FF9C60" }}
              fontSize={"12px"}
              h={"25px"}
              maxW={"45px"}
              paddingLeft={1}
              paddingRight={0}
            >
              {selectedSize
                ? `${selectedSize}평`
                : groupedSizes.length > 0
                ? `${groupedSizes[0]}평`
                : "평수 선택"}
            </MenuButton>
            <MenuList minW={"45px"} fontSize={"12px"}>
              {groupedSizes.map((size) => (
                <MenuItem key={size} onClick={() => handleSizeSelect(size)}>
                  {size}평
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </VStack>
      {/* 로드뷰 표시 */}
      <Box
        ref={roadviewRef}
        style={{
          width: "100%",
          height: "300px",
        }}
      ></Box>

      {/* 거래 내역 */}
      <VStack py={5} mt={"5px"} bg={tradeColor} gap={0}>
        <HStack justifyContent={"space-between"} minW={"358px"} px={5} mt={4}>
          <VStack justifyContent={"space-between"} align={"start"}>
            <Text color={"#FF9C60"} fontSize={"15px"} lineHeight={"17px"}>
              최근 실거래 기준 1개월 평균
            </Text>
            <Text color={"#F37021"} fontSize={"18px"} fontWeight={"bold"} lineHeight={"25px"}>
              {formatPriceToKorean(apartment.oneMonthAveragePrice)}
            </Text>
          </VStack>
          <VStack justifyContent={"space-between"} lineHeight={"17px"} align={"end"}>
            <Text color={tradeTextColor} fontSize={"12px"}>
              매물 가격 평균
            </Text>
            <Text color={tradeTextColor} fontSize={"16px"} fontWeight={"bold"} lineHeight={"25px"}>
              {formatPriceToKorean(apartment.threeYearAveragePrice)}
            </Text>
          </VStack>
        </HStack>
        <Grid mt={4} templateColumns={"repeat(2, 1fr)"} minW={"358px"}>
          <Box
            textAlign={"center"}
            borderBottom={activeChart === "trade" ? activeTabColor : inactiveTabColor}
            cursor={"pointer"}
            onClick={() => setActiveChart("trade")}
          >
            <Text lineHeight={"46px"}>매매가 기준</Text>
          </Box>
          <Box
            textAlign={"center"}
            borderBottom={activeChart === "pyeong" ? activeTabColor : inactiveTabColor}
            cursor={"pointer"}
            onClick={() => setActiveChart("pyeong")}
          >
            <Text lineHeight={"46px"}>평당 기준</Text>
          </Box>
        </Grid>
        {activeChart === "trade" && <TradeChart graphData={apartment.graphData} />}
        {activeChart === "pyeong" && <PyeongChart graphData={apartment.pyungGraphData} />}
        <TradeList tradeDetails={filteredTradeDetails || []} />
      </VStack>
    </Box>
  );
}
