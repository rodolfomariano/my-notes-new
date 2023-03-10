import { Dimensions } from "react-native";
import {
  Center,
  Pressable,
  IPressableProps,
  Text,
  Box,
  HStack,
} from "native-base";

import { Dayjs } from "dayjs";

import { getToday } from "@utils/getWeekDays";
import { useEffect, useState } from "react";

interface DateCardProps extends IPressableProps {
  month: string;
  weekDay: string;
  day: number;
  isToday?: boolean;
  isSelected?: boolean;
  date: Dayjs;
  haveGoodNote?: boolean;
  haveRegularNote?: boolean;
  haveBadNote?: boolean;
}

export function DateCard({
  month,
  day,
  weekDay,
  isToday,
  isSelected = false,
  date,
  haveGoodNote,
  haveRegularNote,
  haveBadNote,
  ...rest
}: DateCardProps) {
  const { width } = Dimensions.get("window");

  const cardWidth = width / 7;

  const today = getToday();

  return (
    <Pressable
      w={cardWidth}
      h={70}
      bg={isToday ? "primary.400" : "primary.100"}
      ml={1}
      rounded="md"
      borderWidth="1px"
      borderColor={isSelected ? "primary.500" : "indigo.200"}
      disabled={date > today}
      _disabled={{ opacity: 0.7 }}
      overflow="hidden"
      _pressed={{ opacity: 0.8 }}
      {...rest}
    >
      <Center h={5} bg={isToday ? "primary.100" : "primary.400"}>
        <Text
          fontSize={12}
          color={isToday ? "gray.500" : "primary.100"}
          textTransform="uppercase"
        >
          {month}
        </Text>
      </Center>

      <Center mt={1}>
        <Text
          fontSize={10}
          textTransform="uppercase"
          color={isToday ? "gray.200" : "gray.500"}
        >
          {weekDay}
        </Text>
      </Center>

      <Center flex={1}>
        <Text fontSize={16} color={isToday ? "primary.100" : "primary.400"}>
          {day}
        </Text>

        <HStack
          position="absolute"
          top={-3}
          py="2px"
          px="2px"
          flexDirection="row"
          justifyContent="center"
          space="2px"
        >
          {haveGoodNote && (
            <Box
              w={2}
              h={2}
              rounded="full"
              bg="primary.400"
              borderWidth="1px"
              borderColor="primary.100"
            />
          )}

          {haveRegularNote && (
            <Box
              w={2}
              h={2}
              rounded="full"
              bg="rose.400"
              borderWidth="1px"
              borderColor="primary.100"
            />
          )}

          {haveBadNote && (
            <Box
              w={2}
              h={2}
              rounded="full"
              bg="warning.400"
              borderWidth="1px"
              borderColor="primary.100"
            />
          )}
        </HStack>
      </Center>
    </Pressable>
  );
}
