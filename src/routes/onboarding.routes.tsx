import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { OnboardingAboutApp } from "@screens/OnboardingAboutApp";
import { OnboardingChooseLeftOrRight } from "@screens/OnboardingChooseLeftOrRight";
import { OnboardingWelcome } from "@screens/OnboardingWelcome";
import { Box } from "native-base";

type OnboardingRoutesProps = {
  onBoardingWelcome: undefined;
  onBoardingAboutApp: undefined;
  onboardingChooseLeftOrRight: undefined;
};

export type OnboardingNavigationRoutesProps =
  NativeStackNavigationProp<OnboardingRoutesProps>;

const { Navigator, Screen } =
  createNativeStackNavigator<OnboardingRoutesProps>();

export function OnboardingRoutes() {
  return (
    <Box flex={1} bg="primary.400">
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="onBoardingWelcome" component={OnboardingWelcome} />

        <Screen name="onBoardingAboutApp" component={OnboardingAboutApp} />

        <Screen
          name="onboardingChooseLeftOrRight"
          component={OnboardingChooseLeftOrRight}
        />
      </Navigator>
    </Box>
  );
}
