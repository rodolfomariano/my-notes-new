import { useNavigation } from "@react-navigation/native";

import {
  HStack,
  Icon,
  Text,
  Pressable,
  IPressableProps,
  Box,
  useTheme,
} from "native-base";

import { Entypo } from "@expo/vector-icons";

import LikeHandSvg from "@assets/like-hand.svg";
import RegularSvg from "@assets/regular.svg";
import NoLikeHandSvg from "@assets/no-like-hand.svg";

import { AppRoutesNavigationProps } from "@routes/app.routes";

interface NoteCardProps extends IPressableProps {
  id: string;
  title: string;
  type: "good" | "regular" | "bad";
}

export function NoteCard({ id, title, type, ...rest }: NoteCardProps) {
  const { colors } = useTheme();

  const colorByType =
    type === "good"
      ? colors.primary[400]
      : type === "regular"
      ? colors.rose[400]
      : colors.warning[400];

  const navigation = useNavigation<AppRoutesNavigationProps>();

  function handleSeeDetailsOsNote() {
    return navigation.navigate("noteDetail", { id: id });
  }

  return (
    <Pressable
      bg="primary.200"
      px={4}
      py={4}
      mb={2}
      maxHeight={20}
      overflow="hidden"
      rounded="md"
      _pressed={{ bg: "indigo.100" }}
      onPress={handleSeeDetailsOsNote}
      {...rest}
    >
      <HStack w="full" alignItems="center">
        {type === "good" ? (
          <LikeHandSvg />
        ) : type === "regular" ? (
          <RegularSvg />
        ) : (
          <NoLikeHandSvg />
        )}

        <Text
          flexWrap="wrap"
          flex={1}
          mx={2}
          numberOfLines={2}
          color="gray.600"
        >
          {title}
        </Text>

        <Icon as={Entypo} name="chevron-thin-right" />
      </HStack>

      <Box position="absolute" h={20} w={2} bg={colorByType} top={0} left={0} />
    </Pressable>
  );
}
