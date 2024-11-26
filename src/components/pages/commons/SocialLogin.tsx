import { Box, Button, VStack } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";

export default function SocialLogin() {
  const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  return (
    <Box>
      <VStack>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`}
          width={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Kakao로 로그인
        </Button>
      </VStack>
    </Box>
  );
}
