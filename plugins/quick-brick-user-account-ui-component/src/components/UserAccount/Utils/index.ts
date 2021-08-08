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
