import { useState } from "react";
import { StatusBar } from "react-native";

import { Box, FlatList, Text, VStack } from "native-base";

import { Header } from "@components/Header";
import { DateCard } from "@components/DateCard";

const dates = [
  { month: "jan", weekDay: "dom", day: "21" },
  { month: "jan", weekDay: "seg", day: "22" },
  { month: "jan", weekDay: "ter", day: "23" },
  { month: "jan", weekDay: "qua", day: "24" },
  { month: "jan", weekDay: "qui", day: "25" },
  { month: "jan", weekDay: "sex", day: "26" },
  { month: "jan", weekDay: "sab", day: "27" },
];

export function Home() {
  const [daySelected, setDaySelected] = useState("");

  function handleSelectDate(day: string) {
    setDaySelected(day);
  }

  console.log(daySelected);

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
          data={dates}
          keyExtractor={(item) => item.day}
          renderItem={({ item }) => (
            <DateCard
              month={item.month}
              weekDay={item.weekDay}
              day={item.day}
              isToday={item.day === "24"}
              isSelected={daySelected === item.day}
              onPress={() => handleSelectDate(item.day)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>

      <Text textAlign="center" color="gray.500" mt={10}>
        Adicionar nota em
      </Text>

      <Text textAlign="center" fontSize={20} color="primary.400">
        {daySelected}
      </Text>
    </VStack>
  );
}
