type GeneralStyles = {
  custom_margin_top: number;
  user_image_placeholder: string;
  button_1_background_image: string;
  button_1_custom_screen_id: string;
  button_1_background_color: string;
  button_1_background_color_focused: string;
  button_1_border: string;
  button_1_border_color: string;
  button_1_border_color_focused: string;
  button_1_radius: string;
  button_1_title_color: string;
  button_1_title_text_font_android: string;
  button_1_title_text_font_ios: string;
  button_1_title_text_fontsize: string;
  button_1_title_color_focused: string;
  button_1_login_type: string;
  button_1_custom_namespace: string;
  button_1_custom_token_key: string;
  button_1_custom_user_id: string;
  button_1_custom_subscription_price_key: string;
  button_1_custom_subscription_renews_date_key: string;
  button_1_custom_user_photo_url_key: string;

  button_2_background_image: string;
  button_2_custom_screen_id: string;
  button_2_login_enabled: boolean;
  button_2_background_color: string;
  button_2_background_color_focused: string;
  button_2_border: string;
  button_2_border_color: string;
  button_2_border_color_focused: string;
  button_2_radius: string;
  button_2_title_color: string;
  button_2_title_text_font_android: string;
  button_2_title_text_font_ios: string;
  button_2_title_text_fontsize: string;
  button_2_title_color_focused: string;
  button_2_login_type: string;
  button_2_custom_namespace: string;
  button_2_custom_token_key: string;
  button_2_custom_user_id: string;
  button_2_custom_subscription_price_key: string;
  button_2_custom_subscription_renews_date_key: string;
  button_2_custom_user_photo_url_key: string;

  button_logout_background_image: string;
  button_logout_background_color: string;
  button_logout_background_color_focused: string;
  button_logout_border: number;
  button_logout_border_color: string;
  button_logout_border_color_focused: string;
  button_logout_radius: number;
  button_logout_title_color: string;
  button_logout_title_text_font_android: string;
  button_logout_title_text_font_ios: string;
  button_logout_title_text_fontsize: string;
  button_logout_title_color_focused: string;

  debug_dummy_data_source: string;
};

type Title = {
  account_title: string;
  user_name_title: string;
  subscription_title: string;
  subscription_expiration_title: string;
  logout_title_text: string;
};

type ButtonProps = {
  id: string;
  onPress: () => void;
  titleText: string;
  styles: GeneralStyles;
  styleKey: string;
  groupId?: string;
  containerStyle?: object;
  focused?: boolean;
  parentFocus?: ParentFocus;
  nextFocusUp?: React.MutableRefObject<any>;
  nextFocusDown?: React.MutableRefObject<any>;
  shouldUsePreferredFocus?: boolean;
};

type LoginProps = {
  focused?: boolean;
  parentFocus: ParentFocus;
  styles: GeneralStyles;
  isLoggedIn: boolean;
  onLogin1: () => void;
  onLogin2: () => void;
  onLogout: () => void;
  localizations: {};
  titles: Title;
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
