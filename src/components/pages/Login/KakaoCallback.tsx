import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../../api/auth";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 code 파라미터 추출
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      // 백엔드에 인증 코드 전달
      kakaoLogin(code)
        .then((response) => {
          console.log("로그인 성공:", response);
          // JWT 저장 (예: localStorage)
          //   localStorage.setItem("token", response.data.token);
          // 로그인 성공 후 대시보드로 이동
          navigate("/");
        })
        .catch((error) => {
          console.error("로그인 실패:", error);
          // 로그인 실패 시 로그인 페이지로 이동
          navigate("/login");
        });
    } else {
      console.error("code 파라미터가 없습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
}
