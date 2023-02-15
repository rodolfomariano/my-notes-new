import { StatusBar } from "react-native";
import { VStack } from "native-base";
import { Header } from "@components/Header";

export function Home() {
  return (
    <VStack flex={1} bg="primary.100">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header />
    </VStack>
  );
}
