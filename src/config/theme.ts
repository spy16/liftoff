import {
  extendTheme,
  ThemeConfig,
  theme as base,
  withDefaultVariant,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export default extendTheme(
  {
    config,
    colors: {
      // dark mode colors
      d: {},
      // light mode colors
      l: {},
    },
    fonts: {
      heading: `Circular Std Bold, ${base.fonts?.heading}`,
      body: `Circular Std Book, ${base.fonts?.body}`,
    },
  },
  withDefaultVariant({
    variant: "ghost",
    components: ["Button", "IconButton"],
  })
);
