import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { NoteDetails } from "@screens/NoteDetails";
import { Box } from "native-base";

type AppRoutesProps = {
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
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="home" component={Home} />

        <Screen name="noteDetail" component={NoteDetails} />
      </Navigator>
    </Box>
  );
}
