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
  errorMessage?: string;
  isRequired?: boolean;
}

export function Input({
  type = "text",
  label,
  placeholder,
  errorMessage,
  isRequired = false,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <FormControl mb={2} isRequired={isRequired}>
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

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
