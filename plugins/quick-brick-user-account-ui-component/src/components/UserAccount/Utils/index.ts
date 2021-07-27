const buttonKey = "button";
const labelKey = "info_label";

export function styleForLogin1Button(styles: GeneralStyles): ButtonStyles {
  return getStylesForButton(styles, `${buttonKey}_1_`);
}

export function styleForLogin2Button(styles: GeneralStyles): ButtonStyles {
  return getStylesForButton(styles, `${buttonKey}_2_`);
}

export function styleForLogoutButton(styles: GeneralStyles): ButtonStyles {
  return getStylesForButton(styles, `${buttonKey}_logout_`);
}

function getStylesForButton(styles: Styles, key: string): ButtonStyles {
  return {
    containerStyle: {
      background_color_focused: styles[`${key}background_color_focused`],
      background_color: styles[`${key}background_color`],
      radius: styles[`${key}radius`],
      border: styles[`${key}border`],
      border_color: styles[`${key}border_color`],
      border_color_focused: styles[`${key}border_color_focused`],
    },
    labelStyles: {
      title_color_focused: styles[`${key}title_color_focused`],
      title_color: styles[`${key}title_color`],
      title_text_fontsize: styles[`${key}title_text_fontsize`],
      title_text_font_ios: styles[`${key}title_text_font_ios`],
      title_text_font_android: styles[`${key}title_text_font_android`],
    },
  };
}

export function getStylesForTitleLabel(styles: Styles): LabelStyles {
  return getStylesForLabele(styles, `${labelKey}_`);
}

export function getStylesForDescriptionLabel(styles: Styles): LabelStyles {
  return getStylesForLabele(styles, `${labelKey}_description_`);
}

function getStylesForLabele(styles: Styles, key: string): LabelStyles {
  return {
    title_color: styles[`${key}title_color`],
    title_text_fontsize: styles[`${key}title_text_fontsize`],
    title_text_font_ios: styles[`${key}title_text_font_ios`],
    title_text_font_android: styles[`${key}title_text_font_android`],
  };
}

export function getSubscriptionData(
  model: LoginDataModel,
  subscription_expiration_title
): string {
  const subscriptionPrice = model?.subscriptionPrice;
  const subscriptionRenewsDate = model?.subscriptionRenewsDate;

  if (!subscriptionPrice && !subscriptionRenewsDate) {
    return null;
  }
  return `${subscriptionPrice} ${subscription_expiration_title} ${subscriptionRenewsDate}`;
}
