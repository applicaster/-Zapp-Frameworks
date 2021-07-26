import * as React from "react";
import { View, StyleSheet } from "react-native";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { useTheme } from "@applicaster/zapp-react-native-utils/theme";
import { useLocalizedStrings } from "@applicaster/zapp-react-native-utils/localizationUtils";
import { AccountInfo } from "../AccountInfo";
import { Button } from "../Button";
import { UserPhoto } from "../UserPhoto";
import { logger } from "../../services/LoggerService";
import { InfoView } from "../InfoView";
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
  const logoutButtonId = "logout";

  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [button1Model, setButton1Model] =
    React.useState<LoginDataModel>(undefined);
  const [button2Model, setButton2Model] =
    React.useState<LoginDataModel>(undefined);

  const { component, onLoadFinished, rivers, navigator } = props;
  const { data, localizations, styles, id } = component;
  const button_2_login_enabled = styles?.button_2_login_enabled;

  const theme = useTheme();
  const custom_padding_top = Number(styles?.custom_padding_top) || 0;
  console.log({ custom_padding_top });
  const debug_dummy_data_source = styles?.debug_dummy_data_source === "on";
  const newContainerStyleStyle = {
    ...componentStyles.containerStyle,
    paddingLeft: theme?.component_padding_left,
    paddingRight: theme?.component_padding_right,
    paddingBottom: theme?.component_margin_bottom,
    paddingTop: custom_padding_top,
  };

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
    setIsLoading(true);
    preparePlugin();
  }, [navigator.previousAction]);

  React.useEffect(() => {
    let logedIn = false;
    console.log({ button1Model, button2Model });
    // if (button1Model === null && button2Model === null) {
    //   logger.error({
    //     message:
    //       "Error: both login buttons are empty, check plugin configuration",
    //     data: { localizations, styles },
    //   });
    // } else
    if (button1Model && button1Model?.token) {
      logedIn = true;
    } else if (button2Model && button2Model?.token) {
      logedIn = true;
    }
    logger.debug({
      message: `Login status changed, login 1 has token: ${!!button1Model?.token}, login 2 has token: ${!!button2Model?.token}`,
      data: { button1Model, button2Model },
    });
    setIsLogedIn(logedIn);
  }, [button1Model, button2Model]);

  async function preparePlugin() {
    try {
      logger.info({
        message: `preparePlugin: login button 2 is enabled: ${button_2_login_enabled}.`,
        data: { localizations, styles },
      });
      const buttonModel1 = await loginModelButton1(
        styles,
        debug_dummy_data_source
      );
      console.log({ buttonModel1 });
      setButton1Model(buttonModel1);

      if (button_2_login_enabled) {
        const button2Model = await loginModelButton2(
          styles,
          debug_dummy_data_source
        );
        setButton2Model(button2Model);
      }
      setIsLoading(false);
      onLoadFinished();
    } catch (error) {
      logger.error({
        message: `preparePlugin: error ${error.message}`,
        data: { error },
      });
    }
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

  const accountTitles = React.useCallback(() => {
    const model = loginDataModelByToken();
    if (!model) {
      return null;
    }

    console.log("accountTitles", { model, button1Model });
    return {
      account_title,
      user_name_title: model?.userId,
      subscription_title,
      subscription_expiration_title: getSubscriptionData(
        model,
        subscription_expiration_title
      ),
      logout_title_text,
    };
  }, [button1Model, button2Model]);

  const onLogin1 = React.useCallback(() => {
    console.log("onLogin1s", {
      button1Model,
      debug_dummy_data_source,
      isLogedIn,
      isLoading,
    });
    if (!debug_dummy_data_source) {
      const plugin = screenFromRivers({
        rivers,
        loginDataModel: button1Model,
      });
      logger.debug({
        message: `Login Button 1 was clicked ${button1Model?.title}`,
        data: { button1Model, plugin },
      });
      navigator.push(plugin);
    } else {
      setIsLogedIn(true);
    }
  }, [button1Model]);

  const onLogin2 = React.useCallback(() => {
    if (!debug_dummy_data_source) {
      const plugin = screenFromRivers({ rivers, loginDataModel: button2Model });
      logger.debug({
        message: `Login Button 2 was clicked ${button2Model.title}`,
        data: { button2Model, plugin },
      });
      navigator.push(plugin);
    } else {
      setIsLogedIn(true);
    }
  }, [button2Model]);

  const onLogout = React.useCallback(() => {
    if (!debug_dummy_data_source) {
      const model = loginDataModelByToken();
      if (!model) {
        const errorMessage = "Logout failed, no active model with token exist";
        logger.error({
          message: errorMessage,
          data: { button1Model, button2Model },
        });
        throw Error(errorMessage);
      }
      let plugin = screenFromRivers({ rivers, loginDataModel: model });
      logger.debug({
        message: `Logout Button was clicked ${model.title}`,
        data: { button1Model, button2Model, plugin },
      });
      navigator.push(plugin);
    } else {
      setIsLogedIn(false);
    }
  }, [button1Model, button2Model]);

  const loginDataModelByToken = React.useCallback((): LoginDataModel => {
    if (button1Model?.token) {
      return button1Model;
    } else if (button2Model?.token) {
      return button2Model;
    }
    return null;
  }, [button1Model, button2Model]);
  const titles = accountTitles();

  const renderLoginFlow = React.useCallback(() => {
    console.log({ titles });
    return (
      <>
        <UserPhoto imageSrc={styles?.user_image_placeholder} />
        {!isLogedIn && (
          <Button
            src={styles.button_1_background_image}
            styles={styleLogin1Button()}
            id={login1ButtonId}
            onPress={onLogin1}
            titleText={login_button_1_title_text}
          />
        )}
        {!isLogedIn && button_2_login_enabled && (
          <Button
            src={styles.button_2_background_image}
            styles={styleLogin2Button()}
            id={login2ButtonId}
            onPress={onLogin2}
            titleText={login_button_2_title_text}
          />
        )}
        {isLogedIn && (
          <InfoView
            styles={accoutInfoStyles?.labelStyles}
            titles={{
              description_text: titles?.user_name_title,
              title_text: null,
            }}
          />
        )}
        {isLogedIn && (
          <Button
            src={styles.button_logout_background_image}
            styles={styleLogoutButton()}
            id={logoutButtonId}
            onPress={onLogout}
            titleText={logout_title_text}
          />
        )}
      </>
    );
  }, [isLogedIn, button1Model, button2Model]);

  console.log("Render", { button1Model });
  return (
    <View style={newContainerStyleStyle}>
      {isLogedIn &&
      titles?.user_name_title &&
      titles?.subscription_expiration_title
        ? !isLoading && (
            <AccountInfo
              src={styles.button_logout_background_image}
              onLogoutPress={onLogout}
              user_image_placeholder={styles?.user_image_placeholder}
              styles={accoutInfoStyles}
              titles={titles}
            />
          )
        : !isLoading && renderLoginFlow()}
    </View>
  );
}
