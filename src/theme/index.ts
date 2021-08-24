// using chakra convention for customizing its theme
// ref: https://chakra-ui.com/docs/theming/customize-theme#scaling-out-your-project

import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import Container from "./components/container";
import Button from "./components/button";

const overrides: ThemeOverride = {
  styles: {
    global: {
      body: {
        bg: "gray.50",
        fontFamily: "proxima-soft, sans-serif",

      }
    }
  },
  direction: "ltr",
  colors: {
    gray: {
      50: "#F5F5F5", //bg color
    },
    blue: {
      500: "#0078D4", //primary
    },
  },
  components: {
    Container,
    Button
  },
};

export default extendTheme(overrides);
