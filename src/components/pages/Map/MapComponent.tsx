import { Box, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import MapSearch from "./MapSearch";
import MapResult from "./MapResult";

export default function MapComponent() {
  const positions = [
    {
      lat: 37.5236077,
      lng: 127.0572148,
      content: "청담자이",
      minPrice: "22억",
      maxPrice: "40.2억",
    },
    {
      lat: 37.5248352,
      lng: 127.0552715,
      content: "마크힐스청담1차",
      minPrice: "66.8억",
      maxPrice: "104.7억",
    },
    {
      lat: 37.5247718,
      lng: 127.0561392,
      content: "청담래미안로이뷰",
      minPrice: "27.7억",
      maxPrice: "27.7억",
    },
  ];
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
        level={3} // 지도 확대/축소 레벨
        style={{ width: "100%", height: "100%" }}
      >
        {positions.map((pos, index) => (
          <MapMarker
            key={`marker-${index}`}
            position={{ lat: pos.lat, lng: pos.lng }}
            image={{
              src: "images/apt_up1.png", // 아이콘 이미지 URL
              size: { width: 56, height: 70 }, // 아이콘 크기
            }}
          >
            <Box lineHeight={1.1} pt={"7px"} fontSize={"12px"} fontWeight={"bold"}>
              {pos.minPrice}
            </Box>
            <Box lineHeight={1.1} fontSize={"10px"}>
              ~{pos.maxPrice}
            </Box>
          </MapMarker>
        ))}
      </Map>
      {/* 검색 박스 */}
      {/* <Box
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
          <Input placeholder="아파트, 지역 검색" borderRadius={24} borderColor={"#F37021"} />
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
      </Box> */}

      {/* <MapSearch /> */}
      <MapResult />
    </div>
  );
}
