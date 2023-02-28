import { useEffect, useRef, useState } from "react";
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
  Spinner,
  Stack,
  Text,
  TextArea,
  VStack,
} from "native-base";

import firestore from "@react-native-firebase/firestore";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { AntDesign, Feather } from "@expo/vector-icons";

import { formatFullDate } from "@utils/formatDates";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { getToday } from "@utils/getWeekDays";

interface Note {
  title: "string";
  description: "string";
  note_type: "good" | "regular" | "bad" | "";
  created_at?: {
    nanoseconds: number;
    seconds: number;
  };
  updated_at?: Date;
}

interface RouteProps {
  id: string;
}

export function NoteDetails() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [showModalEditNote, setShowModalEditNote] = useState(false);
  const [showAlertRemoveNote, setShowAlertRemoveNote] = useState(false);

  const [note, setNote] = useState({} as Note);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [radioSelected, seRadioSelected] = useState("");

  const [isUpdateNote, setIsUpdateNote] = useState(false);
  const [isDeleteNote, setIsDeleteNote] = useState(false);

  const navigation = useNavigation();

  const editDate = note.created_at
    ? new Date(note!.created_at!.seconds * 1000)
    : new Date();

  const route = useRoute();
  const { id } = route.params as RouteProps;

  const onCloseAlert = () => setShowAlertRemoveNote(false);

  const cancelRef = useRef(null);

  const toDay = getToday().toDate();

  function handleGoBack() {
    navigation.goBack();
  }

  async function getNoteDetailsById() {
    if (user?.email) {
      const userNote = await firestore()
        .collection(user.email)
        .doc(id)
        .onSnapshot((doc) => {
          setNote({
            title: doc.data()?.title,
            description: doc.data()?.description,
            note_type: doc.data()?.note_type,
            created_at: doc.data()?.created_at,
          });

          return {
            id: doc.id,
            ...doc.data(),
          };
        });

      return () => userNote();
    }
  }

  async function handleEditNoteById() {
    setIsUpdateNote(true);

    try {
      if (user?.email) {
        const userNote = await firestore()
          .collection(user.email)
          .doc(id)
          .update({
            title: noteTitle,
            description: noteDescription,
            note_type: radioSelected,
            updated_at: toDay,
          });

        setShowModalEditNote(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateNote(false);
    }
  }

  async function handleRemoveNoteById() {
    setIsDeleteNote(true);

    try {
      if (user?.email) {
        const userNote = await firestore()
          .collection(user.email)
          .doc(id)
          .delete();
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteNote(false);
      setShowAlertRemoveNote(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  }, []);

  useEffect(() => {
    getNoteDetailsById();
  }, [user]);

  useEffect(() => {
    setNoteTitle(note.title);
    setNoteDescription(note.description);
    seRadioSelected(note.note_type);
  }, [note]);

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
            {note.created_at && formatFullDate(editDate)}
          </Text>

          <Text
            mt={4}
            fontSize={24}
            color="primary.400"
            textAlign="center"
            lineHeight={30}
          >
            {note.title}
          </Text>

          <Text mt={16} mb={6} fontSize={16} color="gray.600">
            Descrição
          </Text>

          <ScrollView>
            <Text fontSize="sm" color="gray.500">
              {note.description}
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

            <Text color="gray.500">{note.title}</Text>
          </Modal.Header>

          <Modal.Body>
            <FormControl>
              <Input
                label="Titulo"
                placeholder="Digite um titulo para a nota"
                value={noteTitle}
                defaultValue={note.title}
                onChangeText={setNoteTitle}
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
                defaultValue={note.description}
                value={noteDescription}
                onChangeText={setNoteDescription}
              />
            </FormControl>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={radioSelected}
              defaultValue={note.note_type}
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
                onPress={handleEditNoteById}
              >
                {isUpdateNote ? (
                  <Spinner
                    size="sm"
                    accessibilityLabel="Adicionando nova anotação"
                  />
                ) : (
                  "Editar"
                )}
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
              {noteTitle}
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
              <Button colorScheme="danger" onPress={handleRemoveNoteById}>
                {isDeleteNote ? (
                  <Spinner
                    size="sm"
                    accessibilityLabel="Adicionando nova anotação"
                  />
                ) : (
                  "Remover"
                )}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}
