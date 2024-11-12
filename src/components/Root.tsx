import { Box, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./pages/commons/Header";

export default function Root() {
  return (
    <Box>
      <Header></Header>
      <Outlet />
    </Box>
  );
}
