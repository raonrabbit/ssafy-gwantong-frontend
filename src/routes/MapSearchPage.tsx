import { useNavigate, useSearchParams } from "react-router-dom";
import MapSearch from "../components/pages/Map/MapSearch";

export default function MapSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("query") || "";

  const handleSelectApartment = (apartment: any) => {
    navigate(`/map/apt/${apartment.id}`);
  };

  return <MapSearch searchQuery={searchQuery} onSelectApartment={handleSelectApartment} />;
}
