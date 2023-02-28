import { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  IconButton,
  IIconButtonProps,
  Modal,
  Radio,
  Spinner,
  Stack,
  Text,
  TextArea,
} from "native-base";

import firestore from "@react-native-firebase/firestore";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { AntDesign } from "@expo/vector-icons";

import { Dayjs } from "dayjs";

import { formatFullDate } from "@utils/formatDates";

import { Input } from "./Input";
import { getHandType } from "@storage/handType";
import { useStorage } from "../hooks/useStorage";
import { Alert } from "react-native";

interface ButtonAddNoteProps extends IIconButtonProps {
  date: Dayjs;
}

export function ButtonAddNote({ date, ...rest }: ButtonAddNoteProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [showModalNewNote, setShowModalNewNote] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [radioSelected, seRadioSelected] = useState("regular");
  const [isAddNewNote, setIsAddNewNote] = useState(false);

  const { handleType } = useStorage();

  function clearForms() {
    setTitle("");
    setDescription("");
    seRadioSelected("regular");
  }

  function handleCloseModalNewNote() {
    clearForms();
    setShowModalNewNote(false);
  }

  function handleAddNewNote() {
    setIsAddNewNote(true);

    if (user?.email) {
      firestore()
        .collection(user?.email)
        .add({
          title,
          description,
          note_type: radioSelected,
          created_at: date.toDate(),
          updated_at: null,
        })
        .then(() => {
          clearForms();

          return setShowModalNewNote(false);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsAddNewNote(false));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  });

  return (
    <>
      {handleType === "right" ? (
        <IconButton
          _icon={{
            as: AntDesign,
            name: "plus",
          }}
          borderRadius="full"
          position="absolute"
          bottom={10}
          right={4}
          variant="solid"
          w={12}
          h={12}
          bg="primary.400"
          _pressed={{ bg: "primary.500" }}
          shadow="2"
          onPress={() => setShowModalNewNote(true)}
          {...rest}
        />
      ) : (
        <IconButton
          _icon={{
            as: AntDesign,
            name: "plus",
          }}
          borderRadius="full"
          position="absolute"
          bottom={10}
          left={4}
          variant="solid"
          w={12}
          h={12}
          bg="primary.400"
          _pressed={{ bg: "primary.500" }}
          shadow="2"
          onPress={() => setShowModalNewNote(true)}
          {...rest}
        />
      )}

      <Modal isOpen={showModalNewNote} onClose={handleCloseModalNewNote}>
        <Modal.Content>
          <Modal.CloseButton />

          <Modal.Header>
            <Text color="gray.400" fontSize="xs">
              Adicionar nova anotação em:
            </Text>
            <Text color="gray.500" fontSize="lg">
              {formatFullDate(date.toDate())}
            </Text>
          </Modal.Header>

          <Modal.Body>
            <FormControl>
              <Input
                label="Titulo"
                placeholder="Digite um titulo para a nota"
                onChangeText={setTitle}
                value={title}
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
                onChangeText={setDescription}
                value={description}
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
                onPress={handleCloseModalNewNote}
              >
                Cancelar
              </Button>
              <Button
                bg="primary.400"
                _pressed={{ bg: "primary.500" }}
                onPress={handleAddNewNote}
                disabled={isAddNewNote}
              >
                {isAddNewNote ? (
                  <Spinner
                    size="sm"
                    accessibilityLabel="Adicionando nova anotação"
                  />
                ) : (
                  "Adicionar"
                )}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
