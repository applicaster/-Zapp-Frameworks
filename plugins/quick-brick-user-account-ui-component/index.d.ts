type GeneralStyles = {
  custom_padding_top: number;
  user_image_placeholder: string;
  button_1_custom_screen_id: string;
  button_1_background_color: string;
  button_1_background_underlay_color: string;
  button_1_border: string;
  button_1_border_color: string;
  button_1_border_underlay: string;
  button_1_border_underlay_color: string;
  button_1_radius: string;
  button_1_title_color: string;
  button_1_title_text_font_android: string;
  button_1_title_text_font_ios: string;
  button_1_title_text_fontsize: string;
  button_1_title_underlay_color: string;
  button_1_login_type: string;
  button_1_custom_namespace: string;
  button_1_custom_token_key: string;
  button_1_custom_user_id: string;
  button_1_custom_subscription_price_key: string;
  button_1_custom_subscription_renews_date_key: string;
  button_1_custom_user_photo_url_key: string;

  button_2_custom_screen_id: string;
  button_2_login_enabled: boolean;
  button_2_background_color: string;
  button_2_background_underlay_color: string;
  button_2_border: string;
  button_2_border_color: string;
  button_2_border_underlay: string;
  button_2_border_underlay_color: string;
  button_2_radius: string;
  button_2_title_color: string;
  button_2_title_text_font_android: string;
  button_2_title_text_font_ios: string;
  button_2_title_text_fontsize: string;
  button_2_title_underlay_color: string;
  button_2_login_type: string;
  button_2_custom_namespace: string;
  button_2_custom_token_key: string;
  button_2_custom_user_id: string;
  button_2_custom_subscription_price_key: string;
  button_2_custom_subscription_renews_date_key: string;
  button_2_custom_user_photo_url_key: string;

  button_logout_background_color: string;
  button_logout_background_underlay_color: string;
  button_logout_border: string;
  button_logout_border_color: string;
  button_logout_border_underlay: string;
  button_logout_border_underlay_color: string;
  button_logout_radius: string;
  button_logout_title_color: string;
  button_logout_title_text_font_android: string;
  button_logout_title_text_font_ios: string;
  button_logout_title_text_fontsize: string;
  button_logout_title_underlay_color: string;

  debug_dummy_data_source: string;
};

type ButtonStyles = {
  containerStyle: {
    border: string;
    border_color: string;
    border_underlay: string;
    border_underlay_color: string;
    background_underlay_color: string;
    background_color: string;
    radius: string;
  };
  labelStyles: {
    title_underlay_color: string;
    title_color: string;
    title_text_fontsize: string;
    title_text_font_ios: string;
    title_text_font_android: string;
  };
};

type LabelStyles = {
  title_color: string;
  title_text_fontsize: string;
  title_text_font_ios: string;
  title_text_font_android: string;
};

type LoginData = {
  loginType: string;
  customNamespace: string;
  customTokenKey: string;
  customUserIdKey?: string;
  customSubscriptionPriceKey?: string;
  customSubscriptionRenewsDateKey?: string;
  customUserPhotoUrlKey?: string;
  customScreenId: string;
};

type LoginKeysDataModel = {
  title: string;
  tokenKey: string;
  namespace: string;
  userIdKey?: string;
  subscriptionPriceKey?: string;
  subscriptionRenewsDateKey?: string;
  userPhotoUrlKey?: string;
  screenId?: string;
};

type LoginDataModel = {
  keysModel: LoginKeysDataModel;
  title: string;
  token: string;
  userId?: string;
  subscriptionPrice?: string;
  subscriptionRenewsDate?: string;
  userPhotoUrl?: string;
};

type ScreenData = {
  rivers: ZappRiver[];
  loginDataModel: LoginDataModel;
};
