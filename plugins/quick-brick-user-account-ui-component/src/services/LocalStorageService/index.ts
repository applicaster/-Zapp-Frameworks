import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import { isWeb } from "@applicaster/zapp-react-native-utils/reactUtils";

const isWebPlatform = isWeb();

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
  if (isWebPlatform) {
    const keyToDelete = namespace ? `${namespace}_::_${key}` : key;
    // @ts-ignore
    window.localStorage[keyToDelete] = null;

    return;
  }

  return await localStorage.removeItem(key, namespace);
}
