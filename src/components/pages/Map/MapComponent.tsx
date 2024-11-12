import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function MapComponent() {
  return (
    <div style={{ width: "100%", height: "calc(100vh - 88px)" }}>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }} // 초기 중심 좌표
        level={3} // 지도 확대/축소 레벨
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} />
      </Map>
    </div>
  );
}
