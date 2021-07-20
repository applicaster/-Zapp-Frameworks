import * as React from "react";
import * as R from "ramda";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { pluginsManagerBridge } from "@applicaster/zapp-react-native-bridge/PluginManager";
import { componentsLogger } from "@applicaster/zapp-react-native-ui-components/Helpers/logger";
// import { handleStyleType } from "./Utils";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { useTheme } from "@applicaster/zapp-react-native-utils/theme";
import { useLocalizedStrings } from "@applicaster/zapp-react-native-utils/localizationUtils";
import { AccountInfo } from "../AccountInfo";
import { Button } from "../Button";
import { UserPhoto } from "../UserPhoto";
import {
  styleForLogin1Button,
  styleForLogin2Button,
  styleForLogoutButton,
  getStylesForTitleLabel,
  getStylesForDescriptionLabel,
} from "./Utils";
import { isTokenExist } from "../../utils/LoginHelper";
import { login, logout, getUserId, getSubscriptionData } from "../../mockData";
import { getScreenFromRivers } from "../../utils/PluginsHelper";

const logger = componentsLogger.addSubsystem(
  "quick-brick-user-account-ui-component"
);

type Props = {
  component: {
    id: string;
    styles: GeneralStyles;
    data: {
      plugin_identifier: string;
    };
    localizations: {};
  };
  rivers: any;
  navigator: any;
  onLoadFinished: any;
};

const componentStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#161b29FF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export function UserAccount(props: Props) {
  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const theme = useTheme();

  const newContainerStyleStyle = {
    ...componentStyles.containerStyle,
    paddingLeft: theme?.component_padding_left,
    paddingRight: theme?.component_padding_right,
    paddingBottom: theme?.component_margin_bottom,
  };

  const { component, onLoadFinished, rivers, navigator } = props;
  const { data, localizations, styles, id } = component;
  console.log({ data, localizations, styles, id, rivers, navigator });
  const {
    account_title = "Account",
    user_name_title = "User",
    subscription_title = "Subscription",
    subscription_expiration_title = "- renews",
    logout_title_text = "Logout",
    login_button_1_title_text = "Login 1",
    login_button_2_title_text = "Login 2",
  } = useLocalizedStrings({
    localizations,
  });

  const pluginIdentifier = data?.plugin_identifier;

  React.useEffect(() => {
    preparePlugin();
  }, []);

  async function preparePlugin() {
    const {
      login_button_2_enabled,
      login_type_button_1,
      custom_namespace_button_1,
      custom_token_key_button_1,
      login_type_button_2,
      custom_namespace_button_2,
      custom_token_key_button_2,
    } = styles;

    const userLogedIn = await isTokenExist({
      login_type_button_1,
      custom_namespace_button_1,
      custom_token_key_button_1,
      login_type_button_2: login_button_2_enabled ? login_type_button_2 : null,
      custom_namespace_button_2: login_button_2_enabled
        ? custom_namespace_button_2
        : null,
      custom_token_key_button_2: login_button_2_enabled
        ? custom_token_key_button_2
        : null,
    });
    console.log({ userLogedIn });
    setIsLogedIn(userLogedIn);
    onLoadFinished();
  }
  const styleLogin1Button = React.useCallback(
    () => styleForLogin1Button(styles),
    [styles]
  );

  const styleLogin2Button = React.useCallback(
    () => styleForLogin2Button(styles),
    [styles]
  );

  const styleLogoutButton = React.useCallback(
    () => styleForLogoutButton(styles),
    [styles]
  );

  const styleTitleLabel = React.useCallback(
    () => getStylesForTitleLabel(styles),
    [styles]
  );

  const styleDescriptionLabel = React.useCallback(
    () => getStylesForDescriptionLabel(styles),
    [styles]
  );

  const accoutInfoStyles = {
    logoutButtonStyles: styleLogoutButton(),
    labelStyles: {
      title_style: styleTitleLabel(),
      description_style: styleDescriptionLabel(),
    },
  };

  const accountTitles = {
    account_title,
    user_name_title: getUserId(user_name_title),
    subscription_title,
    subscription_expiration_title: getSubscriptionData(
      subscription_expiration_title
    ),
    logout_title_text,
  };
  // type ScreenData2 = {
  //   rivers: [string: ZappRiver];
  //   screenId?: string;
  //   login_type_button: string;
  // };

  //   login_type_button_2
  const onLogin1 = React.useCallback(async () => {
    const button_1_screen_id = styles?.button_1_screen_id;
    const login_type_button_1 = styles?.login_type_button_1;
    const custom_namespace_button_1 = styles?.custom_namespace_button_1;
    const custom_token_key_button_1 = styles?.custom_token_key_button_1;
    const plugin = getScreenFromRivers({
      rivers,
      screenId: button_1_screen_id,
      login_type_button: login_type_button_1,
      custom_namespace_button: custom_namespace_button_1,
      custom_token_key_button: custom_token_key_button_1,
    });
    navigator.push(plugin);
    // const result = await login();
    // if (result) {
    //   setIsLogedIn(true);
    // }
  }, []);

  const onLogin2 = React.useCallback(async () => {
    // const result = await login();
    // if (result) {
    //   setIsLogedIn(true);
    // }
    const button_2_screen_id = styles?.button_2_screen_id;
    const login_type_button_2 = styles?.login_type_button_2;
    const custom_namespace_button_2 = styles?.custom_namespace_button_2;
    const custom_token_key_button_2 = styles?.custom_token_key_button_2;
    const plugin = getScreenFromRivers({
      rivers,
      screenId: button_2_screen_id,
      login_type_button: login_type_button_2,
      custom_namespace_button: custom_namespace_button_2,
      custom_token_key_button: custom_token_key_button_2,
    });
    navigator.push(plugin);
  }, []);

  const onLogout = React.useCallback(async () => {
    const result = await logout();
    if (result) {
      setIsLogedIn(false);
    }
  }, []);

  const customContainerStyle = {
    height: 32,
    marginRight: 57,
    marginLeft: 57,
    marginBottom: 12,
  };

  function renderLoginFlow() {
    const login_button_2_enabled = styles?.login_button_2_enabled;
    console.log({ login_button_2_enabled });
    return (
      <>
        <UserPhoto imageSrc={styles?.user_image_placeholder} />
        <Button
          customContainerStyle={customContainerStyle}
          styles={styleLogin1Button()}
          id={"login_1"}
          onPress={onLogin1}
          titleText={login_button_1_title_text}
        />
        {login_button_2_enabled && (
          <Button
            customContainerStyle={customContainerStyle}
            styles={styleLogin2Button()}
            id={"login_2"}
            onPress={onLogin2}
            titleText={login_button_2_title_text}
          />
        )}
      </>
    );
  }
  return (
    <View style={newContainerStyleStyle}>
      {isLogedIn ? (
        <AccountInfo
          onLogoutPress={onLogout}
          user_image_placeholder={styles?.user_image_placeholder}
          styles={accoutInfoStyles}
          titles={accountTitles}
        />
      ) : (
        renderLoginFlow()
      )}
    </View>
  );
}
