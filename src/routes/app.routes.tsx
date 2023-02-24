import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { OnboardingAboutApp } from "@screens/OnboardingAboutApp";
import { OnboardingChooseLeftOrRight } from "@screens/OnboardingChooseLeftOrRight";
import { OnboardingWelcome } from "@screens/OnboardingWelcome";

import { Home } from "@screens/Home";
import { NoteDetails } from "@screens/NoteDetails";

import { Box } from "native-base";

type AppRoutesProps = {
  onBoardingWelcome: undefined;
  onBoardingAboutApp: undefined;
  onboardingChooseLeftOrRight: undefined;
  home: undefined;
  noteDetail: {
    id: string;
  };
};

export type AppRoutesNavigationProps =
  NativeStackNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesProps>();

export function AppRoutes() {
  return (
    <Box flex={1} bg="primary.100">
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="onBoardingWelcome"
      >
        <Screen name="onBoardingWelcome" component={OnboardingWelcome} />

        <Screen name="onBoardingAboutApp" component={OnboardingAboutApp} />

        <Screen
          name="onboardingChooseLeftOrRight"
          component={OnboardingChooseLeftOrRight}
        />

        <Screen name="home" component={Home} />

        <Screen name="noteDetail" component={NoteDetails} />
      </Navigator>
    </Box>
  );
}
