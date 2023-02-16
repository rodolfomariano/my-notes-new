import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  AlertDialog,
  Button,
  FormControl,
  HStack,
  Icon,
  Modal,
  Radio,
  ScrollView,
  Stack,
  Text,
  TextArea,
  VStack,
} from "native-base";

import { AntDesign, Feather } from "@expo/vector-icons";

import { formatFullDate } from "@utils/formatDates";

import { Header } from "@components/Header";
import { Input } from "@components/Input";

interface RouteProps {
  id: string;
}

export function NoteDetails() {
  const [showModalEditNote, setShowModalEditNote] = useState(false);
  const [showAlertRemoveNote, setShowAlertRemoveNote] = useState(false);
  const [radioSelected, seRadioSelected] = useState("regular");

  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params as RouteProps;

  const onCloseAlert = () => setShowAlertRemoveNote(false);

  const cancelRef = useRef(null);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <>
      <VStack flex={1} bg="primary.100" pb={8}>
        <Header />

        <VStack flex={1} mt={6} px={6} mb={8}>
          <Button
            variant="ghost"
            mr="auto"
            px={0}
            leftIcon={
              <Icon as={AntDesign} name="arrowleft" color="primary.400" />
            }
            onPress={handleGoBack}
          >
            <Text color="primary.400">Voltar</Text>
          </Button>

          <Text textAlign="center" mt={8} fontSize={16} color="gray.500">
            {formatFullDate(new Date())}
          </Text>

          <Text
            mt={4}
            fontSize={24}
            color="primary.400"
            textAlign="center"
            lineHeight={30}
          >
            Fui bem na entrevista de emprego
          </Text>

          <Text mt={16} mb={6} fontSize={16} color="gray.600">
            Descrição
          </Text>

          <ScrollView>
            <Text fontSize="sm" color="gray.500">
              Todos nós já nos sentimos nervosos depois de sair de uma
              entrevista de emprego ou de estágio, especialmente nas situações
              em que a resposta sobre a candidatura demora vários dias ou até
              semanas para chegar. Provavelmente, você já se perguntou “quais
              são os sinais de que passei na entrevista?”. Afinal, se você os
              conhecer, pode ir mais relaxado. Todos nós já nos sentimos
              nervosos depois de sair de uma entrevista de emprego ou de
              estágio, especialmente nas situações em que a resposta sobre a
              candidatura demora vários dias ou até semanas para chegar.
              Provavelmente, você já se perguntou “quais são os sinais de que
              passei na entrevista?”. Afinal, se você os conhecer, pode ir mais
              relaxado. Todos nós já nos sentimos nervosos depois de sair de uma
              entrevista de emprego ou de estágio, especialmente nas situações
              em que a resposta sobre a candidatura demora vários dias ou até
              semanas para chegar. Provavelmente, você já se perguntou “quais
              são os sinais de que passei na entrevista?”. Afinal, se você os
              conhecer, pode ir mais relaxado.
            </Text>
          </ScrollView>
        </VStack>

        <HStack px={6}>
          <Button
            bg="indigo.300"
            w="50%"
            mr={2}
            _pressed={{ bg: "indigo.400" }}
            leftIcon={<Icon as={Feather} name="edit-2" size={3} />}
            onPress={() => setShowModalEditNote(true)}
          >
            Editar
          </Button>
          <Button
            bg="danger.300"
            w="50%"
            _pressed={{ bg: "danger.400" }}
            leftIcon={<Icon as={Feather} name="trash" size={3} />}
            onPress={() => setShowAlertRemoveNote(true)}
          >
            Remover
          </Button>
        </HStack>
      </VStack>

      <Modal
        isOpen={showModalEditNote}
        onClose={() => setShowModalEditNote(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />

          <Modal.Header mt={3}>
            <Text color="gray.400" fontSize="xs">
              Editar
            </Text>
          </Modal.Header>

          <Modal.Body>
            <FormControl>
              <Input
                label="Titulo"
                placeholder="Digite um titulo para a nota"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text fontSize="2xs" color="gray.400">
                  Descrição
                </Text>
              </FormControl.Label>
              <TextArea
                h={20}
                w="full"
                placeholder="Digite a sua anotação"
                autoCompleteType
                size="xs"
                fontSize="sm"
                borderColor="primary.500"
                rounded="md"
                fontFamily="body"
                placeholderTextColor="gray.400"
                style={{
                  backgroundColor: "rgba(243, 239, 252, 04)",
                }}
                _focus={{ borderColor: "primary.400", borderWidth: 2 }}
              />
            </FormControl>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={radioSelected}
              onChange={(nextValue) => {
                seRadioSelected(nextValue);
              }}
            >
              <Text color="gray.500" mt={4}>
                Como foi essa esperiencia?
              </Text>
              <Stack
                direction={{
                  base: "row",
                  md: "row",
                }}
                alignItems={{
                  base: "flex-start",
                  md: "center",
                }}
                space={1}
                w="75%"
                maxW="300px"
                mt={1}
              >
                <Radio
                  value="good"
                  my={1}
                  size="sm"
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                >
                  Boa
                </Radio>
                <Radio
                  value="regular"
                  my={1}
                  size="sm"
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                >
                  Normal
                </Radio>
                <Radio
                  value="bad"
                  my={1}
                  size="sm"
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                >
                  Ruim
                </Radio>
              </Stack>
            </Radio.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModalEditNote(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                bg="primary.400"
                _pressed={{ bg: "primary.500" }}
                onPress={() => {
                  // setShowModalNewNote(false);
                }}
              >
                Adicionar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={showAlertRemoveNote}
        onClose={onCloseAlert}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />

          <AlertDialog.Header>
            <Text color="gray.400" fontSize="xs">
              Remover
            </Text>
            <Text color="gray.500" fontSize="lg">
              {/* {title} */}
            </Text>
          </AlertDialog.Header>

          <AlertDialog.Body>
            <Text>Quer mesmo remover essa anotação?</Text>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onCloseAlert}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={onCloseAlert}>
                Remover
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}
