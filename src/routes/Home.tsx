import { Box, HStack, Image, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import PropertyList from "../components/PropertyList";
import NewsList from "../components/NewsList";
import Banner from "../components/Banner";
import NoticeList from "../components/NoticeList";

export default function Home() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Box bg={backgroundColor}>
      <Banner></Banner>
      <PropertyList></PropertyList>
      <NewsList></NewsList>
      <NoticeList></NoticeList>
    </Box>
  );
}
