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
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "../components/pages/commons/SocialLogin";

export default function Login() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const loginBoxColor = useColorModeValue("white", "gray.700");
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
        <Box as="form">
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input variant="filled" placeholder="이메일" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input variant="filled" placeholder="비밀번호" type="password" autoComplete="off" />
            </InputGroup>

            <Button type="submit" colorScheme="customOrange" w="full" variant={"primary"}>
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
