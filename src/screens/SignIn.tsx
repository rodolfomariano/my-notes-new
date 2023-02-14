import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";

import LogoSvg from "@assets/logo.svg";
import EllipsePng from "@assets/ellipse.png";

import { Input } from "@components/Input";
import { SubmitButton } from "@components/SubmitButton";
import { ButtonRecoverPassword } from "@components/ButtonRecoverPassword";

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center flex={1} bg="primary.100">
        <Center w="full" py={12} px={10} alignItems="center" zIndex={200}>
          <LogoSvg />

          <Text fontSize="sm" color="gray.500" mt={6}>
            Anote as coisas importantes do seu dia
          </Text>

          <Button
            w="full"
            bg="primary.50"
            borderWidth={1}
            borderColor="primary.500"
            mt={10}
            _pressed={{ bg: "primary.200" }}
            leftIcon={<Icon as={AntDesign} name="google" color="gray.500" />}
          >
            <Text fontFamily="body" color="gray.500">
              Entrar com google
            </Text>
          </Button>

          <Center w="full" mt={6} mb={2} position="relative">
            <Box w="full" h="1px" bg="gray.400" position="absolute" />

            <Center w={6} h={6} rounded="full" bg="primary.100">
              <Text color="gray.400">ou</Text>
            </Center>
          </Center>

          <VStack w="full" alignItems="center">
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
              returnKeyType="send"
              isRequired
            />

            <SubmitButton title="Entrar" mt={4} size="large" />

            <ButtonRecoverPassword />
          </VStack>

          <Center flexDirection="row" mt={6}>
            <Text color="gray.500" fontSize="sm" mr={2}>
              Não tem uma conta?
            </Text>

            <Button
              variant="link"
              px={0}
              py={0}
              _pressed={{ bg: "primary.200" }}
            >
              <Text color="primary.400" fontSize="xl" fontWeight="medium">
                Criar conta
              </Text>
            </Button>
          </Center>
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
