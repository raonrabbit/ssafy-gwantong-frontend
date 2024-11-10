import { Box, Button, HStack, Image, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Stack
      paddingY={5}
      paddingX={{
        base: 10,
        lg: 40,
      }}
      alignItems={"center"}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
      justifyContent={"space-between"}
    >
      <Link to={"/"}>
        <Box>
          <Image h={"12"} src="/images/logo.svg" />
        </Box>
      </Link>
      <HStack alignItems={"center"}>
        <Link to={"/login"}>
          <Button colorScheme={"teal"}>로그인</Button>
        </Link>
        <Link to={"/join"}>
          <Button colorScheme={"red"}>회원가입</Button>
        </Link>
      </HStack>
    </Stack>
  );
}
