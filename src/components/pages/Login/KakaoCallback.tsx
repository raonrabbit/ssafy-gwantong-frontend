import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { kakaoLogin } from "../../../api/auth";
import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/slices/authSlice";
import { useToast } from "@chakra-ui/react";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    const handleKakaoLogin = async () => {
      if (!code) {
        toast({
          title: "로그인 실패",
          description: "code 파라미터가 없습니다. 다시 시도해주세요.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
        return;
      }

      try {
        // 1. 카카오 로그인 API 호출
        const loginResponse: any = await kakaoLogin(code);
        const accessToken = loginResponse?.accessToken;

        if (!accessToken) {
          toast({
            title: "로그인 실패",
            description: "액세스 토큰을 받을 수 없습니다. 다시 시도해주세요.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          navigate("/login");
          return;
        }

        // 2. 토큰으로 사용자 정보 요청
        const userResponse: any = await axios.get(
          `${process.env.REACT_APP_API_URI}/api/v1/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        const { email, nickname, profileImageUrl } = userResponse.data;

        // 3. Redux 상태 업데이트
        dispatch(
          login({
            user: { email, nickname, profileImageUrl },
            token: accessToken,
          })
        );

        // 4. 로컬 스토리지 저장 (선택적)
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(userResponse.data));

        // 성공 메시지
        toast({
          title: "로그인 성공",
          description: `${nickname}님, 환영합니다!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // 5. 홈으로 이동
        navigate("/");
      } catch (error) {
        toast({
          title: "로그인 실패",
          description: "로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      }
    };

    handleKakaoLogin();
  }, [dispatch, navigate, toast]);

  return <div>카카오 로그인 처리 중...</div>;
}
