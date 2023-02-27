import { useEffect, useState } from "react";

import { Dayjs } from "dayjs";

import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
} from "react-native";

import { Box, FlatList, Text, VStack } from "native-base";

import {
  getCurrencyWeekDays,
  getLastWeek,
  getNextWeek,
  getToday,
} from "@utils/getWeekDays";

import {
  formatFullDate,
  getDay,
  getDayOfWeek,
  getMonth,
} from "@utils/formatDates";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { Header } from "@components/Header";
import { DateCard } from "@components/DateCard";
import { NoteContainerByDate } from "@components/NoteContainerByDate";
import { ButtonAddNote } from "@components/ButtonAddNote";
import { setFirstAccess } from "@storage/firstAccess";

export function Home() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [daySelected, setDaySelected] = useState<Dayjs>(getToday());
  const [today, setToday] = useState<Dayjs>(getToday());
  const [days, setDays] = useState<Dayjs[]>(getCurrencyWeekDays());

  function handleSelectDate(day: Dayjs) {
    setDaySelected(day);
  }

  function handleScrollToRight(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (event.nativeEvent.contentOffset.x === 0) {
      const daysOfLastWeek = getLastWeek(days[0]);

      return setDays((state) => [...daysOfLastWeek, ...state]);
    }
  }

  function handleScrollToLeft() {
    const daysOfNextWeek = getNextWeek(days[days.length - 1]);

    return setDays((state) => [...state, ...daysOfNextWeek]);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    if (user?.email) {
      setFirstAccess(user.email);
    }

    return subscriber;
  }, [user]);

  return (
    <VStack flex={1} bg="primary.100">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header />

      <Box flex={1} maxH={20} bg="indigo.200" py="5px" pl={1} pr={1}>
        <FlatList
          data={days}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            return (
              <DateCard
                month={getMonth(item)}
                weekDay={getDayOfWeek(item)}
                day={getDay(item)}
                date={item}
                isToday={
                  item.format("DD/MM/YYYY") === today.format("DD/MM/YYYY")
                }
                isSelected={
                  daySelected.format("DD/MM/YYYY") === item.format("DD/MM/YYYY")
                }
                onPress={() => handleSelectDate(item)}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScrollToRight}
          onEndReached={handleScrollToLeft}
        />
      </Box>

      <Text textAlign="center" color="gray.500" mt={10}>
        Adicionar nota em
      </Text>

      <Text textAlign="center" fontSize={20} color="primary.400">
        {formatFullDate(daySelected)}
      </Text>

      <NoteContainerByDate date={daySelected.toDate()} />

      <ButtonAddNote date={daySelected} />
    </VStack>
  );
}
