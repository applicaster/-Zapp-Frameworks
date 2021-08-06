import * as R from "ramda";
import { logger } from "../../Services/LoggerService";

export const isAuthenticationRequired = ({ payload }) => {
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

export const isVideoEntry = (payload) => {
  const retVal = R.compose(
    R.equals("video"),
    R.path(["type", "value"])
  )(payload);

  logger.debug({
    message: `Payload entry is_video_entry: ${retVal}`,
    data: { is_video_entry: retVal },
  });

  return retVal;
};

export const isScreen = (payload) => {
  return !isVideoEntry(payload);
};
