import { useState } from "react";

import {
  Button,
  FormControl,
  IconButton,
  IIconButtonProps,
  Modal,
  Radio,
  Stack,
  Text,
  TextArea,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";

import { Dayjs } from "dayjs";

import { formatFullDate } from "@utils/formatDates";

import { Input } from "./Input";

interface ButtonAddNoteProps extends IIconButtonProps {
  date: Dayjs;
}

export function ButtonAddNote({ date, ...rest }: ButtonAddNoteProps) {
  const [showModalNewNote, setShowModalNewNote] = useState(false);
  const [radioSelected, seRadioSelected] = useState("regular");

  return (
    <>
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
        colorScheme="purple"
        shadow="2"
        onPress={() => setShowModalNewNote(true)}
        {...rest}
      />

      <Modal
        isOpen={showModalNewNote}
        onClose={() => setShowModalNewNote(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />

          <Modal.Header>
            <Text color="gray.400" fontSize="xs">
              Adicionar nova anotação em:
            </Text>
            <Text color="gray.500" fontSize="lg">
              {formatFullDate(date)}
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
                  setShowModalNewNote(false);
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
    </>
  );
}
