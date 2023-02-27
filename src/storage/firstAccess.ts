import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setFirstAccess(userEmail: string) {
  const storageIsFirstAccess = await isFirstAccess(userEmail);

  if (storageIsFirstAccess === false) {
    return;
  }

  try {
    await AsyncStorage.setItem(
      `@myNotes-1.0-${userEmail}.0:isFirstAccess`,
      JSON.stringify(false)
    );
  } catch (error) {
    throw null;
  }
}

export async function isFirstAccess(userEmail: string) {
  try {
    const storage = await AsyncStorage.getItem(
      `@myNotes-1.0-${userEmail}.0:isFirstAccess`
    );

    if (storage === null) {
      return true;
    }

    return JSON.parse(storage);
  } catch (error) {
    throw error;
  }
}
