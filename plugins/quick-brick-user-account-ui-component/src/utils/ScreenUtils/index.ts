function findRiver(
  riverItem: ZappRiver,
  pluginIdentifier: string,
  screenId?: string
) {
  const pluginTypeLogin = "login";

  if (!riverItem?.type) {
    return false;
  }

  if (riverItem.plugin_type !== pluginTypeLogin) {
    return false;
  }

  if (riverItem.type !== pluginIdentifier) {
    return false;
  }

  return screenId ? riverItem.id === screenId : true;
}

export function screenFromRivers(data: ScreenData): ZappRiver {
  const values: ZappRiver[] = Object.values(data.rivers);
  const screenId = data?.loginDataModel?.keysModel?.screenId;
  const pluginIdentifier = data?.loginDataModel?.keysModel?.namespace;

  const river = values.find((item) => {
    return findRiver(item, pluginIdentifier, screenId);
  });

  return river;
}
