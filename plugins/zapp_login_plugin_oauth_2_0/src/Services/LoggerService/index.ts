import XRayLogger from "@applicaster/quick-brick-xray";

const BaseSubsystem = "plugins/zapp_login_plugin_oauth_2_0";
const BaseCategories = {
  GENERAL: "general",
};

export const logger = new XRayLogger(BaseCategories.GENERAL, BaseSubsystem);
