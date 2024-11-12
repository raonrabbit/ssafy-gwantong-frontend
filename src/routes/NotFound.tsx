import { Heading, VStack, Text, Button, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "../components/pages/commons/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <VStack bg={"gray.100"} justifyContent={"center"} minH={"100vh"}>
        <Box>
          <Image h={"48"} src="/images/img_error.png" />
        </Box>
        <Heading mt={"5"}>찾으시는 페이지가 없습니다.</Heading>

        <Text>
          잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다.
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </Text>
        <Link to={"/"}>
          <Button colorScheme={"red"} variant={"solid"}>
            홈으로
          </Button>
        </Link>
      </VStack>
    </>
  );
}
