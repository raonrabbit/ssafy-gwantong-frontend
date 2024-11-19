import { Box, VStack, useColorModeValue } from "@chakra-ui/react";
import Profile from "./Profile";
import ApartmentBookmark from "./ApartmentBookmark";
import DealBookmark from "./DealBookmark";
import Bookmark from "./Bookmark";

export default function MyPageComponent() {
  return (
    <Box style={{ alignItems: "center" }} pt="40px" pb="60px">
      <VStack spacing="40px">
        <Profile />
        <Bookmark />
        {/* <ApartmentBookmark /> */}
        {/* <DealBookmark /> */}
      </VStack>
    </Box>
  );
}
