import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#",
    100: "#",
    200: "#",
    300: "#",
    400: "#",
    500: "#",
    600: "#",
    700: "#",
    800: "#",
    900: "#"
  }
};

const fonts = {
  body: "Atkinson Hyperlegible, system-ui, sans-serif",
  heading: "Atkinson Hyperlegible, system-ui, sans-serif",
  mono: "Menlo, monospace",
};

const theme = extendTheme({ 
  config, 
  /*colors,*/ 
  fonts, 
});

export default theme;