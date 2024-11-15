import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUserNinja, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { register, sendVerificationCode, verifyCode } from "../api/auth";
import SocialLogin from "../components/pages/commons/SocialLogin";

export default function Join() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const toast = useToast();

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(value.trim() === "" ? null : validateEmail(value));
  };

  const handleSendCode = async () => {
    try {
      await sendVerificationCode(email);
      setIsCodeSent(true);
      toast({
        title: "인증번호가 전송되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "인증번호 전송 실패",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode(email, verificationCode);
      if (response.success) {
        setIsCodeVerified(true);
        toast({
          title: "인증번호 확인 성공",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      setIsCodeVerified(false);
      toast({
        title: "인증번호 확인 실패",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(value.trim() === "" ? null : value.length >= 6);
    setIsPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsPasswordMatch(password === value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameValid(value.trim() === "" ? null : value.length >= 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCodeVerified) {
      toast({
        title: "인증번호를 확인해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isEmailValid === false) {
      toast({
        title: "이메일 형식이 유효하지 않습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isPasswordValid === false || isPasswordMatch === false) {
      toast({
        title: "비밀번호가 유효하지 않거나 일치하지 않습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isNicknameValid === false) {
      toast({
        title: "닉네임은 2글자 이상이어야 합니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const data = await register({ email, password, nickname });
      toast({
        title: "회원가입 성공!",
        description: "환영합니다!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "회원가입 실패",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack w={"100vw"} h={"100vh"} bg={"gray.100"} pt={"80"}>
      <Box w="full" maxW="md" mx="auto" mt={10} p={6} borderRadius="md" boxShadow="lg" bg="white">
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          회원가입
        </Text>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* 이메일 입력 */}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
                borderColor={
                  isEmailValid === null ? "gray.300" : isEmailValid ? "blue.400" : "red.400"
                }
                _focus={{
                  borderColor:
                    isEmailValid === null ? "gray.300" : isEmailValid ? "blue.500" : "red.500",
                }}
              />
              <Button
                size="sm"
                colorScheme="blue"
                onClick={handleSendCode}
                isDisabled={!isEmailValid || isCodeSent}
                ml={2}
                h={10}
              >
                인증번호 전송
              </Button>
            </InputGroup>

            {/* 인증번호 입력 */}
            {isCodeSent && (
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color={"gray.500"}>
                      <FaCheckCircle />
                    </Box>
                  }
                />
                <Input
                  variant={"filled"}
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  borderColor={
                    isCodeVerified === null ? "gray.300" : isCodeVerified ? "blue.400" : "red.400"
                  }
                  _focus={{
                    borderColor:
                      isCodeVerified === null
                        ? "gray.300"
                        : isCodeVerified
                        ? "blue.500"
                        : "red.500",
                  }}
                />
                <Button size="sm" colorScheme="green" onClick={handleVerifyCode} ml={2}>
                  인증번호 확인
                </Button>
              </InputGroup>
            )}

            {/* 비밀번호 입력 */}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="비밀번호 (6자 이상)"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                borderColor={
                  isPasswordValid === null ? "gray.300" : isPasswordValid ? "blue.400" : "red.400"
                }
                _focus={{
                  borderColor:
                    isPasswordValid === null
                      ? "gray.300"
                      : isPasswordValid
                      ? "blue.500"
                      : "red.500",
                }}
              />
            </InputGroup>

            {/* 비밀번호 확인 */}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                borderColor={
                  isPasswordMatch === null ? "gray.300" : isPasswordMatch ? "blue.400" : "red.400"
                }
                _focus={{
                  borderColor:
                    isPasswordMatch === null
                      ? "gray.300"
                      : isPasswordMatch
                      ? "blue.500"
                      : "red.500",
                }}
              />
            </InputGroup>

            {/* 닉네임 입력 */}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="닉네임 (2글자 이상)"
                value={nickname}
                onChange={handleNicknameChange}
                borderColor={
                  isNicknameValid === null ? "gray.300" : isNicknameValid ? "blue.400" : "red.400"
                }
                _focus={{
                  borderColor:
                    isNicknameValid === null
                      ? "gray.300"
                      : isNicknameValid
                      ? "blue.500"
                      : "red.500",
                }}
              />
            </InputGroup>

            <Button type="submit" colorScheme="customOrange" w="full" isDisabled={!isCodeVerified}>
              회원가입
            </Button>
          </VStack>
        </Box>
        <SocialLogin />
      </Box>
    </Stack>
  );
}
