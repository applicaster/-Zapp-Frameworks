import * as React from "react";
import { View, StyleSheet, NativeModules } from "react-native";
import { useTheme } from "@applicaster/zapp-react-native-utils/theme";
import { useLocalizedStrings } from "@applicaster/zapp-react-native-utils/localizationUtils";
import { AccountInfo } from "../AccountInfo";
import { Button } from "../Button";
import { UserPhoto } from "../UserPhoto";
import { logger } from "../../services/LoggerService";
import { getSubscriptionData } from "./Utils";
import { loginModelButton1, loginModelButton2 } from "../../utils/DataUtils";
import { TextView } from "../TextView";
import { screenFromRivers } from "../../utils/ScreenUtils";
import { ScreenLayoutContext } from "@applicaster/zapp-react-native-ui-components/Contexts/ScreenLayoutContext";
import {
  mimicLoginForDummy1,
  mimicLoginForDummy2,
  mimicLogout,
} from "../../debug/Stubs";
// NativeModules.DevSettings.setIsDebuggingRemotely(true);
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

const componentStyles = {
  // eslint-disable-next-line react-native/no-color-literals
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export function UserAccount(props: Props) {
  const login1ButtonId = "button_1";
  const login2ButtonId = "button_2";
  const logoutButtonId = "button_logout";
  const logoutButtonBigId = "button_logout_big";

  const screenLayout = React.useContext(ScreenLayoutContext);
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
  const custom_margin_top = Number(styles?.custom_margin_top) || 150;
  const debug_dummy_data_source = styles?.debug_dummy_data_source === "on";

  const newContainerStyleStyle: any = {
    ...componentStyles.containerStyle,
    paddingLeft: theme?.component_padding_left,
    paddingRight: theme?.component_padding_right,
    paddingBottom: theme?.component_margin_bottom,
    marginTop: custom_margin_top,
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

  const loginDataModelByToken = React.useCallback((): LoginDataModel => {
    if (button1Model?.token) {
      return button1Model;
    } else if (button2Model?.token) {
      return button2Model;
    }

    return null;
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

  React.useEffect(() => {
    setIsLoading(true);
    preparePlugin();
  }, [navigator.previousAction]);

  React.useEffect(() => {
    let logedIn = false;

    if (button1Model === null && button2Model === null) {
      logger.error({
        message:
          "Error: both login buttons are empty, check plugin configuration",
        data: { localizations, styles },
      });
    } else if (button1Model && button1Model?.token) {
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

  const accountTitles = React.useCallback(() => {
    const model = loginDataModelByToken();

    if (!model) {
      return null;
    }

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

  const onLogin1 = React.useCallback(async () => {
    if (debug_dummy_data_source) {
      await mimicLoginForDummy1();
      preparePlugin();

      return;
    }

    const plugin = screenFromRivers({
      rivers,
      loginDataModel: button1Model,
    });

    if (!plugin) {
      logger.error({
        message: `Screen for login type: ${button1Model?.title} not exist. Check screen of the plugin created in zapp layout`,
        data: { button1Model },
      });

      return;
    }

    logger.debug({
      message: `Login Button 1 was clicked ${button1Model?.title}`,
      data: { button1Model, plugin },
    });

    navigator.push(plugin);
  }, [button1Model]);

  const onLogin2 = React.useCallback(async () => {
    if (debug_dummy_data_source) {
      await mimicLoginForDummy2();
      preparePlugin();

      return;
    }

    const plugin = screenFromRivers({ rivers, loginDataModel: button2Model });

    logger.debug({
      message: `Login Button 2 was clicked ${button2Model.title}`,
      data: { button2Model, plugin },
    });

    navigator.push(plugin);
  }, [button2Model]);

  const onLogout = React.useCallback(async () => {
    if (debug_dummy_data_source) {
      await mimicLogout();
      preparePlugin();

      return;
    }

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
  }, [button1Model, button2Model]);

  const titles = accountTitles();

  const renderLoginFlow = React.useCallback(() => {
    return (
      <>
        <UserPhoto styles={styles} imageSrc={styles?.user_image_placeholder} />
        {!isLogedIn && (
          <Button
            styleKey={login1ButtonId}
            styles={styles}
            id={login1ButtonId}
            onPress={onLogin1}
            titleText={login_button_1_title_text}
          />
        )}
        {!isLogedIn && button_2_login_enabled && (
          <Button
            styleKey={login2ButtonId}
            styles={styles}
            id={login2ButtonId}
            onPress={onLogin2}
            titleText={login_button_2_title_text}
          />
        )}
        {isLogedIn && (
          <TextView
            styleKey={"info_label_description"}
            styles={styles}
            titleText={titles?.user_name_title}
          />
        )}
        {isLogedIn && (
          <Button
            styleKey={logoutButtonBigId}
            styles={styles}
            id={logoutButtonId}
            onPress={onLogout}
            titleText={logout_title_text}
          />
        )}
      </>
    );
  }, [isLogedIn, button1Model, button2Model]);

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
              styles={styles}
              titles={titles}
            />
          )
        : !isLoading && renderLoginFlow()}
    </View>
  );
}
