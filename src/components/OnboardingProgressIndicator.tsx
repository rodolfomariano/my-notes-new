import { Box, HStack } from "native-base";

interface OnboardingProgressIndicator {
  progressPosition: 1 | 2 | 3;
}

export function OnboardingProgressIndicator({
  progressPosition,
}: OnboardingProgressIndicator) {
  return (
    <HStack w="full" alignItems="center" justifyContent="center">
      <Box
        w={progressPosition === 1 ? 8 : 5}
        h={2}
        borderWidth="1px"
        borderColor="primary.400"
        rounded="full"
        mr={1}
        bg={progressPosition === 1 ? "primary.400" : "primary.100"}
      />

      <Box
        w={progressPosition === 2 ? 8 : 5}
        h={2}
        borderWidth="1px"
        borderColor="primary.400"
        rounded="full"
        mr={1}
        bg={progressPosition === 2 ? "primary.400" : "primary.100"}
      />

      <Box
        w={progressPosition === 3 ? 8 : 5}
        h={2}
        borderWidth="1px"
        borderColor="primary.400"
        rounded="full"
        bg={progressPosition === 3 ? "primary.400" : "primary.100"}
      />
    </HStack>
  );
}
