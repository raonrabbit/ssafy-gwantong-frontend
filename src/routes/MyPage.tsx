import { Box, useColorModeValue } from "@chakra-ui/react";
import MyPageComponent from "../components/pages/MyPage/MyPageComponent";

export default function MyPage() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Box bg={backgroundColor} mt={{ sm: "152px", md: "88px" }} minHeight={"100vh"}>
      <MyPageComponent />
    </Box>
  );
}
