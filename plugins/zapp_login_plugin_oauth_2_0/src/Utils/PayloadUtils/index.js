import * as R from "ramda";
import { logger } from "../../Services/LoggerService";

export const isAuthenticationRequired = ({ payload }) => {
  const screen = isScreen(payload);
  if (!payload) {
    logger.debug({
      message: `Payload entry is requires_authentication: true`,
      data: {
        requires_authentication: true,
      },
    });
    return true;
  }

  if (screen) {
    logger.debug({
      message: `Payload entry is requires_authentication: ${true}`,
      data: {
        requires_authentication: true,
        isScreen: screen,
      },
    });
    return true;
  }

  const requires_authentication = R.path([
    "extensions",
    "requires_authentication",
  ])(payload);

  logger.debug({
    message: `Payload entry is requires_authentication: ${requires_authentication}`,
    data: {
      requires_authentication: requires_authentication,
    },
  });

  return requires_authentication ? true : false;
};

export const isScreen = (payload) => {
  return !!payload?.name;
};
