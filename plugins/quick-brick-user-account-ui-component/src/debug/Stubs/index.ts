import { dummy_model_1, dummy_model_2 } from "../DummyModels";

export function debugLoginModel1(
  keysModel: LoginKeysDataModel
): LoginDataModel {
  try {
    return {
      title: keysModel.title,
      keysModel,
      token: dummy_model_1.token,
      userId: dummy_model_1.userId,
      subscriptionPrice: dummy_model_1.subscriptionPrice,
      subscriptionRenewsDate: dummy_model_1.subscriptionRenewsDate,
      userPhotoUrl: dummy_model_1.userPhotoUrl,
    };
  } catch (error) {
    throw error;
  }
}

export function debugLoginModel2(
  keysModel: LoginKeysDataModel
): LoginDataModel {
  try {
    return {
      title: keysModel.title,
      keysModel,
      token: dummy_model_2.token,
      userId: dummy_model_2.userId,
      subscriptionPrice: dummy_model_2.subscriptionPrice,
      subscriptionRenewsDate: dummy_model_2.subscriptionRenewsDate,
      userPhotoUrl: dummy_model_2.userPhotoUrl,
    };
  } catch (error) {
    throw error;
  }
}
