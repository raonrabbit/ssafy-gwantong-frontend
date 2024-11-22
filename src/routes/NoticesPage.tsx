import { Box, useColorModeValue } from "@chakra-ui/react";
import NoticeList from "../components/pages/Notice/NoticeList";

export default function NoticesPage() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Box h="100vh" paddingTop={"88px"} bg={backgroundColor}>
      <NoticeList />
    </Box>
  );
}
