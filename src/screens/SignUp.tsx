import {
  Button,
  Center,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";

import LogoSvg from "@assets/logo2.svg";
import EllipsePng from "@assets/ellipse.png";

import { Input } from "@components/Input";
import { SubmitButton } from "@components/SubmitButton";

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBackToSignIn() {
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center flex={1} bg="primary.100">
        <Center w="full" py={12} px={10} alignItems="center" zIndex={200}>
          <LogoSvg />

          <Button
            leftIcon={
              <Icon as={Entypo} name="chevron-thin-left" color="primary.400" />
            }
            variant="ghost"
            p={0}
            my={6}
            mr="auto"
            onPress={handleGoBackToSignIn}
          >
            <Text color="primary.400">Fazer login</Text>
          </Button>

          <VStack w="full" alignItems="center">
            <Input label="Nome" placeholder="Digite seu nome" isRequired />

            <Input
              label="Email"
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              isRequired
            />

            <Input
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              isRequired
            />

            <Input
              label="Confirme a senha"
              placeholder="Digite a senha novamente"
              type="password"
              returnKeyType="send"
              isRequired
            />

            <Center flexDirection="row" flexWrap="wrap" py={2}>
              <Text color="gray.500" fontSize="xs">
                Ao se registrar, você aceita nossos
              </Text>

              <Button variant="ghost" p={0} mx={1}>
                <Text color="primary.400" fontSize="xs">
                  termos de uso
                </Text>
              </Button>

              <Text color="gray.500" fontSize="xs">
                e a nossa
              </Text>

              <Button variant="ghost" p={0} mx={1}>
                <Text color="primary.400" fontSize="xs">
                  política de privacidade
                </Text>
              </Button>
            </Center>

            <SubmitButton title="Criar" mt={4} size="large" />
          </VStack>
        </Center>

        <Image
          source={EllipsePng}
          defaultSource={EllipsePng}
          alt="Imagem de uma elipse"
          position="absolute"
          resizeMode="contain"
          bottom={-9}
        />
      </Center>
    </ScrollView>
  );
}
