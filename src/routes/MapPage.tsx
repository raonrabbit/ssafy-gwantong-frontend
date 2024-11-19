import { Outlet } from "react-router-dom";
import MapComponent from "../components/pages/Map/MapComponent";

export default function MapPage() {
  return (
    <>
      <MapComponent />
      <Outlet />
    </>
  );
}
