import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  customOrange: {
    500: "#F37021", // 기본 색상
    600: "#D95E1D", // hover 시 색상
    700: "#C14F1B", // dark mode 기본 색상
    800: "#A34219", // dark mode hover 시 색상
  },
  black: "#1F1F1F", // 기본 black 색상 변경
};

const styles = {
  global: {
    ":root": {
      "--chakra-colors-chakra-body-text": "#1F1F1F",
    },
  },
};

const components = {
  Button: {
    variants: {
      outline: (props: any) => ({
        borderColor: props.colorMode === "dark" ? "customOrange.700" : "customOrange.500",
        color: props.colorMode === "dark" ? "customOrange.700" : "customOrange.500",
        _hover: {
          bg: props.colorMode === "dark" ? "customOrange.800" : "customOrange.500",
          color: "white",
        },
      }),
      primary: (props: any) => ({
        background: props.colorMode === "dark" ? "customOrange.700" : "customOrange.500",
        borderColor: props.colorMode === "dark" ? "customOrange.700" : "customOrange.500",
        color: props.colorMode === "dark" ? "white" : "white",
        _hover: {
          bg: props.colorMode === "dark" ? "customOrange.800" : "customOrange.600",
          color: "white",
        },
      }),
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  body: "Pretendard, sans-serif",
  heading: "Pretendard, sans-serif",
};

const theme = extendTheme({
  fonts,
  colors,
  config,
  components,
  styles,
});

export default theme;
