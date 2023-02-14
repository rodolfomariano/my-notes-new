import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingAboutApp } from "@screens/OnboardingAboutApp";
import { OnboardingWelcome } from "@screens/OnboardingWelcome";

const { Navigator, Screen } = createNativeStackNavigator();

export function OnboardingRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="onBoardingAboutApp"
    >
      <Screen name="onBoardingWelcome" component={OnboardingWelcome} />

      <Screen name="onBoardingAboutApp" component={OnboardingAboutApp} />
    </Navigator>
  );
}
