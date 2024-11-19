import { Box, useColorModeValue } from "@chakra-ui/react";
import BookmarkPageComponent from "../components/pages/BookmarkPage/BookmarkPageComponent";

export default function BookmarkPage() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Box bg={backgroundColor} mt={{ sm: "152px", md: "88px" }} minHeight={"100vh"}>
      <BookmarkPageComponent />
    </Box>
  );
}
