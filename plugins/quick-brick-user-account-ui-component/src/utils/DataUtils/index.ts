import { localStorageGet } from "../../services/LocalStorageService";
import {
  Inplayer,
  Cleeng,
  AdobePrimetime,
  Oauth2,
  Oauth2TV,
  Dummy1,
  Dummy2,
} from "../../models";
import { logger } from "../../services/LoggerService";
enum LoginModelsType {
  Inplayer = "in_player",
  Cleeng = "cleeng",
  AdobePrimetime = "adobe_primetime",
  Oauth2 = "oauth_2",
  Oauth2TV = "oauth_2_tv",
  Other = "other",
}

async function itemForKey(key: string, namespace: string) {
  try {
    if (!key) {
      return null;
    }

    let value = await localStorageGet(key, namespace);

    logger.debug({
      message: `itemForKey Finised key - ${key}, value - ${value}`,
      data: { value },
    });

    if (!value) {
      return null;
    }

    return value;
  } catch (error) {
    logger.warning({
      message: `itemForKey Error: key - ${key}, failed - ${error.message}`,
      data: { error },
    });

    return null;
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
      token = await localStorageGet(legacyTokenKey);

      if (!token) {
        return null;
      }

      return null;
    }

    return token;
  } catch (error) {
    logger.error({
      message: `itemForKey failed - ${error.message}`,
      data: { error },
    });

    throw error;
  }
}

function loginModelKeys(data: LoginData): LoginKeysDataModel {
  const screenId = data.customScreenId;

  switch (data.loginType) {
    case LoginModelsType.Inplayer:
      return { ...Inplayer, screenId };
    case LoginModelsType.Cleeng:
      return {
        ...Cleeng,
        screenId,
      };
    case LoginModelsType.AdobePrimetime:
      return {
        ...AdobePrimetime,
        screenId: data.customScreenId,
      };
    case LoginModelsType.Oauth2:
      return { ...Oauth2, screenId };
    case LoginModelsType.Oauth2TV:
      return { ...Oauth2TV, screenId };
    case LoginModelsType.Other:
      return {
        title: "Other",
        tokenKey: data.customTokenKey,
        namespace: data.customNamespace,
        userIdKey: data.customUserIdKey,
        subscriptionPriceKey: data.customSubscriptionPriceKey,
        subscriptionRenewsDateKey: data.customSubscriptionRenewsDateKey,
        userPhotoUrlKey: data.customUserPhotoUrlKey,
        screenId,
      };
    default:
      break;
  }
}

export async function loginModel(
  keysModel: LoginKeysDataModel
): Promise<LoginDataModel> {
  const token = await tokenForKey(keysModel.tokenKey, keysModel.namespace);
  const userId = await itemForKey(keysModel.userIdKey, keysModel.namespace);

  const subscriptionPrice = await itemForKey(
    keysModel.subscriptionPriceKey,
    keysModel.namespace
  );

  const subscriptionRenewsDate = await itemForKey(
    keysModel.subscriptionRenewsDateKey,
    keysModel.namespace
  );

  const userPhotoUrl = await itemForKey(
    keysModel.userPhotoUrlKey,
    keysModel.namespace
  );

  return {
    title: keysModel.title,
    keysModel,
    token,
    userId,
    subscriptionPrice,
    subscriptionRenewsDate,
    userPhotoUrl,
  };
}

function loginModelKeysButton1(props: GeneralStyles): LoginKeysDataModel {
  if (
    props.button_1_login_type === LoginModelsType.Other &&
    (!props.button_1_custom_namespace || !props?.button_1_custom_token_key)
  ) {
    logger.warning({
      message:
        "Button 1 enabled, with type other but custom token key was not defined",
    });

    return null;
  }

  const modelKeys = loginModelKeys({
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

  logger.debug({
    message: `Button 1 model data keys - ${modelKeys.title}`,
    data: { modelKeys },
  });

  return modelKeys;
}

function loginModelKeysButton2(props: GeneralStyles): LoginKeysDataModel {
  if (!props.button_2_login_enabled) {
    logger.info({
      message: "Login button 2 dissabled",
    });

    return null;
  }

  if (
    props.button_2_login_type === LoginModelsType.Other &&
    (!props.button_2_custom_namespace || !props?.button_2_custom_token_key)
  ) {
    logger.warning({
      message:
        "Button 2 enabled, with type other but custom token key was not defined",
    });

    return null;
  }

  const modelKeys = loginModelKeys({
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

  logger.debug({
    message: `Button 2 model data keys - ${modelKeys.title}`,
    data: { modelKeys },
  });

  return modelKeys;
}

export async function loginModelButton1(
  props: GeneralStyles,
  debug_dummy_data_source = false
): Promise<LoginDataModel> {
  let keysModel = await loginModelKeysButton1(props);

  if (debug_dummy_data_source) {
    keysModel = Dummy1;
  }

  if (!keysModel) {
    return null;
  }

  const button1Model = await loginModel(keysModel);

  logger.debug({
    message: `Get model for login button 1 - ${button1Model?.title}`,
    data: { button1Model, keysModel },
  });

  return button1Model;
}

export async function loginModelButton2(
  props: GeneralStyles,
  debug_dummy_data_source = false
): Promise<LoginDataModel> {
  let keysModel = loginModelKeysButton2(props);

  if (debug_dummy_data_source) {
    keysModel = Dummy2;
  }

  if (!keysModel) {
    return null;
  }

  const button2Model = await loginModel(keysModel);

  logger.debug({
    message: `Get model for login button 2 - ${button2Model.title}`,
    data: { button2Model, keysModel },
  });

  return button2Model;
}
