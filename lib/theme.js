import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles = {
  global: props => ({
    body: {
      color: mode('#413e47', '#fbfaf8')(props), // text color (light mode, dark mode)
      bg: mode('#fbfaf8', '#171717')(props), // background color (light mode, dark mode)
    },
  }),
};

const colors = {
  theme: {
    primary: "#6495ED",
    primary2: "#4682B4",
    secondary: "",
    secondary2: "",
  },
  bg: {
    light: "#fbfaf8",
    light2: "#f5f5f5",
    dark: "#171717",
    dark2: "#242424"
  },
  text: {
    dark: "#413e47",
    light: "#fbfaf8",
    muted: "#848884"
  }
};

const fonts = {
  body: "Poppins, system-ui, sans-serif",
  heading: "Poppins, system-ui, sans-serif",
  mono: "Menlo, monospace",
};

const theme = extendTheme({ 
  config, 
  styles,
  colors,
  fonts, 
});

export default theme;