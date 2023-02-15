import { HStack } from "native-base";

import LogoSvg from "@assets/min-logo.svg";
import { AvatarButton } from "./AvatarButton";

export function Header() {
  return (
    <HStack
      px={6}
      pt={12}
      pb={4}
      bg="primary.200"
      alignItems="center"
      justifyContent="space-between"
    >
      <LogoSvg />

      <AvatarButton />
    </HStack>
  );
}
