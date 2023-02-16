import { Dimensions } from "react-native";

import {
  Badge,
  Box,
  Button,
  FlatList,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { NoteCard } from "./NoteCard";

type TypesProps = "good" | "bad" | "regular";

const containers = ["good", "regular", "bad"];

const notes = [
  {
    id: "123",
    title: "Comprei meu primeiro apartamento em São paulo",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "good",
  },
  {
    id: "133",
    title: "Fui Roubado",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "bad",
  },
  {
    id: "111",
    title: "reunião na empresa",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "regular",
  },
  {
    id: "444",
    title: "Carro no concerto",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "regular",
  },
  {
    id: "555",
    title: "Carro no concerto",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "regular",
  },
  {
    id: "666",
    title: "Carro no concerto",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "regular",
  },
  {
    id: "777",
    title: "Carro no concerto",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "regular",
  },
  {
    id: "888",
    title: "Carro no concerto",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "regular",
  },
  {
    id: "999",
    title: "Carro no concerto",
    description:
      "Todos nós já nos sentimos nervosos depois de sair de uma entrevista de emprego ou de estágio, especialmente nas situações em que a resposta sobre a candidatura demora vários dias ou até semanas para chegar. Provavelmente, você já se perguntou “quais são os sinais de que passei na entrevista?”. Afinal, se você os conhecer, pode ir mais relaxado.",
    type: "regular",
  },
];

export function NoteContainerByDate() {
  const { width } = Dimensions.get("window");
  const dayTypeButtonWidth = (width - 48) / 3;

  return (
    <VStack px={6} pb={6} flex={1}>
      <HStack
        alignContent="center"
        justifyContent="center"
        mt={12}
        borderBottomWidth="2px"
        borderBottomColor="gray.200"
        rounded={2}
      >
        <Button w={dayTypeButtonWidth} variant="ghost" rounded="none">
          <Text color="primary.400">Bom</Text>

          <Badge
            position="absolute"
            top={-10}
            right={-30}
            w={5}
            h={5}
            p={0}
            alignItems="center"
            justifyContent="center"
            rounded="full"
            bg="primary.400"
          >
            <Text fontSize={10} lineHeight={14} color="primary.100">
              20
            </Text>
          </Badge>
        </Button>

        <Button w={dayTypeButtonWidth} variant="ghost" rounded="none">
          <Text color="gray.400">Normal</Text>

          <Badge
            position="absolute"
            top={-10}
            right={-30}
            w={5}
            h={5}
            p={0}
            alignItems="center"
            justifyContent="center"
            rounded="full"
            bg="rose.400"
          >
            <Text fontSize={10} lineHeight={14} color="primary.100">
              20
            </Text>
          </Badge>
        </Button>

        <Button w={dayTypeButtonWidth} variant="ghost" rounded="none">
          <Text color="gray.400">Ruim</Text>

          <Badge
            position="absolute"
            top={-10}
            right={-30}
            w={5}
            h={5}
            p={0}
            alignItems="center"
            justifyContent="center"
            rounded="full"
            bg="warning.400"
          >
            <Text fontSize={10} lineHeight={14} color="primary.100">
              20
            </Text>
          </Badge>
        </Button>

        <Box
          w={dayTypeButtonWidth}
          h="2px"
          position="absolute"
          bottom="-2px"
          left={0}
          bg="primary.400"
          rounded={2}
        />
      </HStack>

      <View width="full" flex={1} mt={4} rounded="lg" overflow="hidden">
        <FlatList
          data={containers}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <VStack flex={1} w={width - 48} bg="primary.50" py={4} px={2}>
              <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={(note) => {
                  if (note.item.type === item) {
                    return (
                      <NoteCard
                        title={note.item.title}
                        type={note.item.type as TypesProps}
                      />
                    );
                  } else {
                    return <></>;
                  }
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
              />
            </VStack>
          )}
          horizontal
          w="full"
          flex={1}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </VStack>
  );
}
