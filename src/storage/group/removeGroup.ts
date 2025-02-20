import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";
import { fetchGroups } from "./fetchGroups";
import { AppError } from "@/utils/AppError";

export const removeGroup = async (group: string) => {
  try {
    const storedGroups = await fetchGroups();

    const filteredGroups = storedGroups.filter(
      (groupName) => groupName !== group
    );
    const groups = JSON.stringify(filteredGroups);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);
  } catch (error) {
    throw error;
  }
};
