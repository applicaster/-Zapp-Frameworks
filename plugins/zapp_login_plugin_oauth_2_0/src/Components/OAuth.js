import React, { useState, useLayoutEffect } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  useWindowDimensions,
} from "react-native";

import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import { getLocalizations } from "../Utils/Localizations";
import { isVideoEntry, isAuthenticationRequired } from "../Utils/PayloadUtils";
import LoadingScreen from "./LoadingScreen";
import {
  clientLogoView,
  containerStyle,
  safeAreaStyle,
  backgroundImageStyle,
} from "./Styles";
import TitleLabel from "./UIComponents/TitleLabel";
import ClientLogo from "./UIComponents/ClientLogo";
import ActionButton from "./UIComponents/Buttons/ActionButton.js";
import BackButton from "./UIComponents/Buttons/BackButton";
import {
  showAlertLogout,
  showAlertLogin,
  getRiversProp,
  PresentationTypeData,
} from "../Utils/Helpers";
import {
  authorizeService,
  revokeService,
  checkUserAuthorization,
} from "../Services/OAuth2Service";

import { getStyles } from "../Utils/Customization";
import { isHook } from "../Utils/UserAccount";
import { logger } from "../Services/LoggerService";
import { getConfig } from "../Services/Providers";

const OAuth = (props) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const navigator = useNavigation();
  const [screenType, setScreenType] = useState(PresentationTypeData.UNDEFINED);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { callback, payload, rivers, screenData } = props;
  const presented_by_user_account =
    screenData?.presented_by_user_account || false;
  console.log({ payload, props, presented_by_user_account });
  const localizations = getRiversProp("localizations", rivers);
  const styles = getRiversProp("styles", rivers);

  const screenStyles = getStyles(styles);
  const screenLocalizations = getLocalizations(localizations);
  const oAuthConfig = getConfig({ configuration: props?.configuration });
  const session_storage_key = props?.session_storage_key;
  const isScreenHook = isHook(navigator);

  const {
    logout_text,
    login_text,
    title_text,
    subtitle_text,
    back_button_text,
  } = screenLocalizations;

  let stillMounted = true;

  useLayoutEffect(() => {
    const configuration = props?.configuration;

    logger.debug({
      message: `Starting OAuth Plugin`,
      data: {
        configuration,
      },
    });

    setupEnvironment();
    return () => {
      stillMounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    invokeScreenType();
  }, [screenType]);

  const invokeScreenType = React.useCallback(async () => {
    const authenticated = await checkUserAuthorization(
      oAuthConfig,
      session_storage_key
    );

    switch (screenType) {
      case PresentationTypeData.USER_ACCOUNT:
        await invokeUserAccount(authenticated);
        break;

      case PresentationTypeData.SCREEN:
        await invokeScreen(authenticated);

        break;

      case PresentationTypeData.SCREEN_HOOK:
        await invokeScreenHook(authenticated);
        break;
      case PresentationTypeData.PLAYER_HOOK:
        invokePlayerHook(authenticated);
        break;
      default:
        break;
    }
  }, [screenType]);

  const invokeScreenHook = React.useCallback(
    async (authenticated) => {
      logger.debug({
        message: `invokeScreenHook: Start authenticated: ${authenticated}`,
        data: {
          authenticated,
        },
      });

      if (authenticated) {
        logger.debug({
          message: `invokeScreenHook: Finished authenticated: ${authenticated}, closing hook`,
          data: {
            authenticated,
          },
        });
        callback && callback({ success: true, error: null, payload: payload });
        return;
      }

      if (!oAuthConfig) {
        logger.error({
          message: `invokeScreenHook: Fail, closing hook. No oAuthConfig params. Check oAuth params in plugin config`,
          data: {
            authenticated,
          },
        });

        callback && callback({ success: false, error, payload });
        return;
      }

      logger.debug({
        message: `invokeScreenHook: Finished authenticated: ${authenticated}, presenting Login`,
        data: {
          authenticated,
        },
      });
      stillMounted && setIsUserAuthenticated(authenticated);
      stillMounted && setLoading(false);
    },
    [screenType]
  );

  const invokePlayerHook = React.useCallback(
    async (authenticated) => {
      const testEnvironmentEnabled =
        props?.configuration?.force_authentication_on_all || "off";
      const authenticationRequired =
        testEnvironmentEnabled === "on" ||
        isAuthenticationRequired({ payload });

      logger.debug({
        message: `invokePlayerHook: Start authenticated: ${authenticated}`,
        data: {
          authenticated,
          testEnvironmentEnabled,
          authenticationRequired,
        },
      });

      if (authenticationRequired === false) {
        logger.debug({
          message: `invokePlayerHook: Finished authenticating not requiered, closing hook`,
          data: {
            authenticated,
          },
        });
        callback && callback({ success: true, error: null, payload: payload });
        return;
      }

      if (authenticated) {
        logger.debug({
          message: `invokePlayerHook: Finished authenticated: ${authenticated}, closing hook no login needed`,
          data: {
            authenticated,
          },
        });
        callback && callback({ success: true, error: null, payload: payload });
        return;
      }

      if (!oAuthConfig) {
        logger.error({
          message: `invokePlayerHook: Fail, closing hook. No oAuthConfig params. Check oAuth params in plugin config`,
          data: {
            authenticated,
          },
        });
        callback && callback({ success: false, error, payload });
        return;
      }

      logger.debug({
        message: `invokePlayerHook: Finished authenticated: ${authenticated}, presenting Login`,
        data: {
          authenticated,
        },
      });

      stillMounted && setIsUserAuthenticated(authenticated);
      stillMounted && setLoading(false);
    },
    [screenType]
  );

  const invokeScreen = React.useCallback(
    async (authenticated) => {
      logger.debug({
        message: `invokeScreen: Start authenticated: ${authenticated}`,
        data: {
          authenticated,
        },
      });

      if (!oAuthConfig) {
        logger.error({
          message: `invokeScreen: Fail, closing hook. No oAuthConfig params. Check oAuth params in plugin config`,
          data: {
            authenticated,
          },
        });
        return;
      }

      logger.debug({
        message: `invokeScreen: Finished authenticated: ${authenticated}, presenting Login`,
        data: {
          authenticated,
        },
      });

      stillMounted && setIsUserAuthenticated(authenticated);
      stillMounted && setLoading(false);
    },
    [screenType]
  );

  const invokeUserAccount = React.useCallback(
    async (authenticated) => {
      logger.debug({
        message: `invokeUserAccount: Start authenticated: ${authenticated}`,
        data: {
          authenticated,
        },
      });
      const logout_completion_action =
        props?.configuration?.logout_completion_action;
      function performPostLogoutAction() {
        if (logout_completion_action === "go_home") {
          navigator.goHome();
          return;
        }
      }

      if (authenticated) {
        logger.debug({
          message: `invokeUserAccount: Perform Logout`,
          data: {
            authenticated,
          },
        });
        await performLogout();
        console.log("logout finished");
        performPostLogoutAction();
        logger.debug({
          message: `invokeUserAccount: Perform Login finished`,
          data: {
            authenticated,
            logout_completion_action,
          },
        });
      } else {
        logger.debug({
          message: `invokeUserAccount: Perform Login`,
          data: {
            authenticated,
          },
        });
        await performLogin();

        logger.debug({
          message: `invokeUserAccount: Perform Login finished`,
          data: {
            authenticated,
          },
        });
      }
      stillMounted && setLoading(false);
      navigator.goBack();
    },
    [screenType]
  );

  const setupEnvironment = React.useCallback(async () => {
    const videoEntry = isVideoEntry(payload);

    if (presented_by_user_account) {
      stillMounted && setScreenType(PresentationTypeData.USER_ACCOUNT);
      return;
    }

    if (isScreenHook) {
      if (videoEntry) {
        stillMounted && setScreenType(PresentationTypeData.PLAYER_HOOK);
      }
      stillMounted && setScreenType(PresentationTypeData.SCREEN_HOOK);

      return;
    }
    stillMounted && setScreenType(PresentationTypeData.SCREEN);
  }, [isUserAuthenticated]);

  const performLogout = React.useCallback(async () => {
    const success = await revokeService(oAuthConfig, session_storage_key);
    const authenticated = await checkUserAuthorization(
      oAuthConfig,
      session_storage_key
    );

    logger.debug({
      message: `onPressActionButton: Logout Success`,
      data: {
        success,
        authenticated,
        screenType,
      },
    });

    showAlertLogout(success, screenLocalizations);
    setIsUserAuthenticated(authenticated);
  }, [isUserAuthenticated, screenType]);

  const performLogin = React.useCallback(async () => {
    const success = await authorizeService(oAuthConfig, session_storage_key);
    const authenticated = await checkUserAuthorization(
      oAuthConfig,
      session_storage_key
    );

    logger.debug({
      message: `onPressActionButton: Login Success`,
      data: {
        success,
        authenticated,
        screenType,
      },
    });

    setIsUserAuthenticated(authenticated);
    if (authenticated) {
      if (screenType === PresentationTypeData.SCREEN_HOOK) {
        logger.debug({
          message: `onPressActionButton: OAuth finished`,
          data: {
            success,
            authenticated,
            screenType,
          },
        });

        callback && callback({ success: true, error: null, payload: payload });
      } else {
        showAlertLogin(success, screenLocalizations);
      }
    } else {
      showAlertLogin(success, screenLocalizations);
    }
  }, [isUserAuthenticated, screenType]);

  const onPressActionButton = React.useCallback(async () => {
    setLoading(true);
    if (isUserAuthenticated) {
      await performLogout();
    } else {
      await performLogin();
    }
    setLoading(false);
  }, [isUserAuthenticated, screenType]);

  const onBackButton = () => {
    if (callback) {
      callback({ success: false, error: null, payload });
    } else {
      navigator.goBack();
    }
  };

  const SafeArea = Platform.isTV ? View : SafeAreaView;
  const allow_screen_plugin_presentation =
    props?.screenData?.general?.allow_screen_plugin_presentation;

  const isBackButtonDisabled =
    !(
      screenType === PresentationTypeData.SCREEN_HOOK ||
      screenStyles?.back_button_force_display ||
      navigator.canGoBack()
    ) ||
    (navigator.canGoBack() && allow_screen_plugin_presentation === false);

  return (
    <>
      {screenType === PresentationTypeData.UNDEFINED ? null : (
        <ImageBackground
          style={backgroundImageStyle(
            screenStyles,
            screenType,
            windowWidth,
            windowHeight
          )}
          source={{ uri: screenStyles.background_image }}
        />
      )}
      <SafeArea style={safeAreaStyle}>
        {screenType === PresentationTypeData.UNDEFINED || loading ? null : (
          <View style={containerStyle}>
            <BackButton
              title={back_button_text}
              disabled={isBackButtonDisabled}
              screenStyles={screenStyles}
              onPress={onBackButton}
            />
            <TitleLabel
              screenStyles={screenStyles}
              title={title_text}
              subtitle={subtitle_text}
            />
            <View
              style={[
                clientLogoView.default,
                clientLogoView[screenStyles?.client_logo_position],
              ]}
            >
              <ClientLogo imageSrc={screenStyles.client_logo} />
            </View>
            <ActionButton
              screenStyles={screenStyles}
              title={isUserAuthenticated ? logout_text : login_text}
              onPress={onPressActionButton}
            />
          </View>
        )}
        {loading && <LoadingScreen />}
      </SafeArea>
    </>
  );
};

export default OAuth;
