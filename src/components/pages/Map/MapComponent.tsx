import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Map, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { MdMyLocation } from "react-icons/md";
import positionsData from "./MapPosition.json";
import dongData from "./dong.json";
import sigunguData from "./sigungu.json";
import sidoData from "./sido.json";
import { FaSearch } from "react-icons/fa";

interface BoundPosition {
  lat: number;
  lng: number;
}

interface Bound {
  sw: BoundPosition;
  ne: BoundPosition;
}

export default function MapComponent() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/map/search?query=${encodeURIComponent(searchValue)}`);
    }
  };

  const toast = useToast(); // Toast 훅 초기화

  const positions = positionsData.filtered;
  const dongs = dongData.seoul;
  const sigungus = sigunguData.seoul;
  const sidos = sidoData.sido;
  const [bounds, setBounds] = useState<Bound | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(3); // 초기 줌 레벨 설정
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null); // 지도 인스턴스 저장
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null); // 현재 위치 저장

  const onIdle = (map: kakao.maps.Map) => {
    const kakaoBounds = map.getBounds();
    const sw = kakaoBounds.getSouthWest();
    const ne = kakaoBounds.getNorthEast();

    setBounds({
      sw: { lat: sw.getLat(), lng: sw.getLng() },
      ne: { lat: ne.getLat(), lng: ne.getLng() },
    });

    setZoomLevel(map.getLevel()); // 줌 레벨 업데이트
  };

  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.setLevel(mapInstance.getLevel() - 1); // 줌 인
      toast({
        title: "줌 인",
        description: `현재 줌 레벨: ${mapInstance.getLevel() - 1}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.setLevel(mapInstance.getLevel() + 1); // 줌 아웃
      toast({
        title: "줌 아웃",
        description: `현재 줌 레벨: ${mapInstance.getLevel() + 1}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // 현재 위치로 지도 중심 이동
          if (mapInstance) {
            mapInstance.setCenter(new kakao.maps.LatLng(latitude, longitude));
          }

          // 현재 위치 저장
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
          });

          toast({
            title: "현재 위치 이동 성공",
            description: "지도가 현재 위치로 이동되었습니다.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        (error) => {
          toast({
            title: "현재 위치 오류",
            description: "현재 위치를 가져올 수 없습니다. 브라우저 설정을 확인하세요.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
    } else {
      toast({
        title: "지원되지 않는 브라우저",
        description: "현재 위치 기능이 브라우저에서 지원되지 않습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredPositions = bounds
    ? positions.filter(
        (pos) =>
          bounds &&
          pos.lat >= bounds.sw.lat &&
          pos.lat <= bounds.ne.lat &&
          pos.lng >= bounds.sw.lng &&
          pos.lng <= bounds.ne.lng
      )
    : positions;

  const filteredDongs = bounds
    ? dongs.filter(({ lat, lng }) => {
        if (lat && lng) {
          return (
            bounds &&
            lat >= bounds.sw.lat &&
            lat <= bounds.ne.lat &&
            lng >= bounds.sw.lng &&
            lng <= bounds.ne.lng
          );
        }
        return false;
      })
    : dongs;

  const filteredSigungus = bounds
    ? sigungus.filter(({ lat, lng }) => {
        if (lat && lng) {
          return (
            bounds &&
            lat >= bounds.sw.lat &&
            lat <= bounds.ne.lat &&
            lng >= bounds.sw.lng &&
            lng <= bounds.ne.lng
          );
        }
        return false;
      })
    : sigungus;

  const filteredSidos = bounds
    ? sidos.filter(({ lat, lng }) => {
        if (lat && lng) {
          return (
            bounds &&
            lat >= bounds.sw.lat &&
            lat <= bounds.ne.lat &&
            lng >= bounds.sw.lng &&
            lng <= bounds.ne.lng
          );
        }
        return false;
      })
    : sidos;

  const convertToBillion = (value: any) => {
    if (value) {
      return (value / 10000).toFixed(1) + "억"; // 10000으로 나누고 소수점 1자리로 표시
    }
    return "정보 없음"; // 값이 없을 경우
  };

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 88px)",
        position: "relative",
        marginTop: "88px",
      }}
    >
      <Map
        center={{ lat: 37.5236077, lng: 127.0572148 }} // 초기 중심 좌표
        level={zoomLevel} // 지도 확대/축소 레벨
        style={{ width: "100%", height: "100%" }}
        onCreate={(map) => {
          setMapInstance(map);
          kakao.maps.event.addListener(map, "idle", () => onIdle(map));
        }}
      >
        {/* zoomLevel 3이하 필터링된 마커 */}
        {zoomLevel <= 3 &&
          filteredPositions.map(({ id, lat, lng, name, price }) => (
            <CustomOverlayMap key={`marker-${id}`} position={{ lat, lng }}>
              <Box
                w={"56px"}
                h={"70px"}
                // backgroundImage={`images/apt_up${isMaxPrice ? "4" : "1"}.png`}
                backgroundImage={"images/apt_up1.png"}
                textAlign={"center"}
                color={"white"}
              >
                <Box lineHeight={1.1} pt={"9px"} fontSize={"12px"} fontWeight={"bold"}>
                  {convertToBillion(price?.sales.min)}
                </Box>
                <Box lineHeight={1.1} fontSize={"10px"}>
                  ~{convertToBillion(price?.sales.max)}
                </Box>
                <Box
                  position="absolute"
                  bottom="-16px"
                  transform="translateX(-50%)"
                  left="50%"
                  fontSize="10px"
                  lineHeight="1.4"
                  color="white"
                  pb="1px"
                  px="3px"
                  opacity="0.8"
                  bg="rgb(96, 96, 96)"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {name}
                </Box>
              </Box>
            </CustomOverlayMap>
          ))}
        {/* zoomLevel 4이상 필터링된 마커 */}
        {zoomLevel >= 4 &&
          zoomLevel <= 5 &&
          filteredDongs.map(({ lat, lng, dong }: any) => (
            <CustomOverlayMap key={`dong-${dong}`} position={{ lat, lng }}>
              <VStack
                w={"85px"}
                h={"53px"}
                backgroundImage={"/images/local_up2.png"}
                textAlign={"center"}
                color={"white"}
                lineHeight={1.2}
                justifyContent={"center"}
                spacing={0}
              >
                <Box fontSize={"11px"}>{dong}</Box>
                <Box fontSize={"12px"} fontWeight={"bold"}>
                  25억
                </Box>
              </VStack>
            </CustomOverlayMap>
          ))}
        {/* zoomLevel 6이상 필터링된 마커 */}
        {zoomLevel >= 6 &&
          zoomLevel <= 9 &&
          filteredSigungus.map(({ lat, lng, sigungu }: any) => (
            <CustomOverlayMap key={`sigungu-${sigungu}`} position={{ lat, lng }}>
              <VStack
                w={"85px"}
                h={"53px"}
                backgroundImage={"/images/local_up2.png"}
                textAlign={"center"}
                color={"white"}
                lineHeight={1.2}
                justifyContent={"center"}
                spacing={0}
              >
                <Box fontSize={"11px"}>{sigungu}</Box>
                <Box fontSize={"12px"} fontWeight={"bold"}>
                  25억
                </Box>
              </VStack>
            </CustomOverlayMap>
          ))}

        {/* zoomLevel 10이상 필터링된 마커 */}
        {zoomLevel >= 10 &&
          filteredSidos.map(({ lat, lng, sido }: any) => (
            <CustomOverlayMap key={`sido-${sido}`} position={{ lat, lng }}>
              <VStack
                w={"85px"}
                h={"53px"}
                backgroundImage={"/images/local_up2.png"}
                textAlign={"center"}
                color={"white"}
                lineHeight={1.2}
                justifyContent={"center"}
                spacing={0}
              >
                <Box fontSize={"11px"}>{sido}</Box>
                <Box fontSize={"12px"} fontWeight={"bold"}>
                  25억
                </Box>
              </VStack>
            </CustomOverlayMap>
          ))}

        {/* 현재 위치 마커 */}
        {currentLocation && (
          <MapMarker
            position={currentLocation}
            image={{
              src: "images/my_location_marker.png", // 아이콘 이미지 URL
              size: { width: 24, height: 24 },
            }}
          ></MapMarker>
        )}
      </Map>

      {/* 줌 컨트롤 버튼 */}
      <VStack position="absolute" bottom="50px" right="10px" zIndex={10} spacing={1}>
        <Button onClick={handleZoomIn} bg="white" color="black" size="sm" w={8}>
          +
        </Button>
        <Button onClick={handleZoomOut} bg="white" color="black" size="sm" w={8}>
          -
        </Button>
      </VStack>

      {/* 현재 위치 버튼 */}
      <Box position="absolute" bottom="10px" right="10px" zIndex={10}>
        <Button
          onClick={handleCurrentLocation}
          colorScheme="customOrange"
          variant={"primary"}
          size="sm"
          w={8}
          h={8}
          p={0}
        >
          <MdMyLocation size={20} />
        </Button>
      </Box>

      <Box
        position={"absolute"}
        left={"10px"}
        top={"10px"}
        minW={"358px"}
        p={"10px"}
        bg={"#FFFFFF"}
        borderRadius={24}
        zIndex={1}
      >
        <InputGroup>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="아파트, 지역 검색"
            borderRadius={24}
            borderColor={"#F37021"}
          />
          <InputRightAddon
            bg={"#F37021"}
            borderTopEndRadius={24}
            borderBottomEndRadius={24}
            borderColor={"#F37021"}
            px={3}
            onClick={handleSearch}
          >
            <FaSearch size={16} color="#FFFFFF" />
          </InputRightAddon>
        </InputGroup>
      </Box>
    </div>
  );
}
