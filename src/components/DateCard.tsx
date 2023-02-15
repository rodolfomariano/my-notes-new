import { Dimensions } from "react-native";
import { Center, Pressable, IPressableProps, Text } from "native-base";

interface DateCardProps extends IPressableProps {
  month: string;
  weekDay: string;
  day: string;
  isToday?: boolean;
  isSelected?: boolean;
}

export function DateCard({
  month,
  day,
  weekDay,
  isToday,
  isSelected = false,

  ...rest
}: DateCardProps) {
  const { width } = Dimensions.get("window");

  const cardWidth = width / 7;

  return (
    <Pressable
      w={cardWidth}
      h={70}
      bg={isToday ? "primary.400" : "primary.100"}
      ml={1}
      rounded="md"
      borderWidth="1px"
      borderColor={isSelected ? "primary.500" : "indigo.200"}
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
      </Center>
    </Pressable>
  );
}
