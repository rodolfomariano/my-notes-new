import { StorageContext } from "../contexts/storageContext";
import { useContext } from "react";

function useStorage() {
  const context = useContext(StorageContext);

  return context;
}

export { useStorage };
