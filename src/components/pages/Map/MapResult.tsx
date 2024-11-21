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
} from "@chakra-ui/react";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { MdArrowBack, MdArrowDropDown } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import TradeChart from "./TradeChart";
import TradeList from "./TradeList";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface MapResultProps {
  apartmentId: string;
}

const apartmentDetails: Record<
  string,
  { name: string; details: string; address: string; lat: number; lng: number }
> = {
  "1": {
    name: "청담자이",
    details: "708세대 2011년 10월 입주",
    address: "서울특별시 강남구 청담동 134-38",
    lat: 37.5236021633556,
    lng: 127.057196117679,
  },
  "2": {
    name: "청담힐",
    details: "30세대 1997년 4월 입주",
    address: "서울특별시 강남구 청담동 134-38",
    lat: 37.5273578454093,
    lng: 127.048456229401,
  },
  "3": {
    name: "청담르엘",
    details: "1,261세대 2025년 11월 입주",
    address: "서울특별시 강남구 청담동 134-38",
    lat: 37.5273578454093,
    lng: 127.048456229401,
  },
};

export default function MapResult({ apartmentId }: MapResultProps) {
  const apartment = apartmentDetails[apartmentId];
  const roadviewRef = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    if (!apartment) {
      navigate("/notfound", { replace: true }); // 무한 루프 방지
      return;
    }
    if (!roadviewRef.current) {
      setIsLoading(false); // 컨테이너가 없을 경우 로딩 종료
      return;
    }

    const roadview = new window.kakao.maps.Roadview(roadviewRef.current);
    const roadviewClient = new window.kakao.maps.RoadviewClient();
    const markerPosition = new window.kakao.maps.LatLng(apartment.lat, apartment.lng);
    setTimeout(() => {
      // 로드뷰 설정 및 마커 추가
      roadviewClient.getNearestPanoId(markerPosition, 500, (panoId) => {
        if (panoId) {
          roadview.setPanoId(panoId, markerPosition);

          // 마커 추가
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(roadview); // 마커를 로드뷰에 추가
        } else {
          console.warn("로드뷰 데이터를 찾을 수 없습니다.");
        }
      });
    }, 1000);

    setIsLoading(false); // 로드뷰 로딩 완료 후 로딩 상태 종료
  }, [apartment, navigate]);

  if (!apartment) return null; // navigate 후 렌더링 방지

  return (
    <Box
      position={"absolute"}
      left={"0"}
      top={"0"}
      minW={"358px"}
      height={"calc(100vh - 88px)"}
      bg={"gray.100"}
      zIndex={1}
      overflow={"auto"}
      className="no-scrollbar"
    >
      {/* 검색 Input */}
      <InputGroup p={"10px"}>
        <Input
          placeholder="아파트, 지역 검색"
          borderRadius={24}
          borderColor={"#F37021"}
          bg={"white"}
          value={apartment.name}
          readOnly
        />
        <InputRightAddon
          bg={"#F37021"}
          borderTopEndRadius={24}
          borderBottomEndRadius={24}
          borderColor={"#F37021"}
          px={3}
        >
          <FaSearch size={16} color="#FFFFFF" />
        </InputRightAddon>
      </InputGroup>

      {/* 아파트 상세 정보 */}
      <HStack h={"52px"} bg={"#F37021"} justifyContent={"space-between"}>
        <HStack w={"52px"} justifyContent={"center"}>
          <MdArrowBack size={24} color="white" />
        </HStack>
        <Box>
          <Text fontSize={"18px"} lineHeight={"32px"} color={"white"}>
            {apartment.name}
          </Text>
        </Box>
        <HStack w={"52px"} justifyContent={"center"}></HStack>
      </HStack>

      <HStack justifyContent={"center"} bg={"#F37021"} borderBottom={"1px solid #FF9C60"}>
        <Text fontSize={"14px"} lineHeight={"27px"} color={"#533B0C"}>
          {apartment.address}
        </Text>
      </HStack>

      <HStack h={"40px"} bg={"#F37021"} gap={0}>
        <Menu>
          <MenuButton
            colorScheme={"customOrange"}
            as={Button}
            rightIcon={<IoIosArrowDown size={24} color="white" />}
            bg="#F37021"
            color="white"
            borderRadius={0}
            minW={"119px"}
            borderRight={"1px solid #FF9C60"}
          >
            매매
          </MenuButton>
          <MenuList minWidth="110px" bg="#F37021" color="white" border="none">
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              매매
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              전/월세
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            colorScheme={"customOrange"}
            as={Button}
            rightIcon={<IoIosArrowDown size={24} color="white" />}
            bg="#F37021"
            color="white"
            borderRadius={0}
            minW={"119px"}
            borderRight={"1px solid #FF9C60"}
          >
            21평
          </MenuButton>
          <MenuList minWidth="110px" bg="#F37021" color="white" border="none">
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              21평
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              35평
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              46평
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              58평
            </MenuItem>
          </MenuList>
        </Menu>
        <HStack minW={"119px"} justifyContent={"center"}>
          <FaRegHeart size={24} color="white" cursor={"pointer"} />
        </HStack>
      </HStack>
      <VStack py={5} mt={"5px"} bg={"white"} gap={0}>
        <HStack px={5} justifyContent={"space-between"} w={"100%"}>
          <Flex
            as="button"
            onClick={handleToggle}
            borderRadius="full"
            bg="gray.200"
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
              bg={"white"}
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
              21평
            </MenuButton>
            <MenuList minW={"45px"} fontSize={"12px"}>
              <MenuItem>21평</MenuItem>
              <MenuItem>35평</MenuItem>
              <MenuItem>46평</MenuItem>
              <MenuItem>58평</MenuItem>
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
      <VStack py={5} mt={"5px"} bg={"white"} gap={0}>
        <HStack justifyContent={"space-between"} minW={"358px"} px={5} mt={4}>
          <VStack justifyContent={"space-between"} align={"start"}>
            <Text color={"#FF9C60"} fontSize={"15px"} lineHeight={"17px"}>
              최근 실거래 기준 1개월 평균
            </Text>
            <Text color={"#F37021"} fontSize={"18px"} fontWeight={"bold"} lineHeight={"25px"}>
              21억 2700
            </Text>
          </VStack>
          <VStack justifyContent={"space-between"} lineHeight={"17px"} align={"end"}>
            <Text color={"#1F1F1F"} fontSize={"12px"}>
              매물 가격 평균
            </Text>
            <Text color={"#1F1F1F"} fontSize={"16px"} fontWeight={"bold"} lineHeight={"25px"}>
              21억 5600
            </Text>
          </VStack>
        </HStack>
        <Grid mt={4} templateColumns={"repeat(3, 1fr)"} minW={"358px"}>
          <Box textAlign={"center"} borderBottom={"3px solid #1F1F1F"} cursor={"pointer"}>
            <Text lineHeight={"46px"}>최근 3년</Text>
          </Box>
          <Box textAlign={"center"} borderBottom={"1px solid #1F1F1F"} cursor={"pointer"}>
            <Text lineHeight={"46px"}>전체 기간</Text>
          </Box>
          <Box textAlign={"center"} borderBottom={"1px solid #1F1F1F"} cursor={"pointer"}>
            <Text lineHeight={"46px"}>매매/전세</Text>
          </Box>
        </Grid>
        <TradeChart />
        <TradeList />
      </VStack>
    </Box>
  );
}
