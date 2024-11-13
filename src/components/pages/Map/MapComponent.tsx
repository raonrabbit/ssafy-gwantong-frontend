import { Box, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import MapSearch from "./MapSearch";
import MapResult from "./MapResult";

export default function MapComponent() {
  return (
    <div style={{ width: "100%", height: "calc(100vh - 88px)", position: "relative" }}>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }} // 초기 중심 좌표
        level={3} // 지도 확대/축소 레벨
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} />
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
