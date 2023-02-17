import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  ScrollView,
  VStack,
  StatusBar,
  Box,
  Button,
  Center,
  IconButton,
  Icon,
  Heading,
  Text,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";

import WelcomeImageSvg from "@assets/welcome-image.svg";
import ButtonDesignSvg from "@assets/button-design.svg";

import { OnboardingProgressIndicator } from "@components/OnboardingProgressIndicator";
import { OnboardingNavigationRoutesProps } from "@routes/onboarding.routes";

export function OnboardingWelcome() {
  const { width } = Dimensions.get("window");

  const navigation = useNavigation<OnboardingNavigationRoutesProps>();

  function handleNextOnboardingScreen() {
    navigation.navigate("onBoardingAboutApp");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <VStack flex={1} bg="primary.400" pt={24}>
        <Box flex={1}>
          <WelcomeImageSvg />
        </Box>

        <VStack w="full" minH={72}>
          <VStack
            w={width - 8}
            flex={1}
            bg="primary.100"
            borderTopRadius={32}
            py={4}
            px={8}
          >
            <Text
              textAlign="center"
              fontFamily="heading"
              fontSize={24}
              color="gray.600"
            >
              Bem vindo(a)
            </Text>

            <Text textAlign="center" color="gray.500" fontSize={16} mb={12}>
              É muito bom te ter aqui!
            </Text>

            <OnboardingProgressIndicator progressPosition={1} />

            <Button mt={8} w={12} h={12} p={0} rounded="full" variant="ghost">
              Pular
            </Button>

            <Center position="absolute" bottom={0} right={-7}>
              <ButtonDesignSvg />

              <IconButton
                icon={
                  <Icon
                    as={AntDesign}
                    name="arrowright"
                    color="primary.100"
                    size={8}
                  />
                }
                position="absolute"
                w={16}
                h={16}
                rounded="full"
                onPress={handleNextOnboardingScreen}
              />
            </Center>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
