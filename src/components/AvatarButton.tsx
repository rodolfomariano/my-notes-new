import { useEffect, useState } from "react";
import { Switch } from "react-native";

import {
  Avatar,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Popover,
  Text,
  VStack,
} from "native-base";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { AntDesign } from "@expo/vector-icons";

import UserPng from "@assets/user.png";

export function AvatarButton() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLeftHanded, setIsLeftHanded] = useState(false);

  async function toggleHand() {
    setIsLeftHanded(!isLeftHanded);
  }

  async function handleSignOut() {
    await auth().signOut();
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  });

  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <IconButton
            {...triggerProps}
            icon={
              user?.photoURL ? (
                <Avatar
                  source={{ uri: user?.photoURL }}
                  size="md"
                  bg="primary.100"
                />
              ) : (
                <Center w={8} h={8} bg="primary.100" rounded="full">
                  <Image
                    source={UserPng}
                    defaultSource={UserPng}
                    alt="Imagem de usuário"
                    size={4}
                  />
                </Center>
              )
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
            {user?.photoURL ? (
              <Avatar
                source={{ uri: user?.photoURL }}
                size="2xl"
                bg="primary.100"
              />
            ) : (
              <Center w={24} h={24} bg="primary.100" rounded="full">
                <Image
                  source={UserPng}
                  defaultSource={UserPng}
                  alt="Imagem de usuário"
                  size={10}
                />
              </Center>
            )}

            <Text fontFamily="heading" fontSize={16} mt={2} color="gray.700">
              {user?.displayName}
            </Text>

            <Text fontFamily="body" fontSize={12} color="gray.500">
              {user?.email}
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

            <Button
              w="full"
              variant="outline"
              colorScheme="danger"
              mt={32}
              onPress={handleSignOut}
            >
              Sair
            </Button>
          </VStack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
