import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";

export async function localStorageGet(key: string, namespace?: string) {
  return await localStorage.getItem(key, namespace);
}

export async function localStorageSet(
  key: string,
  value: string,
  namespace?: string
) {
  return await localStorage.setItem(key, value, namespace);
}

export async function localStorageRemove(key: string, namespace?: string) {
  return await localStorage.removeItem(key, namespace);
}
