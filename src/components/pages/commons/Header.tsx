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
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"; // Redux Hooks
import { logout } from "../../../redux/slices/authSlice"; // Redux logout action

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useAppSelector((state) => state.auth.user); // Redux 상태에서 사용자 정보 가져오기
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoSrc = useColorModeValue("/images/logo-light.svg", "/images/logo-dark.svg");
  const logoSymbolSrc = "/images/symbol.svg";
  const responsiveLogoSrc = useBreakpointValue({
    base: logoSymbolSrc,
    sm: logoSrc,
  });
  const Icon = useColorModeValue(FaMoon, FaSun);
  const headerColor = useColorModeValue("rgba(255, 255, 255, 0.7)", "rgba(26, 32, 44, 0.7)");

  const handleLogout = () => {
    // localStorage에서 토큰 및 사용자 정보 제거
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redux 상태 초기화
    dispatch(logout());
  };

  const navigateToMyPage = () => {
    navigate("/mypage");
  };

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
          {user ? ( // Redux 상태에서 user가 존재하면 Avatar와 로그아웃 메뉴를 표시
            <Menu>
              <MenuButton>
                <Avatar name={user.nickname} src={user.avatarUrl || undefined} cursor="pointer" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={navigateToMyPage}>마이페이지</MenuItem>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
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
            </>
          )}
        </HStack>
      </Stack>
    </Box>
  );
}
