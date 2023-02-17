import { useState } from "react";

import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Text,
  Icon,
  Button,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

interface InputProps extends IInputProps {
  type?: "text" | "password";
  label: string;
  placeholder: string;
  errorMessage?: string | null;
  isRequired?: boolean;
}

export function Input({
  type = "text",
  label,
  placeholder,
  errorMessage = null,
  isRequired = false,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isErrorMessage = !!errorMessage;

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <FormControl mb={2} isRequired={isRequired} isInvalid={isErrorMessage}>
      <FormControl.Label h={4}>
        <Text fontSize="2xs" color="gray.400">
          {label}
        </Text>
      </FormControl.Label>

      <NativeBaseInput
        h={12}
        fontSize="sm"
        borderColor="primary.500"
        rounded="md"
        fontFamily="body"
        placeholderTextColor="gray.400"
        placeholder={placeholder}
        isInvalid={isErrorMessage}
        _invalid={{ borderColor: "red.500" }}
        _focus={{ borderColor: "primary.400", borderWidth: 2 }}
        secureTextEntry={
          type === "password" && showPassword === false ? true : false
        }
        InputRightElement={
          type === "password" ? (
            <Button
              h="full"
              bg="rgba(243, 239, 252, 04)"
              _pressed={{ bg: "primary.100" }}
              onPress={handleShowPassword}
            >
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                color="muted.400"
              />
            </Button>
          ) : (
            <></>
          )
        }
        style={{ backgroundColor: "rgba(243, 239, 252, 04)" }}
        {...rest}
      />

      <FormControl.ErrorMessage ml="auto" position="absolute" right={0}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
