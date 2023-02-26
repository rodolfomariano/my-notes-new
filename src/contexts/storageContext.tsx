import { createContext, ReactNode, useEffect, useState } from "react";

import { addAndEditHandType, getHandType } from "@storage/handType";

interface StorageContextProps {
  handleType: string;
  toggleHandType: (handType: "left" | "right") => void;
}

interface StorageContextProviderProps {
  children: ReactNode;
}

export const StorageContext = createContext({} as StorageContextProps);

export function StorageContextProvider({
  children,
}: StorageContextProviderProps) {
  const [handleType, setHandleType] = useState("");

  async function getHandTypeStorage() {
    const userHandleType = await getHandType();

    setHandleType(userHandleType);
  }

  async function toggleHandType(handType: "left" | "right") {
    await addAndEditHandType(handType);

    return setHandleType(handType);
  }

  useEffect(() => {
    getHandTypeStorage();
  }, []);

  return (
    <StorageContext.Provider value={{ handleType, toggleHandType }}>
      {children}
    </StorageContext.Provider>
  );
}
