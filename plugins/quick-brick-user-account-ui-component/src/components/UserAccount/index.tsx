import * as React from "react";
import * as R from "ramda";
import { View, StyleSheet } from "react-native";
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
  getSubscriptionData,
} from "./Utils";
import { loginModelButton1, loginModelButton2 } from "../../utils/DataUtils";
import { screenFromRivers } from "../../utils/ScreenUtils";

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
  const login1ButtonId = "login_1";
  const login2ButtonId = "login_2";

  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const [button1Model, setButton1Model] =
    React.useState<LoginDataModel>(undefined);
  const [button2Model, setButton2Model] =
    React.useState<LoginDataModel>(undefined);

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

  React.useEffect(() => {
    console.log("Prepare plugin");
  }, []);

  React.useEffect(() => {
    preparePlugin();
  }, [navigator.previousAction]);

  React.useEffect(() => {
    if (button1Model && button1Model.token) {
      setIsLogedIn(true);
    } else if (button2Model && button2Model.token) {
      setIsLogedIn(true);
    }
  }, [button1Model, button2Model]);

  async function preparePlugin() {
    const button1Model = await loginModelButton1(styles);
    const button2Model = await loginModelButton2(styles);

    setButton1Model(button1Model);
    setButton2Model(button2Model);

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

  function accountTitles() {
    const model = loginDataModelByToken();
    return {
      account_title,
      user_name_title: model.userId,
      subscription_title,
      subscription_expiration_title: getSubscriptionData(
        model,
        subscription_expiration_title
      ),
      logout_title_text,
    };
  }

  const onLogin1 = React.useCallback(async () => {
    const plugin = screenFromRivers({ rivers, loginDataModel: button1Model });
    navigator.push(plugin);
  }, []);

  const onLogin2 = React.useCallback(async () => {
    const plugin = screenFromRivers({ rivers, loginDataModel: button2Model });
    navigator.push(plugin);
  }, []);

  const onLogout = React.useCallback(async () => {
    const model = loginDataModelByToken();
    let plugin = screenFromRivers({ rivers, loginDataModel: model });

    navigator.push(plugin);
  }, []);

  function loginDataModelByToken(): LoginDataModel {
    if (button1Model?.token) {
      return button1Model;
    } else if (button2Model?.token) {
      return button2Model;
    }
  }

  function renderLoginFlow() {
    const login_button_2_enabled = styles?.button_2_login_enabled;
    console.log({ login_button_2_enabled });
    return (
      <>
        <UserPhoto imageSrc={styles?.user_image_placeholder} />
        <Button
          styles={styleLogin1Button()}
          id={login1ButtonId}
          onPress={onLogin1}
          titleText={login_button_1_title_text}
        />
        {login_button_2_enabled && (
          <Button
            styles={styleLogin2Button()}
            id={login2ButtonId}
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
          titles={accountTitles()}
        />
      ) : (
        renderLoginFlow()
      )}
    </View>
  );
}
