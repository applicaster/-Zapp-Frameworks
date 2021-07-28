export function screenFromRivers(data: ScreenData): ZappRiver {
  console.log({ data });
  const values: ZappRiver[] = Object.values(data.rivers);
  console.log({ values });
  const screenId = data?.loginDataModel?.keysModel?.screenId;
  console.log({ screenId });

  const pluginIdentifier = data?.loginDataModel?.keysModel?.namespace;
  console.log({ pluginIdentifier });

  const river = values.find((item) => {
    return findRiver(item, pluginIdentifier, screenId);
  });

  return river;
}

function findRiver(
  riverItem: ZappRiver,
  pluginIdentifier: string,
  screenId?: string
) {
  console.log({ riverItem, pluginIdentifier, screenId });
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
