import { localStorageGet } from "../LocalStorageService";
import {
  Inplayer,
  Cleeng,
  AdobePrimetime,
  Oauth2,
} from "../../utils/Templates";
export async function isTokenExist(data: TokenExistData): Promise<boolean> {
  const {
    login_type_button_1,
    custom_namespace_button_1,
    custom_token_key_button_1,
    login_type_button_2,
    custom_namespace_button_2,
    custom_token_key_button_2,
  } = data;

  try {
    const login1Data = tokenKeyForLoginType(
      login_type_button_1,
      custom_namespace_button_1,
      custom_token_key_button_1
    );
    if (login1Data) {
      const tokenExist = await localStorageGet(
        login1Data.key,
        login1Data.namespace
      );
      if (tokenExist) {
        return true;
      }
    }

    if (login_type_button_2) {
      const login2Data = tokenKeyForLoginType(
        login_type_button_2,
        custom_namespace_button_2,
        custom_token_key_button_2
      );
      if (login2Data) {
        const tokenExist = await localStorageGet(
          login2Data.key,
          login2Data.namespace
        );
        if (tokenExist) {
          return true;
        }
      }
    }

    //Fallback old logic
    const tokenExist = await localStorageGet("idToken");

    return !!tokenExist;
  } catch (error) {
    //TODO: add warning log
    return false;
  }
}

function tokenKeyForLoginType(
  login_type_button,
  custom_namespace_button: string,
  custom_token_key_button: string
): { key: string; namespace: string } {
  switch (login_type_button) {
    case "in_player":
      return { key: Inplayer.tokenKey, namespace: Inplayer.namespace };
    case "cleeng":
      return { key: Cleeng.tokenKey, namespace: Cleeng.tokenKey };
    case "adobe_primetime":
      return {
        key: AdobePrimetime.tokenKey,
        namespace: AdobePrimetime.tokenKey,
      };
    case "oauth_2":
      return { key: Oauth2.tokenKey, namespace: Oauth2.tokenKey };
    case "other":
      return {
        key: custom_token_key_button,
        namespace: custom_namespace_button,
      };
    default:
      break;
  }
}
