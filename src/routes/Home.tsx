import { Box, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import PropertyList from "../components/PropertyList";
import NewsList from "../components/NewsList";
import Banner from "../components/Banner";
import NoticeList from "../components/NoticeList";

export default function Home() {
  return (
    <Box bg={"gray.100"}>
      <Banner></Banner>
      <PropertyList></PropertyList>
      <NewsList></NewsList>
      <NoticeList></NoticeList>
    </Box>
  );
}
