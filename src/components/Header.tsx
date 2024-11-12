import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);
  return (
    <Stack
      paddingY={5}
      // paddingX={{
      //   base: 10,
      //   lg: 40,
      // }}
      maxW={"1712px"}
      marginX={"auto"}
      alignItems={"center"}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      justifyContent={"space-between"}
    >
      <Link to={"/"}>
        <Box>
          <Image h={"12"} src="/images/logo.svg" />
        </Box>
      </Link>
      <HStack spacing={2} alignItems={"center"}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle Dark Mode"
          icon={<Icon />}
        />
        <Link to={"/login"}>
          <Button colorScheme={"customOrange"} variant={"outline"} borderRadius={"12px"}>
            로그인
          </Button>
        </Link>
        <Link to={"/join"}>
          <Button colorScheme={"customOrange"} variant={"primary"} borderRadius={"12px"}>
            회원가입
          </Button>
        </Link>
      </HStack>
    </Stack>
  );
}
