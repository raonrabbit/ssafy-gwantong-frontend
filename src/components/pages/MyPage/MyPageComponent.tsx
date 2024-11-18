import { Box, VStack } from "@chakra-ui/react";
import Profile from "./Profile";

export default function MyPageComponent() {
  return (
    <Box style={{ alignItems: "center" }} mt={{ sm: "152px", md: "88px" }}>
      <VStack>
        <Profile />
      </VStack>
    </Box>
  );
}
