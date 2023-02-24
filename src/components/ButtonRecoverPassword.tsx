import { useState } from "react";
import { Alert, Dimensions } from "react-native";

import {
  Button,
  Text,
  IButtonProps,
  Popover,
  Heading,
  VStack,
} from "native-base";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "@react-native-firebase/auth";

import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { Controller, useForm } from "react-hook-form";

interface RecoverPasswordForm {
  email: string;
}

interface ButtonRecoverPassword extends IButtonProps {}

const recoverPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Campo email, não pode estar vazio.")
    .email("Informe um email válido."),
});

export function ButtonRecoverPassword({ ...rest }: ButtonRecoverPassword) {
  const [isLoading, setIsLoading] = useState(false);

  const { width } = Dimensions.get("window");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecoverPasswordForm>({
    resolver: yupResolver(recoverPasswordSchema),
  });

  async function handleRecoverPassword(data: RecoverPasswordForm) {
    setIsLoading(true);

    await auth()
      .sendPasswordResetEmail(data.email)
      .then(() => Alert.alert("Email de recuperação enviado"))
      .catch((error) => console.log(error))
      .finally(() => {
        reset();
        setIsLoading(false);
      });
  }

  return (
    <Popover
      placement="top"
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          variant="link"
          py={2}
          w={32}
          {...rest}
          _pressed={{ bg: "primary.100" }}
        >
          <Text color="gray.400" fontSize="xs">
            Esqueci a senha
          </Text>
        </Button>
      )}
    >
      <Popover.Content w={width - 80} bg="primary.200" pb={6}>
        <Popover.Arrow bg="primary.200" />

        <Heading
          fontSize="lg"
          mb={2}
          py={4}
          px={4}
          color="gray.500"
          borderBottomWidth="1px"
          borderBottomColor="gray.400"
        >
          Recuperar senha
        </Heading>

        <VStack px={4}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                placeholder="Digite seu email"
                returnKeyType="send"
                keyboardType="email-address"
                autoCapitalize="none"
                isRequired
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <SubmitButton
            title="Recuperar"
            size="medium"
            onPress={handleSubmit(handleRecoverPassword)}
          />
        </VStack>
      </Popover.Content>
    </Popover>
  );
}
