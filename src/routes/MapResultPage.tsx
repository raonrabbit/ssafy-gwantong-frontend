import { useParams } from "react-router-dom";
import MapResult from "../components/pages/Map/MapResult";

export default function MapResultPage() {
  const { id } = useParams<{ id: string }>();

  // id가 없을 경우 기본값 처리 또는 에러 페이지 렌더링
  if (!id) {
    return <div>아파트 ID가 제공되지 않았습니다.</div>;
  }

  return <MapResult apartmentId={id} />;
}
