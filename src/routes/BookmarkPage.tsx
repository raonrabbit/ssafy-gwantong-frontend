import { Box, useColorModeValue } from "@chakra-ui/react";
import BookmarkPageComponent from "../components/pages/BookmarkPage/BookmarkPageComponent";

export default function BookmarkPage() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Box bg={backgroundColor} pt={{ sm: "152px", md: "88px" }} height="fit-content">
      <BookmarkPageComponent />
    </Box>
  );
}
