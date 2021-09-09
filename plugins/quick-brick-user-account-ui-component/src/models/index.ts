export const Inplayer: LoginKeysDataModel = {
  title: "Inplayer",
  tokenKey: "inplayer_token",
  namespace: "quick-brick-inplayer",
  userIdKey: "com.inplayer.lastEmailUsed",
  subscriptionPriceKey: null,
  subscriptionRenewsDateKey: null,
  userPhotoUrlKey: null,
};

export const Cleeng: LoginKeysDataModel = {
  title: "Cleeng",
  tokenKey: "in_player_token", // Yes, it is correct, mistake on the plugin level
  namespace: "zapp-cleeng-login",
};

export const AdobePrimetime: LoginKeysDataModel = {
  title: "AdobePrimetime",
  tokenKey: "adobeMediaToken",
  namespace: "adobe-primetime-auth-qb",
};

export const Oauth2: LoginKeysDataModel = {
  title: "Oauth2",
  tokenKey: "access_token",
  namespace: "zapp_login_plugin_oauth_2_0",
};

export const Oauth2TV: LoginKeysDataModel = {
  title: "Oauth2TV",
  tokenKey: "access_token",
  namespace: "zapp_login_plugin_oauth_tv_2_0",
};

export const Dummy1: LoginKeysDataModel = {
  title: "Dummy1",
  tokenKey: "access_token",
  namespace: "quick-brick-user-account-ui-component-dummy-1",
  userIdKey: "user_id",
};

export const Dummy2: LoginKeysDataModel = {
  title: "Dummy2",
  tokenKey: "access_token",
  namespace: "quick-brick-user-account-ui-component-dummy-2",
  userIdKey: "user_id",
  subscriptionPriceKey: "price_key",
  subscriptionRenewsDateKey: "renew_date_key",
  userPhotoUrlKey: null,
};
