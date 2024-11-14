import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Stack,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const logoSrc = useColorModeValue("/images/logo-light.svg", "/images/logo-dark.svg");
  const logoSymbolSrc = "/images/symbol.svg";
  const responsiveLogoSrc = useBreakpointValue({
    base: logoSymbolSrc,
    sm: logoSrc,
  });
  const Icon = useColorModeValue(FaMoon, FaSun);
  const headerColor = useColorModeValue("rgba(255, 255, 255, 0.7)", "rgba(26, 32, 44, 0.7)");
  return (
    <Box
      bgColor={headerColor}
      w={"100vw"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="sticky"
      backdropFilter="blur(10px)"
    >
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
            <Image h={"12"} src={responsiveLogoSrc} />
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
    </Box>
  );
}
