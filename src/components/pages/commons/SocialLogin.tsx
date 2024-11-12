import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";
import { SiNaver } from "react-icons/si";

export default function SocialLogin() {
  return (
    <Box marginBottom={4}>
      <HStack marginY={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button as={"a"} href="#" width={"100%"} leftIcon={<FaGithub />}>
          Github로 로그인
        </Button>
        <Button
          as={"a"}
          href={`#`}
          width={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Kakao로 로그인
        </Button>
        <Button
          as={"a"}
          href={`#`}
          width={"100%"}
          leftIcon={<SiNaver />}
          colorScheme={"green"}
        >
          Naver로 로그인
        </Button>
      </VStack>
    </Box>
  );
}
