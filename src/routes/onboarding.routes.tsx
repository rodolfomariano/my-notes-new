import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingWelcome } from "@screens/OnboardingWelcome";

const { Navigator, Screen } = createNativeStackNavigator();

export function OnboardingRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="onBoardingWelcome" component={OnboardingWelcome} />
    </Navigator>
  );
}
