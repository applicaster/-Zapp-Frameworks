import { dummy_model_1, dummy_model_2 } from "../DummyModels";
import { Dummy1, Dummy2 } from "../../models";
import {
  localStorageSet,
  localStorageRemove,
} from "../../services/LocalStorageService";

export async function mimicLoginForDummy1() {
  await localStorageSet(Dummy1.tokenKey, dummy_model_1.token, Dummy1.namespace);

  await localStorageSet(
    Dummy1.userIdKey,
    dummy_model_1.userId,
    Dummy1.namespace
  );
}

async function mimicLogoutForDummy1() {
  localStorageRemove(Dummy1.tokenKey, Dummy1.namespace);
  localStorageRemove(Dummy1.userIdKey, Dummy1.namespace);
}

export async function mimicLoginForDummy2() {
  await localStorageSet(Dummy2.tokenKey, dummy_model_2.token, Dummy2.namespace);

  await localStorageSet(
    Dummy2.userIdKey,
    dummy_model_2.userId,
    Dummy2.namespace
  );

  await localStorageSet(
    Dummy2.subscriptionPriceKey,
    dummy_model_2.subscriptionPrice,
    Dummy2.namespace
  );

  await localStorageSet(
    Dummy2.subscriptionRenewsDateKey,
    dummy_model_2.subscriptionRenewsDate,
    Dummy2.namespace
  );
}

async function mimicLogoutForDummy2() {
  localStorageRemove(Dummy2.tokenKey, Dummy2.namespace);
  localStorageRemove(Dummy2.userIdKey, Dummy2.namespace);
  localStorageRemove(Dummy2.subscriptionPriceKey, Dummy2.namespace);
  localStorageRemove(Dummy2.subscriptionRenewsDateKey, Dummy2.namespace);
}

export async function mimicLogout() {
  await mimicLogoutForDummy1();
  await mimicLogoutForDummy2();
}
