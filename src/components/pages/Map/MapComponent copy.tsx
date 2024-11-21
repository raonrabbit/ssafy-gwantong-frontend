import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Skeleton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Map, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApts, getDongAvg, getSigunguAvg, getSidoAvg } from "../../../api/apt";
import { MdMyLocation } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const [bounds, setBounds] = useState<Bound | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(3); // 초기 줌 레벨
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null); // 지도 인스턴스 저장
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null); // 현재 위치 저장
  const toast = useToast();

  // 데이터 fetch 함수
  const fetchMapData = async (): Promise<any[]> => {
    if (!bounds) return []; // Bounds가 없으면 빈 배열 반환
    if (zoomLevel <= 4) return getApts(bounds);
    if (zoomLevel === 5) return getDongAvg(bounds);
    if (zoomLevel >= 6 && zoomLevel <= 9) return getSigunguAvg(bounds);
    return getSidoAvg(bounds);
  };

  // React Query 사용
  const { data, isLoading, isError, error, refetch } = useQuery<any[], Error>({
    queryKey: ["mapData", bounds, zoomLevel],
    queryFn: fetchMapData,
    enabled: !!bounds, // bounds가 설정된 경우에만 실행
    retry: 1, // 요청 실패 시 한 번만 재시도
  });

  // 에러 처리: useEffect에서 error 처리
  useEffect(() => {
    if (error) {
      toast({
        title: "데이터 가져오기 실패",
        description: error.message || "알 수 없는 오류가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  // onIdle 이벤트 핸들러
  const onIdle = (map: kakao.maps.Map) => {
    const kakaoBounds = map.getBounds();
    const sw = kakaoBounds.getSouthWest();
    const ne = kakaoBounds.getNorthEast();

    // Bounds와 ZoomLevel 업데이트
    setBounds({
      sw: { lat: sw.getLat(), lng: sw.getLng() },
      ne: { lat: ne.getLat(), lng: ne.getLng() },
    });

    setZoomLevel(map.getLevel());

    // 데이터 요청 실행
    refetch();
  };

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/map/search?query=${encodeURIComponent(searchValue)}`);
    }
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
        center={{ lat: 37.5236077, lng: 127.0572148 }}
        level={zoomLevel}
        style={{ width: "100%", height: "100%" }}
        onCreate={(map) => {
          setMapInstance(map);
          kakao.maps.event.addListener(map, "idle", () => onIdle(map));
        }}
      >
        {/* Skeleton UI */}
        {isLoading ? (
          <Skeleton height="100px" width="100%" />
        ) : isError ? (
          <Box>데이터를 가져오는데 실패했습니다.</Box>
        ) : (
          data?.map((item: any) => (
            <CustomOverlayMap key={item.id} position={{ lat: item.lat, lng: item.lng }}>
              <Box
                w={"56px"}
                h={"70px"}
                // backgroundImage={`images/apt_up${isMaxPrice ? "4" : "1"}.png`}
                backgroundImage={"images/apt_up1.png"}
                textAlign={"center"}
                color={"white"}
              >
                <Box lineHeight={1.1} pt={"9px"} fontSize={"12px"} fontWeight={"bold"}>
                  {item.price.min}
                </Box>
                <Box lineHeight={1.1} fontSize={"10px"}>
                  ~{item.price.max}
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
                  {item.name}
                </Box>
              </Box>
            </CustomOverlayMap>
          ))
        )}
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
