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
  HStack,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";

import LeftHandSvg from "@assets/left-hand.svg";
import RightHandSvg from "@assets/right-hand.svg";

import { OnboardingNavigationRoutesProps } from "@routes/onboarding.routes";

import { OnboardingProgressIndicator } from "@components/OnboardingProgressIndicator";

export function OnboardingChooseLeftOrRight() {
  const { width } = Dimensions.get("window");

  const navigation = useNavigation<OnboardingNavigationRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

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
          onPress={handleGoBack}
        >
          <Text color="primary.200">Voltar</Text>
        </Button>

        <Center flex={1} px={6}>
          <Text
            fontSize={24}
            textAlign="center"
            color="primary.200"
            lineHeight={32}
          >
            Antes de iniciarmos, me responda
          </Text>

          <Text fontSize={32} textAlign="center" color="primary.100" mt={4}>
            Você é
          </Text>

          <HStack w="full" justifyContent="center" alignItems="center" mt={12}>
            <Button
              alignItems="center"
              bg="indigo.100"
              w={124}
              mr={2}
              shadow="9"
              _pressed={{ bg: "indigo.200" }}
            >
              <LeftHandSvg />

              <Text textAlign="center" color="primary.500" mt={2}>
                Canhoto
              </Text>
            </Button>

            <Text color="primary.100" fontSize={16}>
              ou
            </Text>

            <Button
              alignItems="center"
              bg="indigo.100"
              w={124}
              ml={2}
              shadow="9"
              _pressed={{ bg: "indigo.200" }}
            >
              <RightHandSvg />

              <Text textAlign="center" color="primary.500" mt={2}>
                Destro
              </Text>
            </Button>
          </HStack>
        </Center>

        <VStack w="full" minH={72}>
          <VStack
            w={width}
            flex={1}
            bg="primary.100"
            borderTopRadius={32}
            py={4}
            px={8}
          >
            <Text textAlign="center" color="gray.500" fontSize={14} mb={12}>
              Não se preocupe, pergunto isso apenas para configurar algumas
              coisas e você podera altera-las depois.
            </Text>

            <OnboardingProgressIndicator progressPosition={3} />

            <Button
              mt={8}
              ml="auto"
              w={12}
              h={12}
              p={0}
              rounded="full"
              variant="ghost"
            >
              Pular
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
