import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Skeleton,
  useToast,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Map, CustomOverlayMap, MapMarker, Polyline, Polygon } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApts, geCityDongAvg, getAptFocusById } from "../../../api/apt";
import { MdMyLocation } from "react-icons/md";
import { FaSearch, FaSnowflake } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PiOpenAiLogo } from "react-icons/pi";
import { FaFire } from "react-icons/fa";
import polygonData from "./TL_SCCO_SIG.json";
import { MdClose } from "react-icons/md";
import { GoDash } from "react-icons/go";

interface BoundPosition {
  lat: number;
  lng: number;
}

interface Bound {
  sw: BoundPosition;
  ne: BoundPosition;
}

interface AptData {
  id: string;
  lat: number;
  lng: number;
  name: string;
  minAmount: number;
  maxAmount: number;
  aiPriceChangePercent: number;
  monthComparisonPercent: number;
}

export default function MapComponent() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [bounds, setBounds] = useState<Bound | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(3); // 초기 줌 레벨
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null); // 지도 인스턴스 저장
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null); // 현재 위치 저장
  const [focusedApartment, setFocusedApartment] = useState<AptData | null>(null); // Store the focused apartment details
  const toast = useToast();

  const location = useLocation();

  // 특정 경로에서 SearchBox 숨기기
  const hideSearchBox = location.pathname === "/map";

  // 다크모드 적용
  const backgroundColor = useColorModeValue("#FFFFFF", "gray.600");

  // 데이터 fetch 함수
  const fetchMapData = async (): Promise<any[]> => {
    if (!bounds) return []; // Bounds가 없으면 빈 배열 반환
    if (zoomLevel <= 3) return await getApts(bounds);
    if (zoomLevel >= 4 && zoomLevel <= 5) return await geCityDongAvg(bounds, "dong");
    if (zoomLevel >= 6 && zoomLevel <= 9) return await geCityDongAvg(bounds, "gu");
    return await geCityDongAvg(bounds, "si");
  };

  const onApartmentClick = (apartmentId: string, event: any) => {
    event.stopPropagation();
    navigate(`/map/apt/${apartmentId}`);
  };

  // React Query 사용
  const { data, isLoading, isError, error, refetch } = useQuery<any[], Error>({
    queryKey: ["mapData", bounds, zoomLevel],
    queryFn: fetchMapData,
    // enabled: !!bounds, // bounds가 설정된 경우에만 실행
    enabled: true, // 항상 실행
    retry: 1, // 요청 실패 시 한 번만 재시도
  });

  // 거리 계산 관련 상태 추가
  const [isdrawing, setIsdrawing] = useState(false); // 거리 측정 모드 여부
  const [paths, setPaths] = useState<{ lat: number; lng: number }[]>([]); // 클릭된 지점 저장
  const [distances, setDistances] = useState<number[]>([]); // 각 지점 간 거리 저장
  const [mousePosition, setMousePosition] = useState({ lat: 0, lng: 0 }); // 현재 마우스 위치

  // 거리 정보 표시 컴포넌트 추가
  const DistanceInfo = ({ distance }: { distance: number }) => {
    const roundDistance = distance.toFixed(1);
    const walkTime = Math.floor(distance / 67); // 도보 시간 계산 (67m/분)
    const bikeTime = Math.floor(distance / 227); // 자전거 시간 계산 (227m/분)

    return (
      <Box
        bg="white"
        border="1px solid #F37021"
        borderRadius="8px"
        p="4px"
        fontSize="12px"
        fontWeight="bold"
        color="black"
      >
        총 거리: {roundDistance}m<br />
        도보: {walkTime}분<br />
        자전거: {bikeTime}분
      </Box>
    );
  };

  // 지도 클릭 시 경로에 지점 추가
  const handleMapClick = (_map: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    const newPoint = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    };
    setPaths((prev) => [...prev, newPoint]); // 새로운 지점 추가
    setIsdrawing(true); // 거리 측정 모드 활성화
  };

  // 지도에서 마우스 이동 시 현재 위치 갱신
  const handleMouseMove = (_map: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  // 지도 우클릭 시 거리 측정 종료
  const handleRightClick = () => {
    setIsdrawing(false);
    setDistances([]); // 거리 초기화
    setPaths([]); // 경로 초기화
  };

  // 거리 계산 로직
  useEffect(() => {
    if (paths.length > 1) {
      const linePath = paths.map((point) => new kakao.maps.LatLng(point.lat, point.lng));
      const polyline = new kakao.maps.Polyline({ path: linePath });
      const totalDistance = polyline.getLength(); // 총 거리 계산
      setDistances([totalDistance]);
    }
  }, [paths]);

  useEffect(() => {
    if (mapInstance) {
      const kakaoBounds = mapInstance.getBounds();
      const sw = kakaoBounds.getSouthWest();
      const ne = kakaoBounds.getNorthEast();

      const initialBounds = {
        sw: { lat: sw.getLat(), lng: sw.getLng() },
        ne: { lat: ne.getLat(), lng: ne.getLng() },
      };

      setBounds(initialBounds);
      // console.log("초기 bounds 설정:", initialBounds);
    }
  }, [mapInstance]);

  useEffect(() => {
    if (bounds) {
      // console.log("Bounds updated, refetching data...");
      refetch();
    }
  }, [bounds, refetch]);

  const onIdle = (map: kakao.maps.Map) => {
    const kakaoBounds = map.getBounds();
    const sw = kakaoBounds.getSouthWest();
    const ne = kakaoBounds.getNorthEast();

    const newBounds = {
      sw: { lat: sw.getLat(), lng: sw.getLng() },
      ne: { lat: ne.getLat(), lng: ne.getLng() },
    };

    setBounds(newBounds); // refetch는 useEffect에서 처리
    setZoomLevel(map.getLevel());
  };

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/map/search?query=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleZoomIn = () => {
    if (mapInstance) {
      setZoomLevel(zoomLevel - 1); // 줌 인
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
      setZoomLevel(zoomLevel + 1); // 줌 아웃
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

  const { id: apartmentId } = useParams<{ id: string }>(); // Extract apartmentId from URL

  useEffect(() => {
    const fetchFocusedApartment = async () => {
      if (apartmentId) {
        console.log();
        try {
          const focusedApt = await getAptFocusById(apartmentId); // await 사용
          setFocusedApartment(focusedApt); // 상태 업데이트

          // 요청 성공 시 알림
          toast({
            title: "아파트 정보 로드 성공",
            description: `${focusedApt.name} 정보가 성공적으로 로드되었습니다.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error: any) {
          // 요청 실패 시 알림
          toast({
            title: "아파트 정보 로드 실패",
            description: error.response?.data?.message || "아파트 정보를 불러오는 데 실패했습니다.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };

    fetchFocusedApartment();
  }, [apartmentId, mapInstance]); // apartmentId나 mapInstance가 변경될 때만 실행

  useEffect(() => {
    if (focusedApartment && mapInstance) {
      const newCenter = new kakao.maps.LatLng(focusedApartment.lat, focusedApartment.lng);
      mapInstance.setCenter(newCenter); // Update map center
      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(focusedApartment.lat, focusedApartment.lng),
        content: `
            <div style="
              width: 56px;
              height: 70px;
              background-image: url('/images/apt_clicked.png');
              background-size: cover;
              background-repeat: no-repeat;
              text-align: center;
              color: #F37021;
              z-index: 9999;
              animation: bounce 2s infinite;">
              ${
                focusedApartment.aiPriceChangePercent !== 0
                  ? `
                  <!-- HStack 1 -->
                  <div style="
                    position: absolute;
                    top: -54px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #1F1F1F;
                    border-radius: 8px;
                    padding: 4px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    width: 78px;
                  ">
                    <img src="/images/SiOpenai.svg" alt="OpenAI Logo" style="width: 16px; height: 16px;" />
                    <span style="font-size: 12px; font-weight: bold; color: #FFFFFF; margin-left: 4px;">
                    ${
                      focusedApartment.aiPriceChangePercent > 0
                        ? `+${focusedApartment.aiPriceChangePercent.toFixed(1)}%`
                        : `${focusedApartment.aiPriceChangePercent.toFixed(1)}%`
                    }
                    </span>
                  </div>`
                  : ""
              }
              
              <!-- HStack 2 -->
              <div style="
                position: absolute;
                top: -26px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f2f2f2;
                border-radius: 8px;
                padding: 4px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                width: 74px;
              ">
              ${
                focusedApartment.monthComparisonPercent > 0 &&
                focusedApartment.monthComparisonPercent !== 100
                  ? `<img src="/images/FaFire.svg" alt="Fire Icon" style="width: 16px; height: 16px;" />
                     <span style="font-size: 12px; font-weight: bold; color: #FF4500; margin-left: 4px;">
                       +${focusedApartment.monthComparisonPercent.toFixed(1)}%
                     </span>`
                  : focusedApartment.monthComparisonPercent < 0
                  ? `<img src="/images/FaSnowflake.svg" alt="Snow Icon" style="width: 16px; height: 16px;" />
                     <span style="font-size: 12px; font-weight: bold; color: #339FFF; margin-left: 4px;">
                       ${focusedApartment.monthComparisonPercent.toFixed(1)}%
                     </span>`
                  : focusedApartment.monthComparisonPercent === 100
                  ? `<img src="/images/GoDash.svg" alt="Neutral Icon" style="width: 16px; height: 16px;" />
                     <span style="font-size: 12px; font-weight: bold; color: #808080; margin-left: 4px;">
                       0.0%
                     </span>`
                  : `<img src="/images/GoDash.svg" alt="Neutral Icon" style="width: 16px; height: 16px;" />
                     <span style="font-size: 12px; font-weight: bold; color: #808080; margin-left: 4px;">
                       0.0%
                     </span>`
              }
              
              

              </div>

              <div style="line-height: 1.1; padding-top: 9px; font-size: 12px; font-weight: bold;">
                ${
                  focusedApartment.minAmount
                    ? `${(focusedApartment.minAmount / 10000).toFixed(
                        focusedApartment.minAmount >= 100000 ? 0 : 1
                      )}억`
                    : "N/A"
                }
              </div>
              <div style="line-height: 1.1; font-size: 10px;">
                ~${
                  focusedApartment.maxAmount
                    ? `${(focusedApartment.maxAmount / 10000).toFixed(
                        focusedApartment.maxAmount >= 100000 ? 0 : 1
                      )}억`
                    : "N/A"
                }
              </div>
              <div style="
                position: absolute;
                bottom: -16px;
                transform: translateX(-50%);
                left: 50%;
                font-size: 10px;
                line-height: 1.4;
                color: white;
                padding-bottom: 1px;
                padding-left: 3px;
                padding-right: 3px;
                opacity: 0.8;
                background: rgb(96, 96, 96);
                overflow: hidden;
                text-overflow: ellipsis;
              ">
                ${focusedApartment.name ?? "Unknown"}
              </div>
            </div>
            `,
        zIndex: 9999,
      });

      overlay.setMap(mapInstance);

      return () => {
        overlay.setMap(null);
      };
    }
  }, [focusedApartment]);

  // 바운드 내에 이미지를 4단계로 나눔
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [range, setRange] = useState<number>(0);
  const [dongGuMinValue, setDongGuMinValue] = useState<number>(0);
  const [dongGuMaxValue, setDongGuMaxValue] = useState<number>(0);
  const [dongGuRange, setDongGuRange] = useState<number>(0);

  useEffect(() => {
    if (data && data.length > 0) {
      // 바운드 4단계
      const maxAmounts = data.map((item: any) => item.maxAmount).filter(Boolean);

      if (maxAmounts.length > 0) {
        const min = Math.min(...maxAmounts);
        const max = Math.max(...maxAmounts);
        const calculatedRange = (max - min) / 4;

        setMinValue(min);
        setMaxValue(max);
        setRange(calculatedRange);
      }
      // 구 동 별 바운드 4단계
      const maxDongGuAvg = data.map((item: any) => item.avg).filter(Boolean);
      if (maxDongGuAvg.length > 0) {
        const min = Math.min(...maxDongGuAvg);
        const max = Math.max(...maxDongGuAvg);
        const calculatedRange = (max - min) / 4;

        setDongGuMinValue(min);
        setDongGuMaxValue(max);
        setDongGuRange(calculatedRange);
      }
    }
  }, [data]);

  // 단계에 따른 색상 설정
  const getDongGuBackgroundColor = (level: number): string => {
    switch (level) {
      case 1:
        return "#FAC19E";
      case 2:
        return "#FFAA77";
      case 3:
        return "#FF9C60";
      default:
        return "#F37021";
    }
  };

  const getLevel = (value: number) => {
    if (value <= minValue + range) return 1;
    if (value <= minValue + range * 2) return 2;
    if (value <= minValue + range * 3) return 3;
    return 4;
  };

  const getDongGuLevel = (value: number) => {
    if (value <= dongGuMinValue + dongGuRange) return 1;
    if (value <= dongGuMinValue + dongGuRange * 2) return 2;
    if (value <= minValue + dongGuRange * 3) return 3;
    return 4;
  };

  // 폴리곤 데이터 렌더링 함수
  const renderPolygons = (mapInstance: kakao.maps.Map) => {
    if (zoomLevel < 6 || zoomLevel > 9) return null;

    return polygonData.features.map((feature: any, index: number) => {
      const { coordinates } = feature.geometry;
      const { SIG_KOR_NM } = feature.properties;

      // 좌표 변환
      const path = coordinates[0].map(([lng, lat]: [number, number]) => ({
        lat,
        lng,
      }));

      // 중심 좌표 계산
      const center = path.reduce(
        (acc: BoundPosition, point: BoundPosition) => ({
          lat: acc.lat + point.lat / path.length,
          lng: acc.lng + point.lng / path.length,
        }),
        { lat: 0, lng: 0 }
      );

      return (
        <React.Fragment key={index}>
          {/* 폴리곤 추가 */}
          <Polygon
            path={path}
            strokeWeight={2}
            strokeColor="#F37021"
            strokeOpacity={1}
            fillColor="#FF6000"
            fillOpacity={0.1}
          />
        </React.Fragment>
      );
    });
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
        center={{ lat: 37.5012748, lng: 127.039625 }}
        level={zoomLevel}
        style={{ width: "100%", height: "100%" }}
        onCreate={(map) => {
          setMapInstance(map);
          kakao.maps.event.addListener(map, "idle", () => onIdle(map));
        }}
        onClick={handleMapClick} // 클릭 이벤트 핸들러 추가
        onMouseMove={handleMouseMove} // 마우스 이동 이벤트 핸들러 추가
        onRightClick={handleRightClick} // 우클릭 이벤트 핸들러 추가
      >
        {/* Polyline 그리기 */}
        <Polyline
          path={paths}
          strokeWeight={3}
          strokeColor="#db4040"
          strokeOpacity={1}
          strokeStyle="solid"
        />

        {/* 현재 마우스 위치와 마지막 경로를 연결하는 임시 선 */}
        {isdrawing && (
          <Polyline
            path={[...paths, mousePosition]}
            strokeWeight={2}
            strokeColor="#ff6b6b"
            strokeOpacity={0.5}
            strokeStyle="dashed"
          />
        )}

        {/* 거리 정보 표시 */}
        {distances.length > 0 && (
          <CustomOverlayMap position={paths[paths.length - 1]} zIndex={2} yAnchor={1}>
            <DistanceInfo distance={distances[distances.length - 1]} />
          </CustomOverlayMap>
        )}

        {zoomLevel <= 3 &&
          data?.map((item: any, index: number) => {
            if (!item.lat || !item.lng) return null; // 유효하지 않은 좌표는 무시
            if (item.lat === focusedApartment?.lat && item.lng === focusedApartment?.lng)
              return null;

            if (!item.minAmount && !item.maxAmount) {
              return (
                <CustomOverlayMap
                  key={item.id || index}
                  position={{
                    lat: item.lat,
                    lng: item.lng,
                  }}
                >
                  <Box
                    w={"28px"}
                    h={"35px"}
                    style={{
                      backgroundImage: 'url("/images/apt_up1.png")',
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    textAlign={"center"}
                    color={"white"}
                  >
                    <Box position="absolute" top="50%" transform="translate(-50%, -50%)" left="50%">
                      <MdClose size={36} color="#4A5568" />
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
                      {item.name ?? "Unknown"}
                    </Box>
                  </Box>
                </CustomOverlayMap>
              );
            }
            const level = getLevel(item.maxAmount);
            const imageUrl = `url('/images/apt_up${level}.png')`;
            return (
              <CustomOverlayMap
                key={item.id || index}
                position={{
                  lat: item.lat,
                  lng: item.lng,
                }}
              >
                <Box
                  w={"56px"}
                  h={"70px"}
                  style={{
                    backgroundImage: imageUrl,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  textAlign={"center"}
                  color={"white"}
                  onClick={(event) => onApartmentClick(item.id, event)}
                >
                  {item.aiPriceChangePercent > 0 && (
                    <HStack
                      pos={"absolute"}
                      top={"-54px"}
                      left={"50%"}
                      transform={"translateX(-50%)"}
                      spacing={"4px"}
                      bg={"#1F1F1F"}
                      borderRadius={"8px"}
                      px={"4px"}
                      py={"4px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      boxShadow={"0 2px 4px rgba(0, 0, 0, 0.2)"}
                    >
                      <PiOpenAiLogo color="#FFFFFF" />
                      <Box fontSize={"12px"} fontWeight={"bold"} color={"#FFFFFF"}>
                        +{item.aiPriceChangePercent.toFixed(1)}%
                      </Box>
                    </HStack>
                  )}
                  {item.aiPriceChangePercent < 0 && (
                    <HStack
                      pos={"absolute"}
                      top={"-54px"}
                      left={"50%"}
                      transform={"translateX(-50%)"}
                      spacing={"4px"}
                      bg={"#1F1F1F"}
                      borderRadius={"8px"}
                      px={"4px"}
                      py={"4px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      boxShadow={"0 2px 4px rgba(0, 0, 0, 0.2)"}
                    >
                      <PiOpenAiLogo color="#FFFFFF" />
                      <Box fontSize={"12px"} fontWeight={"bold"} color={"#FFFFFF"}>
                        {item.aiPriceChangePercent.toFixed(1)}%
                      </Box>
                    </HStack>
                  )}

                  <HStack
                    pos={"absolute"}
                    top={"-26px"}
                    left={"50%"}
                    transform={"translateX(-50%)"}
                    spacing={"4px"}
                    bg={"#f2f2f2"}
                    borderRadius={"8px"}
                    px={"4px"}
                    py={"4px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    boxShadow={"0 2px 4px rgba(0, 0, 0, 0.2)"}
                  >
                    {item.monthComparisonPercent > 0 && item.monthComparisonPercent != 100 && (
                      <>
                        <FaFire color="#FF4500" />
                        <Box fontSize={"12px"} fontWeight={"bold"} color={"#FF4500"}>
                          +{item.monthComparisonPercent.toFixed(1)}%
                        </Box>
                      </>
                    )}
                    {item.monthComparisonPercent < 0 && (
                      <>
                        <FaSnowflake color="#339FFF" />
                        <Box fontSize={"12px"} fontWeight={"bold"} color={"#339FFF"}>
                          {item.monthComparisonPercent.toFixed(1)}%
                        </Box>
                      </>
                    )}
                    {item.monthComparisonPercent === 100 && (
                      <>
                        <GoDash color="#808080" />
                        <Box fontSize={"12px"} fontWeight={"bold"} color={"#808080"}>
                          0.0%
                        </Box>
                      </>
                    )}
                    {item.monthComparisonPercent === 0 && (
                      <>
                        <GoDash color="#808080" />
                        <Box fontSize={"12px"} fontWeight={"bold"} color={"#808080"}>
                          0.0%
                        </Box>
                      </>
                    )}
                  </HStack>

                  <Box lineHeight={1.1} pt={"9px"} fontSize={"12px"} fontWeight={"bold"}>
                    {item.minAmount
                      ? `${(item.minAmount / 10000).toFixed(item.minAmount >= 100000 ? 0 : 1)}억`
                      : "N/A"}
                  </Box>
                  <Box lineHeight={1.1} fontSize={"10px"}>
                    ~
                    {item.maxAmount
                      ? `${(item.maxAmount / 10000).toFixed(item.maxAmount >= 100000 ? 0 : 1)}억`
                      : "N/A"}
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
                    {item.name ?? "Unknown"}
                  </Box>
                </Box>
              </CustomOverlayMap>
            );
          })}
        {zoomLevel >= 4 &&
          zoomLevel <= 5 &&
          data?.map(({ lat, lng, city, avg }: any) => {
            const level = getDongGuLevel(avg); // avg 기준 단계 계산
            const backgroundColor = getDongGuBackgroundColor(level); // 단계별 배경색 결정
            return (
              <CustomOverlayMap key={`dong-${city}`} position={{ lat, lng }}>
                <VStack
                  w={"85px"}
                  h={"53px"}
                  backgroundColor={backgroundColor} // 단계별 배경색 적용
                  borderRadius={"24px"}
                  boxShadow={"0 2px 4px rgba(0, 0, 0, 0.25)"}
                  textAlign={"center"}
                  color={"white"}
                  lineHeight={1.2}
                  justifyContent={"center"}
                  spacing={0}
                >
                  <Box fontSize={"11px"}>{city}</Box>
                  <Box fontSize={"12px"} fontWeight={"bold"}>
                    {avg ? `${(avg / 10000).toFixed(avg >= 100000 ? 0 : 1)}억` : "N/A"}
                  </Box>
                </VStack>
              </CustomOverlayMap>
            );
          })}
        {zoomLevel >= 6 && zoomLevel <= 9 && mapInstance && renderPolygons(mapInstance)}
        {zoomLevel >= 6 &&
          zoomLevel <= 9 &&
          data?.map(({ lat, lng, city, avg }: any) => {
            const level = getDongGuLevel(avg); // avg 기준 단계 계산
            const backgroundColor = getDongGuBackgroundColor(level); // 단계별 배경색 결정
            return (
              <CustomOverlayMap key={`gu-${city}`} position={{ lat, lng }}>
                <VStack
                  w={"85px"}
                  h={"53px"}
                  backgroundColor={backgroundColor} // 단계별 배경색 적용
                  borderRadius={"24px"}
                  boxShadow={"0 2px 4px rgba(0, 0, 0, 0.25)"}
                  textAlign={"center"}
                  color={"white"}
                  lineHeight={1.2}
                  justifyContent={"center"}
                  spacing={0}
                >
                  <Box fontSize={"11px"}>{city}</Box>
                  <Box fontSize={"12px"} fontWeight={"bold"}>
                    {avg ? `${(avg / 10000).toFixed(avg >= 100000 ? 0 : 1)}억` : "N/A"}
                  </Box>
                </VStack>
              </CustomOverlayMap>
            );
          })}

        {zoomLevel >= 10 &&
          data?.map(({ lat, lng, city, avg }: any) => (
            <CustomOverlayMap key={`si-${city}`} position={{ lat, lng }}>
              <VStack
                w={"85px"}
                h={"53px"}
                backgroundColor={"#F37021"}
                borderRadius={"24px"}
                boxShadow={"0 2px 4px rgba(0, 0, 0, 0.25)"}
                textAlign={"center"}
                color={"white"}
                lineHeight={1.2}
                justifyContent={"center"}
                spacing={0}
              >
                <Box fontSize={"11px"}>{city}</Box>
                <Box fontSize={"12px"} fontWeight={"bold"}>
                  {avg ? `${(avg / 10000).toFixed(avg >= 100000 ? 0 : 1)}억` : "N/A"}
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
        <Button
          onClick={handleZoomIn}
          bg={"whiteAlpha.900"}
          color={"blackAlpha.900"}
          size="sm"
          w={8}
        >
          +
        </Button>
        <Button
          onClick={handleZoomOut}
          bg={"whiteAlpha.900"}
          color={"blackAlpha.900"}
          size="sm"
          w={8}
        >
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

      {/* 검색 박스 */}
      {hideSearchBox && (
        <Box
          position={"absolute"}
          left={"10px"}
          top={"10px"}
          minW={"358px"}
          p={"10px"}
          bg={backgroundColor}
          borderRadius={24}
          zIndex={1}
          boxShadow={"0px 2px 4px rgba(0,0,0,0.25)"}
        >
          <InputGroup>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="아파트, 지역 검색"
              borderRadius={24}
              borderColor={"#F37021"}
              focusBorderColor="#FF9C60"
              _focus={{
                borderWidth: "1px",
                borderColor: "#FF9C60",
                boxShadow: "none",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // 엔터 키를 누르면 handleSearch 호출
                }
              }}
            />
            <InputRightAddon
              bg={"#F37021"}
              borderTopEndRadius={24}
              borderBottomEndRadius={24}
              borderColor={"#F37021"}
              px={3}
              onClick={handleSearch}
              cursor={"pointer"}
            >
              <FaSearch size={16} color="#FFFFFF" />
            </InputRightAddon>
          </InputGroup>
        </Box>
      )}
    </div>
  );
}
