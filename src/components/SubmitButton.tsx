import { Button, IButtonProps, Text } from "native-base";

interface SubmitButton extends IButtonProps {
  title: string;
  size?: "small" | "medium" | "large";
}

export function SubmitButton({
  title,
  size = "medium",
  ...rest
}: SubmitButton) {
  const height = size === "medium" ? 12 : size === "large" ? 16 : 8;

  return (
    <Button
      flex={1}
      w="full"
      h={height}
      bg="primary.400"
      _pressed={{ bg: "primary.500" }}
      {...rest}
    >
      <Text fontSize="md" color="primary.100">
        {title}
      </Text>
    </Button>
  );
}
