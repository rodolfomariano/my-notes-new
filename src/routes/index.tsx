import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";

import { OnboardingRoutes } from "./onboarding.routes";
import { PublicRoutes } from "./public.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
