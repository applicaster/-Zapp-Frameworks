const baseManifest = {
  api: {},
  dependency_repository_url: [],
  author_name: "Applicaster",
  author_email: "zapp@applicaster.com",
  name: "Quickline Kaltura Auth",
  description: "Perform Kaltura device registration on Quickline TV Box",
  type: "login",
  screen: false,
  react_native: true, // needed to trigger install
  ui_builder_support: true,
  whitelisted_account_ids: [],
  ui_frameworks: ["quickbrick"],
  min_zapp_sdk: "1.0.0",
  deprecated_since_zapp_sdk: "",
  unsupported_since_zapp_sdk: "",
  custom_configuration_fields: [],
  identifier: "quickline-kaltura-authentication",
  npm_dependencies: [],
};

function createManifest({ version, platform }) {
  const manifest = {
    ...baseManifest,
    platform,
    manifest_version: version,
    min_zapp_sdk: min_zapp_sdk[platform],
    api: api[platform],
    npm_dependencies: [`@applicaster/quickline-kaltura-authentication@${version}`],
    project_dependencies: project_dependencies[platform],
    targets: targets[platform],
    custom_configuration_fields: custom_configuration_fields[platform],
  };
  return manifest;
}

const custom_configuration_fields_apple = [
  {
    key: "kaltura_partner_id",
    type: "text",
    label: "Kaltura partner ID",
    default: "",
    tooltip_text: "Kaltura partner ID"
  },
  {
    key: "kaltura_api_endpoint",
    type: "text",
    label: "Kaptura endpoint",
    default: "https://api.frs1.ott.kaltura.com/api_v3/",
    tooltip_text: "Kaltura API endpoint"
  }
];

const custom_configuration_fields_android = custom_configuration_fields_apple;

const custom_configuration_fields = {
  android_for_quickbrick: custom_configuration_fields_android,
  android_tv_for_quickbrick: custom_configuration_fields_android,
};

const min_zapp_sdk = {
  android_for_quickbrick: "7.0.0",
  android_tv_for_quickbrick: "7.0.0",
};

const project_dependencies_android = [
  {
    "quickline-kaltura-authentication": "node_modules/@applicaster/quickline-kaltura-authentication/android",
  },
];

const project_dependencies = {
  android_for_quickbrick: project_dependencies_android,
  android_tv_for_quickbrick: project_dependencies_android,
};

const api_android = {
    require_startup_execution: true,
    class_name: "com.applicaster.quickline.auth.QuickLineAuth",
}

const api = {
  android_for_quickbrick: api_android,
  android_tv_for_quickbrick: api_android,
};

const mobileTarget = ["mobile"];
const tvTarget = ["tv"];
const targets = {
  android_for_quickbrick: mobileTarget,
  android_tv_for_quickbrick: tvTarget,
};

module.exports = createManifest;
