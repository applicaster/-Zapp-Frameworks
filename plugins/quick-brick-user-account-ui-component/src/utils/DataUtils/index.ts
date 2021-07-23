import { localStorageGet } from "../../services/LocalStorageService";
import { Inplayer, Cleeng, AdobePrimetime, Oauth2 } from "../../models";

export async function loginModelButton1(
  props: GeneralStyles
): Promise<LoginDataModel> {
  const keysModel = await loginModelKeysButton1(props);
  if (!keysModel) {
    return null;
  }
  return loginModel(keysModel);
}

export async function loginModelButton2(
  props: GeneralStyles
): Promise<LoginDataModel> {
  const keysModel = await loginModelKeysButton2(props);
  if (!keysModel) {
    return null;
  }
  return loginModel(keysModel);
}

export async function loginModel(
  keysModel: LoginKeysDataModel
): Promise<LoginDataModel> {
  try {
    const token = await tokenForKey(keysModel.tokenKey, keysModel.namespace);
    if (!token) {
      return null;
    }

    let userId = await itemForKey(keysModel.userIdKey, keysModel.namespace);

    let subscriptionPrice = await itemForKey(
      keysModel.subscriptionPriceKey,
      keysModel.namespace
    );

    let subscriptionRenewsDate = await itemForKey(
      keysModel.subscriptionRenewsDateKey,
      keysModel.namespace
    );

    let userPhotoUrl = await itemForKey(
      keysModel.userPhotoUrlKey,
      keysModel.namespace
    );

    return {
      keysModel,
      token,
      userId,
      subscriptionPrice,
      subscriptionRenewsDate,
      userPhotoUrl,
    };
  } catch (error) {
    throw error;
  }
}

async function tokenForKey(
  tokenKey: string,
  namespace: string
): Promise<string> {
  try {
    let token = await localStorageGet(tokenKey, namespace);
    if (!token) {
      // Fallback legacy logic
      const legacyTokenKey = "idToken";
      token = await localStorageGet("idToken");
      if (!token) {
        return null;
      }
      return null;
    }
    return token;
  } catch (error) {
    throw error;
  }
}

async function itemForKey(key: string, namespace: string) {
  try {
    let value = await localStorageGet(key, namespace);
    if (!value) {
      return null;
    }
  } catch (error) {
    //TODO give debug log
    return null;
  }
}

function loginModelKeysButton1(props: GeneralStyles): LoginKeysDataModel {
  if (!props.button_1_custom_namespace || !props?.button_1_custom_token_key) {
    return null;
  }

  return loginModelKeys({
    loginType: props?.button_1_login_type,
    customNamespace: props?.button_1_custom_namespace,
    customTokenKey: props?.button_1_custom_token_key,
    customUserIdKey: props?.button_1_custom_user_id,
    customSubscriptionPriceKey: props?.button_1_custom_subscription_price_key,
    customSubscriptionRenewsDateKey:
      props?.button_1_custom_subscription_renews_date_key,
    customUserPhotoUrlKey: props?.button_1_custom_user_photo_url_key,
    customScreenId: props?.button_1_custom_screen_id,
  });
}

function loginModelKeysButton2(props: GeneralStyles): LoginKeysDataModel {
  if (!props.button_2_login_enabled) {
    return null;
  }

  if (
    props.button_2_login_type === LoginModelsType.Other &&
    (!props.button_2_custom_namespace || !props?.button_2_custom_token_key)
  ) {
    return null;
  }

  return loginModelKeys({
    loginType: props?.button_2_login_type,
    customNamespace: props?.button_2_custom_namespace,
    customTokenKey: props?.button_2_custom_token_key,
    customUserIdKey: props?.button_2_custom_user_id,
    customSubscriptionPriceKey: props?.button_2_custom_subscription_price_key,
    customSubscriptionRenewsDateKey:
      props?.button_2_custom_subscription_renews_date_key,
    customUserPhotoUrlKey: props?.button_2_custom_user_photo_url_key,
    customScreenId: props?.button_2_custom_screen_id,
  });
}

function loginModelKeys(data: LoginData): LoginKeysDataModel {
  switch (data.loginType) {
    case LoginModelsType.Inplayer:
      return Inplayer;
    case LoginModelsType.Cleeng:
      return Cleeng;
    case LoginModelsType.AdobePrimetime:
      return AdobePrimetime;
    case LoginModelsType.Oauth2:
      return Oauth2;
    case LoginModelsType.Other:
      const retVal: LoginKeysDataModel = {
        tokenKey: data.customTokenKey,
        namespace: data.customNamespace,
        userIdKey: data.customUserIdKey,
        subscriptionPriceKey: data.customSubscriptionPriceKey,
        subscriptionRenewsDateKey: data.customSubscriptionRenewsDateKey,
        userPhotoUrlKey: data.customUserPhotoUrlKey,
        screenId: data.customScreenId,
      };
      return;
    default:
      break;
  }
}
