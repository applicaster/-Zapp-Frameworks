import XRayLogger from "@applicaster/quick-brick-xray";

const BaseSubsystem = "plugins/quick-brick-user-account-ui-component";
const BaseCategories = {
  GENERAL: "general",
};

export const logger = new XRayLogger(BaseCategories.GENERAL, BaseSubsystem);
