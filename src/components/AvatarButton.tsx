import {
  Avatar,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Popover,
  Text,
  VStack,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Switch } from "react-native";

export function AvatarButton() {
  const [isLeftHanded, setIsLeftHanded] = useState(false);

  async function toggleHand() {
    setIsLeftHanded(!isLeftHanded);
  }

  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <IconButton
            {...triggerProps}
            icon={
              <Avatar
                source={{ uri: "https://github.com/rodolfomariano.png" }}
                size="md"
                bg="primary.100"
              />
            }
            p={0}
            rounded="full"
            _pressed={{ opacity: 0.5 }}
          />
        );
      }}
    >
      <Popover.Content pt={8} px={4} pb={4} borderWidth={0}>
        <Popover.Arrow bg="primary.200" mt={8} />

        <Popover.CloseButton mt={8} mr={4} />

        <Popover.Body
          px={6}
          pt={8}
          pb={6}
          minW={72}
          bg="primary.200"
          rounded="md"
        >
          <VStack flex={1} alignItems="center">
            <Avatar
              source={{ uri: "https://github.com/rodolfomariano.png" }}
              size="2xl"
              bg="primary.100"
            />

            <Text fontFamily="heading" fontSize={16} mt={2} color="gray.700">
              Rodolfo Mariano de Souza
            </Text>

            <Text fontFamily="body" fontSize={12} color="gray.500">
              meuemail@gmail.com
            </Text>

            <HStack
              flex={1}
              px={2}
              rounded="md"
              borderWidth="1px"
              borderColor="gray.400"
              mt={12}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize={12} color="gray.500" mr={8}>
                Botão add nota
              </Text>

              <HStack alignItems="center">
                <Text fontSize={10} color="gray.500">
                  Esquerda
                </Text>

                <Switch
                  trackColor={{ false: "#e0f2fe", true: "#e0f2fe" }}
                  thumbColor={isLeftHanded ? "#bae6fd" : "#bae6fd"}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  onChange={toggleHand}
                  value={isLeftHanded}
                />

                <Text fontSize={10} color="gray.500">
                  Direita
                </Text>
              </HStack>

              <HStack
                bg="primary.200"
                px={1}
                position="absolute"
                top={-10}
                left={2}
                space={1}
                alignItems="center"
              >
                <Icon as={AntDesign} name="layout" color="gray.400" size={4} />

                <Text fontSize={10} color="gray.400">
                  Layout
                </Text>
              </HStack>
            </HStack>

            <Button w="full" variant="outline" colorScheme="danger" mt={32}>
              Sair
            </Button>
          </VStack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
