import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const colors = {
  customOrange: {
    500: "#F37021",  // 기본 색상
    600: "#D95E1D",  // hover 시 색상
  },
};

const components = {
  Button: {
    variants: {
      outline: {
        borderColor: "customOrange.500",
        color: "customOrange.500",
        _hover: {
          bg: "customOrange.500",
          color: "white",
        },
      },
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
}

const theme = extendTheme({
  fonts, colors, config, components
});

export default theme;
