import React from "react";

import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import { THEME } from "@theme/index";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {!fontsLoaded ? <></> : <SignUp />}
    </NativeBaseProvider>
  );
}
