import { Box, Stack, Text, VStack, useColorModeValue, useToast } from "@chakra-ui/react";

import SocialLogin from "../components/pages/commons/SocialLogin";

export default function Login() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const loginBoxColor = useColorModeValue("white", "gray.700");

  return (
    <Stack w={"100vw"} h={"100vh"} bg={backgroundColor} pt={"40"}>
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
        <VStack mb={6}>
          <Text fontSize={24}>간편하게 로그인하고</Text>
          <Text fontSize={24} fontWeight={"bold"}>
            편리한 기능을 사용해보세요.
          </Text>
        </VStack>
        {/* 소셜 로그인 */}
        <SocialLogin />
      </Box>
    </Stack>
  );
}
