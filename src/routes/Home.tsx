import { Box, HStack, Image, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import PropertyList from "../components/pages/Home/PropertyList";
import NewsList from "../components/pages/Home/NewsList";
import Banner from "../components/pages/Home/Banner";
import NoticeList from "../components/pages/Home/NoticeList";
import axios from "axios";

export default function Home() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Box bg={backgroundColor} paddingTop="88px">
      <Banner></Banner>
      <PropertyList></PropertyList>
      <NewsList></NewsList>
      <NoticeList></NoticeList>
    </Box>
  );
}
