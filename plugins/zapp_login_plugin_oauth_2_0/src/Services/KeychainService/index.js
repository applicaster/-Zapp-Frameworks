import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import { sessionStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/SessionStorage";

import { parseJsonIfNeeded } from "@applicaster/zapp-react-native-utils/functionUtils";
import { logger } from "../LoggerService";

const namespace = "zapp_login_plugin_oauth_2_0";
const authDataKey = "authData";
const userAccountStorageTokenKey = "idToken";
// We use different to able to have always same key for user account
const local_storage_key = "access_token";

export async function saveKeychainData(
  data,
  session_storage_key = "access_token"
) {
  const stringifiedData = JSON.stringify(data);
  try {
    const result = await localStorage.setKeychainItem(
      authDataKey,
      stringifiedData,
      namespace
    );
    const accessToken = data?.accessToken;
    if (accessToken) {
      await sessionStorage.setItem(session_storage_key, accessToken, namespace);
      await localStorage.setItem(local_storage_key, accessToken, namespace);
      await localStorage.setItem(userAccountStorageTokenKey, accessToken);
    }
    logger.debug({
      message: `saveKeychainData: Success`,
      data: {
        namespace,
        auth_data_key: authDataKey,
        session_storage_key,
      },
    });

    return result;
  } catch (error) {
    logger.error({
      message: `saveKeychainData: Error`,
      data: {
        namespace,
        auth_data_key: authDataKey,
        error,
        session_storage_key,
      },
    });

    return false;
  }
}

export async function loadKeychainData() {
  try {
    const stringifiedData = await localStorage.getKeychainItem(
      authDataKey,
      namespace
    );
    const data = parseJsonIfNeeded(stringifiedData);
    logger.debug({
      message: `loadKeychainData: Success`,
      data: {
        namespace,
        auth_data_key: authDataKey,
      },
    });

    return data;
  } catch (error) {
    logger.error({
      message: `loadKeychainData: Error`,
      data: {
        error,
        namespace,
        auth_data_key: authDataKey,
      },
    });

    return null;
  }
}

export async function removeKeychainData(session_storage_key = "access_token") {
  try {
    const result = await localStorage.removeKeychainItem(
      authDataKey,
      namespace
    );

    await sessionStorage.removeItem(session_storage_key, namespace);
    await localStorage.removeItem(local_storage_key, namespace);
    await localStorage.removeItem(userAccountStorageTokenKey);

    logger.debug({
      message: `removeKeychainData: Success`,
      data: {
        auth_data_key: authDataKey,
        namespace,
        result,
        session_storage_key,
      },
    });
  } catch (error) {
    logger.error({
      message: `removeKeychainData: Error`,
      data: {
        error,
        namespace,
        auth_data_key: authDataKey,
        session_storage_key,
      },
    });
  }
}
