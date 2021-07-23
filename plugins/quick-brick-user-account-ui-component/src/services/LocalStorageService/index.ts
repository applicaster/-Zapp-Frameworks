import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";

export async function localStorageGet(key: string, namespace?: string) {
  return await localStorage.getItem(key, namespace);
}
