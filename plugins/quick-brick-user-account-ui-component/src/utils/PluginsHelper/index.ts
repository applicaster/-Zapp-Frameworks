import {
  Inplayer,
  Cleeng,
  AdobePrimetime,
  Oauth2,
} from "../../utils/Templates";

type ScreenData = {
  rivers: any;
  screenId?: string;
  loginTemlate: LoginTemplate;
};

type ScreenData2 = {
  rivers: any;
  screenId?: string;
  login_type_button: string;
  custom_namespace_button: string;
  custom_token_key_button: string;
};

export function getScreenFromRivers(data: ScreenData2): ZappRiver {
  switch (data.login_type_button) {
    case "in_player":
      return screenFromRivers({
        rivers: data.rivers,
        screenId: data.screenId,
        loginTemlate: Inplayer,
      });
    case "cleeng":
      return screenFromRivers({
        rivers: data.rivers,
        screenId: data.screenId,
        loginTemlate: Cleeng,
      });
    case "adobe_primetime":
      return screenFromRivers({
        rivers: data.rivers,
        screenId: data.screenId,
        loginTemlate: AdobePrimetime,
      });
    case "oauth_2":
      return screenFromRivers({
        rivers: data.rivers,
        screenId: data.screenId,
        loginTemlate: Oauth2,
      });
    case "other":
      return screenFromRivers({
        rivers: data.rivers,
        screenId: data.screenId,
        loginTemlate: {
          tokenKey: data?.custom_token_key_button,
          namespace: data?.custom_namespace_button,
        },
      });

    default:
      return null;
      break;
  }
}
export function screenFromRivers(data: ScreenData): ZappRiver {
  const values = Object.values(data.rivers);
  const pluginTypeLogin = "login";

  // eslint-disable-next-line array-callback-return,consistent-return
  const river = values.find((item) => {
    if (item && item.type) {
      if (data?.screenId) {
        return (
          item.plugin_type === pluginTypeLogin &&
          item.id === data?.screenId &&
          item.type === data.loginTemlate.namespace
        );
      } else {
        return (
          item.plugin_type === pluginTypeLogin &&
          item.type === data.loginTemlate.namespace
        );
      }
    }
    return false;
  });
  return river;
}
