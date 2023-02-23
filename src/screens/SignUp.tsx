import { useNavigation } from "@react-navigation/native";

import {
  Button,
  Center,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Entypo } from "@expo/vector-icons";

import LogoSvg from "@assets/logo2.svg";
import EllipsePng from "@assets/ellipse.png";

import { Input } from "@components/Input";
import { SubmitButton } from "@components/SubmitButton";
import { StatusBar } from "react-native";

interface SignUpFormProps {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup
    .string()
    .required("Campo email, não pode estar vazio.")
    .email("Informe um email válido."),
  password: yup
    .string()
    .required("Cria uma senha.")
    .min(6, "A senha deve ter no minimo 6 caracteres."),
  passwordConfirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas não batem."),
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  function handleGoBackToSignIn() {
    navigation.goBack();
  }

  function handleSignUp(data: SignUpFormProps) {
    // console.log(data);

    reset();
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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Digite seu nome"
                  isRequired
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  isRequired
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Senha"
                  placeholder="Digite sua senha"
                  type="password"
                  isRequired
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Confirme a senha"
                  placeholder="Digite a senha novamente"
                  type="password"
                  returnKeyType="send"
                  isRequired
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.passwordConfirm?.message}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                />
              )}
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

            <SubmitButton
              title="Criar"
              mt={4}
              size="large"
              onPress={handleSubmit(handleSignUp)}
            />
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
