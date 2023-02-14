import { Dimensions } from "react-native";

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

import ButtonDesignSvg from "@assets/button-design.svg";
import GirlWriting from "@assets/girl-writing.svg";

import { OnboardingProgressIndicator } from "@components/OnboardingProgressIndicator";

export function OnboardingAboutApp() {
  const { width } = Dimensions.get("window");

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <VStack flex={1} bg="primary.400" pt={24}>
        <Button
          position="absolute"
          top={16}
          left={5}
          variant="ghost"
          leftIcon={
            <Icon as={AntDesign} name="arrowleft" color="primary.200" />
          }
        >
          <Text color="primary.200">Voltar</Text>
        </Button>

        <Box flex={1} alignItems="center">
          <GirlWriting />
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
            <Text textAlign="center" color="gray.500" fontSize={20} mb={12}>
              Registre as coisa importantes, do seu dia
            </Text>

            <OnboardingProgressIndicator progressPosition={2} />

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
              />
            </Center>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
