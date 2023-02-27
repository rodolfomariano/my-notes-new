import { useEffect, useState } from "react";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { OnboardingAboutApp } from "@screens/OnboardingAboutApp";
import { OnboardingChooseLeftOrRight } from "@screens/OnboardingChooseLeftOrRight";
import { OnboardingWelcome } from "@screens/OnboardingWelcome";

import { Home } from "@screens/Home";
import { NoteDetails } from "@screens/NoteDetails";

import { Box } from "native-base";
import { StorageContextProvider } from "../contexts/storageContext";

import { isFirstAccess } from "@storage/firstAccess";

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
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isFirstAccessStorage, setIsFirstAccessStorage] = useState(null);

  const initialPage =
    isFirstAccessStorage === false ? "home" : "onBoardingWelcome";

  async function getAccess(userEmail: string) {
    if (userEmail) {
      return await isFirstAccess(userEmail);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    if (user?.email) {
      const firstAccess = getAccess(user.email);

      firstAccess.then((data) => setIsFirstAccessStorage(data));
    }

    return subscriber;
  }, [user]);

  return (
    <StorageContextProvider>
      <Box flex={1} bg="primary.100">
        {isFirstAccessStorage !== null && (
          <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialPage}
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
        )}
      </Box>
    </StorageContextProvider>
  );
}
