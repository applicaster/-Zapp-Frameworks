import * as React from "react";
import { View } from "react-native";

import { useTheme } from "@applicaster/zapp-react-native-utils/theme";
import { useLocalizedStrings } from "@applicaster/zapp-react-native-utils/localizationUtils";

import { AccountInfo } from "../AccountInfo";
import { LoginFlow } from "./LoginFlow";
import { logger } from "../../services/LoggerService";
import { getSubscriptionData } from "./Utils";
import { loginModelButton1, loginModelButton2 } from "../../utils/DataUtils";
import { screenFromRivers } from "../../utils/ScreenUtils";
import { ScreenLayoutContext } from "@applicaster/zapp-react-native-ui-components/Contexts/ScreenLayoutContext";
import {
  mimicLoginForDummy1,
  mimicLoginForDummy2,
  mimicLogout,
} from "../../debug/Stubs";
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
  focused: boolean;
  parentFocus: ParentFocus;
};

const componentStyles = {
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
  },
};

export function UserAccount(props: Props) {
  const groupId = "quick-brick-user-account-comp";

  const focused = props?.focused;
  const parentFocus = props?.parentFocus;
  const screenLayout = React.useContext(ScreenLayoutContext);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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
    subscription_title = "Subscription",
    subscription_expiration_title = "- renews",
    logout_title_text = "Logout",
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
  }, [button1Model?.token, button2Model?.token]);

  const preparePlugin = React.useCallback(async () => {
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
  }, [isLoading, isLoggedIn, button1Model, button2Model]);

  React.useEffect(() => {
    setIsLoading(true);
    preparePlugin();
  }, [navigator.previousAction]);

  React.useEffect(() => {
    let loggedIn = false;

    if (button1Model === null && button2Model === null) {
      logger.error({
        message:
          "Error: both login buttons are empty, check plugin configuration",
        data: { localizations, styles },
      });
    } else if (button1Model && button1Model?.token) {
      loggedIn = true;
    } else if (button2Model && button2Model?.token) {
      loggedIn = true;
    }

    logger.debug({
      message: `Login status changed, login 1 has token: ${!!button1Model?.token}, login 2 has token: ${!!button2Model?.token}`,
      data: { button1Model, button2Model },
    });

    setIsLoggedIn(loggedIn);
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

  function pushScreenPlugin(plugin) {
    navigator.push({ ...plugin, presented_by_user_account: true });
  }

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
    pushScreenPlugin(plugin);
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
    pushScreenPlugin(plugin);
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

    pushScreenPlugin(plugin);
  }, [button1Model, button2Model]);

  const titles = accountTitles();

  const renderLoginFlow = () => {
    if (!isLoading) {
      return (
        <LoginFlow
          {...{
            styles,
            isLoggedIn,
            onLogin1,
            onLogin2,
            groupId,
            localizations,
            titles,
            onLogout,
            focused,
            parentFocus,
          }}
        />
      );
    }
    return null;
  };

  const renderAccountInfo = () => {
    if (!isLoading) {
      return (
        <AccountInfo
          src={styles.button_logout_background_image}
          onLogoutPress={onLogout}
          user_image_placeholder={styles?.user_image_placeholder}
          styles={styles}
          titles={titles}
        />
      );
      return null;
    }
  };

  const shouldPresentAccountInfo =
    isLoggedIn &&
    titles?.user_name_title &&
    titles?.subscription_expiration_title;

  return (
    <View style={newContainerStyleStyle}>
      {shouldPresentAccountInfo ? renderAccountInfo() : renderLoginFlow()}
    </View>
  );
}
