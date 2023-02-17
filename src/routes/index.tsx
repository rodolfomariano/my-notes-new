import { NavigationContainer } from "@react-navigation/native";

import { OnboardingRoutes } from "./onboarding.routes";
import { PublicRoutes } from "./public.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <PublicRoutes />
    </NavigationContainer>
  );
}
