import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: {
      50: "#F3EFFC",
      100: "#FFE4F2",
      200: "#E1D8F6",
      400: "#A381EF",
      500: "#8862DB",
    },
  },
  fonts: {
    heading: "Nunito_700Bold",
    body: "Nunito_400Regular",
  },
  fontSizes: {},
});
