import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList as FlatListDefault,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

import {
  Badge,
  Button,
  FlatList,
  HStack,
  Text,
  View,
  VStack,
} from "native-base";

import firestore from "@react-native-firebase/firestore";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { NoteCard } from "./NoteCard";
import { Dayjs } from "dayjs";

type TypesProps = "good" | "bad" | "regular";

const containers = ["good", "regular", "bad"];

interface Note {
  id: "string";
  title: "string";
  description: "string";
  note_type: "good" | "regular" | "bad";
  created_at: "string";
  updated_at: "string" | null;
}

interface NoteContainerByDateProps {
  date: Date;
}

export function NoteContainerByDate({ date }: NoteContainerByDateProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [position, setPosition] = useState(0);
  const [positionIndicator, setPositionIndicator] = useState(
    new Animated.Value(0)
  );
  const { width } = Dimensions.get("window");
  const dayTypeButtonWidth = (width - 48) / 3;

  Animated.timing(positionIndicator, {
    toValue: position * dayTypeButtonWidth,
    duration: 300,
    useNativeDriver: false,
  }).start();

  const flatListRef = useRef<FlatListDefault>(null);

  const numberOfGoodNotes = notes.filter(
    (note) => note.note_type === "good"
  ).length;

  const numberOfRegularNotes = notes.filter(
    (note) => note.note_type === "regular"
  ).length;

  const numberOfBadNotes = notes.filter(
    (note) => note.note_type === "bad"
  ).length;

  function scrollToIndexWhenClicking(index: number) {
    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.5,
    });

    // setPosition(index);
  }

  function handleFlatListScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    const currentIndex = Math.ceil(
      Math.floor(event.nativeEvent.contentOffset.x) / width
    );

    setPosition(currentIndex);
  }

  async function getNotesBayUserEmail() {
    if (user?.email) {
      const userNotes = await firestore()
        .collection(user.email)
        .where("created_at", "==", date)
        .onSnapshot((querySnapshop) => {
          const data = querySnapshop.docs.map((note) => {
            return {
              id: note.id,
              ...note.data(),
            };
          }) as Note[];
          setNotes(data);
        });

      return () => userNotes();
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  }, []);

  useEffect(() => {
    getNotesBayUserEmail();
  }, [user, date]);

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
        <Button
          w={dayTypeButtonWidth}
          variant="ghost"
          rounded="none"
          onPress={() => scrollToIndexWhenClicking(0)}
        >
          <Text color={position === 0 ? "primary.400" : "gray.400"}>Bom</Text>

          {numberOfGoodNotes > 0 && (
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
                {numberOfGoodNotes}
              </Text>
            </Badge>
          )}
        </Button>

        <Button
          w={dayTypeButtonWidth}
          variant="ghost"
          rounded="none"
          onPress={() => scrollToIndexWhenClicking(1)}
        >
          <Text color={position === 1 ? "primary.400" : "gray.400"}>
            Normal
          </Text>

          {numberOfRegularNotes > 0 && (
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
                {numberOfRegularNotes}
              </Text>
            </Badge>
          )}
        </Button>

        <Button
          w={dayTypeButtonWidth}
          variant="ghost"
          rounded="none"
          onPress={() => scrollToIndexWhenClicking(2)}
        >
          <Text color={position === 2 ? "primary.400" : "gray.400"}>Ruim</Text>

          {numberOfBadNotes > 0 && (
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
                {numberOfBadNotes}
              </Text>
            </Badge>
          )}
        </Button>

        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: -2,
              height: 2,
              width: dayTypeButtonWidth,
              backgroundColor: "#A381EF",
              left: positionIndicator,
              borderRadius: 2,
            },
          ]}
        />
      </HStack>

      <View width="full" flex={1} mt={4} rounded="lg" overflow="hidden">
        <FlatList
          ref={flatListRef}
          data={containers}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <VStack flex={1} w={width - 48} bg="primary.50" py={4} px={2}>
              <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={(note) => {
                  if (note.item.note_type === item) {
                    return (
                      <NoteCard
                        id={note.item.id}
                        title={note.item.title}
                        type={note.item.note_type as TypesProps}
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
          onScroll={handleFlatListScroll}
        />
      </View>
    </VStack>
  );
}
