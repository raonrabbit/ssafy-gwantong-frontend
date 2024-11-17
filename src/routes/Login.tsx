import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks"; // Redux Dispatch Hook
import { login as loginAction } from "../redux/slices/authSlice"; // Redux Slice Action
import { login as loginApi } from "../api/auth"; // API 호출 함수
import { LoginApiResponse } from "../types/api";
import SocialLogin from "../components/pages/commons/SocialLogin";

export default function Login() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const loginBoxColor = useColorModeValue("white", "gray.700");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // Redux Dispatch Hook 사용

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response: LoginApiResponse = await loginApi(email, password); // API 호출
      if (response.success && response.data) {
        toast({
          title: "로그인 성공",
          description: `환영합니다, ${response.data.user?.nickname || "사용자"}님!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // JWT 토큰과 사용자 정보를 localStorage에 저장
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redux 상태 업데이트
        if (response.data.user) {
          dispatch(
            loginAction({
              user: response.data.user,
              token: response.data.token,
            })
          );
        }
        // 로그인 후 리다이렉트
        navigate("/");
      } else {
        toast({
          title: "로그인 실패",
          description: response.error || "이메일 또는 비밀번호를 확인해주세요.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "에러 발생",
        description: "로그인 중 문제가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack w={"100vw"} h={"100vh"} bg={backgroundColor} pt={"80"}>
      <Box
        w="full"
        maxW="md"
        mx="auto"
        mt={10}
        p={6}
        borderRadius="md"
        boxShadow="lg"
        bg={loginBoxColor}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          로그인
        </Text>
        {/* Form 시작 */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                variant="filled"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                variant="filled"
                placeholder="비밀번호"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <Button
              type="submit"
              colorScheme="customOrange"
              w="full"
              variant={"primary"}
              isLoading={loading}
            >
              로그인
            </Button>
          </VStack>
        </Box>
        {/* 소셜 로그인 */}
        <SocialLogin />
      </Box>
    </Stack>
  );
}
