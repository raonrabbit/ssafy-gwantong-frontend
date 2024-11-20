import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { kakaoLogin } from "../../../api/auth";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 code 파라미터 추출
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    console.log(code);

    const localAxios = () => {
      const instance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        withCredentials: true, // 인증 정보 포함
      });
      return instance;
    };
    const API = localAxios();
    if (code) {
      API.post("/api/v1/auth/login/kakao", { code })
        .then((response: any) => {
          console.log("로그인 성공:", response.data);
          // JWT 저장 (예: localStorage)
          // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data?.accessToken}`;
          localStorage.setItem("token", response.data?.accessToken);
          // 로그인 성공 후 홈으로 이동
          navigate("/");
        })
        .catch((error) => {
          console.error("로그인 실패:", error.response?.data || error.message);
          navigate("/login");
        });
      // fetch("http://localhost:8080/api/v1/user", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     code: code,
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((result) => console.log(result));
    } else {
      console.error("code 파라미터가 없습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
}
