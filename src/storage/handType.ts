import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addAndEditHandType(handType: "left" | "right") {
  try {
    await AsyncStorage.setItem(
      "@myNotes-1.0.0:handType",
      JSON.stringify(handType)
    );
  } catch (error) {
    throw null;
  }
}

export async function getHandType() {
  try {
    const storage = await AsyncStorage.getItem("@myNotes-1.0.0:handType");

    if (storage === null) {
      return false;
    }

    return JSON.parse(storage);
  } catch (error) {
    throw error;
  }
}
