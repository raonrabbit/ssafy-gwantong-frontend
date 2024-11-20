import { Box, HStack, Image, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import PropertyList from "../components/pages/Home/PropertyList";
import NewsList from "../components/pages/Home/NewsList";
import Banner from "../components/pages/Home/Banner";
import NoticeList from "../components/pages/Home/NoticeList";
import axios from "axios";

export default function Home() {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  console.log(localStorage.getItem("token"));
  axios
    .get("http://localhost:8080/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰 추가
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data); // 응답 데이터 처리
    })
    .catch((error) => {
      console.error("Error fetching profile image:", error);
    });
  // axios
  //   .get("http://localhost:8080/api/v1/user/profile")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  return (
    <Box bg={backgroundColor} paddingTop="88px">
      <Banner></Banner>
      <PropertyList></PropertyList>
      <NewsList></NewsList>
      <NoticeList></NoticeList>
    </Box>
  );
}
