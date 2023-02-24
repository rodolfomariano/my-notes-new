import { NavigationContainer } from "@react-navigation/native";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { OnboardingRoutes } from "./onboarding.routes";
import { PublicRoutes } from "./public.routes";
import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";

export function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  });

  return (
    <NavigationContainer>
      {!user ? <PublicRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
}
