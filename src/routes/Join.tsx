import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUserNinja, FaUserSecret } from "react-icons/fa";
import SocialLogin from "../components/pages/commons/SocialLogin";

export default function Join() {
  return (
    <Stack w={"100vw"} h={"100vh"} bg={"gray.100"} pt={"32"}>
      <Box w="full" maxW="md" mx="auto" mt={10} p={6} borderRadius="md" boxShadow="lg" bg="white">
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          회원가입
        </Text>
        {/* 회원가입 폼 시작 */}
        <Box
          as="form"
          onSubmit={() => {
            console.log("회원가입");
          }}
        >
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="아이디" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="비밀번호" type="password" autoComplete="off" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="이름" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="이메일" />
            </InputGroup>

            <Button type="submit" colorScheme="customOrange" w="full">
              회원가입
            </Button>
          </VStack>
        </Box>
        {/* 소셜 로그인 */}
        <SocialLogin />
      </Box>
    </Stack>
  );
}
