const buttonKey = "button";
const labelKey = "info_label";

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
