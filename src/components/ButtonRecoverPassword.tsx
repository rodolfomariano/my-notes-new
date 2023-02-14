import {
  Button,
  Text,
  IButtonProps,
  Popover,
  Heading,
  VStack,
} from "native-base";
import { Dimensions } from "react-native";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";

interface ButtonRecoverPassword extends IButtonProps {}

export function ButtonRecoverPassword({ ...rest }: ButtonRecoverPassword) {
  const { width } = Dimensions.get("window");

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
          _pressed={{ bg: "primary.200" }}
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
          <Input
            label="Email"
            placeholder="Digite seu email"
            returnKeyType="send"
            keyboardType="email-address"
            autoCapitalize="none"
            isRequired
          />

          <SubmitButton title="Recuperar" size="medium" />
        </VStack>
      </Popover.Content>
    </Popover>
  );
}
