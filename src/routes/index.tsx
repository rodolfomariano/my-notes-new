import { NavigationContainer } from "@react-navigation/native";

import { OnboardingRoutes } from "./onboarding.routes";
import { PublicRoutes } from "./public.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <OnboardingRoutes />
    </NavigationContainer>
  );
}
