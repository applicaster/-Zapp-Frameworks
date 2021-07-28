import * as R from "ramda";
import {
  createLogger,
  BaseSubsystem,
  BaseCategories,
  XRayLogLevel,
} from "../../Services/LoggerService";

export const logger = createLogger({
  subsystem: BaseSubsystem,
  category: BaseCategories.PAYLOAD_HELPER,
});

export const isAuthenticationRequired = ({ payload }) => {
  const requires_authentication = R.path([
    "extensions",
    "requires_authentication",
  ])(payload);

  logger.debug({
    message: `setupEnvironment: Hook finished, no authentefication required, skipping`,
    data: { requires_authentication }
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
    data: { is_video_entry: retVal }
  });

  return retVal;
};
