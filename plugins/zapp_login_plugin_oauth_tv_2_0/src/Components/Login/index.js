// @flow
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigation } from "@applicaster/zapp-react-native-utils/reactHooks/navigation";
import * as R from "ramda";
import IntroScreen from "../IntroScreen";
import SignInScreen from "../SignInScreen";
import LogoutScreen from "../LogoutScreen";
import LoadingScreen from "../LoadingScreen";
import XRayLogger from "@applicaster/quick-brick-xray";
import {
  ScreenData,
  getRiversProp,
  isLoginRequired,
  isPlayerHook,
  showAlert,
  refreshToken,
} from "./utils";
import { BaseSubsystem, BaseCategories } from "../../Services/LoggerService";
import { getStyles } from "../../Utils/Customization";
import { getLocalizations } from "../../Utils/Localizations";
import { isAuthenticationRequired } from "../../Utils/PayloadUtils";

const logger = new XRayLogger(BaseCategories.GENERAL, BaseSubsystem);
console.disableYellowBox = true;

export const OAuth = (props) => {
  const navigator = useNavigation();
  const [screen, setScreen] = useState(ScreenData.LOADING);
  const [styles, setStyles] = useState({});
  const [localizations, setLocalizations] = useState({});

  const [forceFocus, setForceFocus] = useState(false);
  const { 
    callback,
    payload,
    rivers,
    configuration, 
    hookPlugin,
    screenData
  } = props;

  const handleScreenData = () => {
    const setScreenData = (styles, localizations) => {
      setStyles(getStyles(styles));
      setLocalizations(getLocalizations(localizations));
    }

    if (hookPlugin) {
      const { styles, localizations } = hookPlugin;
      setScreenData(styles, localizations)
      return;
    }

    if (screenData) {
      const { styles, localizations } = screenData;
      setScreenData(styles, localizations)
      return;
    }

    const screenType = navigator?.currentRoute.replace("/hook/", "");
    const { id: screenId } = R.find(R.propEq('type', screenType))(R.values(rivers));
    const styles = getRiversProp("styles", rivers, screenId);

    setScreenData(styles, localizations)
  }
  
  const mounted = useRef(true);
  const isPrehook = !!props?.callback;

  useEffect(() => {
    mounted.current = true;

    setupEnvironment();
    handleScreenData();
    return () => {
      mounted.current = false;
    };
  }, []);

  async function setupEnvironment() {
    try {
      const playerHook = isPlayerHook(props?.payload);
      const testEnvironmentEnabled = configuration?.force_authentication_on_all || "off";

      if (
        playerHook === true &&
        testEnvironmentEnabled === "off" &&
        isAuthenticationRequired({payload}) === false
      ) {
        logger.debug({
          message: `setupEnvironment: Hook finished, no authentefication required, skipping`,
        });

        mounted.current &&
          callback &&
          callback({
            success: true,
            error: null,
            payload,
          });
        return;
      }
      const userNeedsToLogin = await isLoginRequired();

      if (userNeedsToLogin) {
        logger.debug({
          message: "setupEnvironment: Presenting login screen",
          data: { userNeedsToLogin },
        });
        if (playerHook) {
          mounted.current && setScreen(ScreenData.LOG_IN);
        } else {
          mounted.current && setScreen(ScreenData.INTRO);
        }
      } else {
        const success = await refreshToken(configuration);
        logger.debug({
          message: `setupEnvironment: Hook finished, refresh Token completed: ${success}`,
          data: { userNeedsToLogin, success },
        });

        if (success) {
          if (isPrehook) {
            mounted.current &&
              callback &&
              callback({ success: true, error: null, payload });
          } else {
            mounted.current && setScreen(ScreenData.LOG_OUT);
          }
        } else {
          // await removeDataFromStorages();

          if (playerHook) {
            mounted.current && setScreen(ScreenData.LOG_IN);
          } else {
            mounted.current && setScreen(ScreenData.INTRO);
          }
        }
      }
    } catch (error) {
      logger.error({
        message: `setupEnvironment: Error, ${error?.message}`,
        data: { error },
      });
      mounted.current && setScreen(ScreenData.INTRO);

      showAlert(
        localizations?.general_error_title,
        localizations?.general_error_message
      );
    }
  }

  function goToScreen(screen, forceFocus, changeFocus) {
    if (!changeFocus) {
      setScreen(screen);
      setForceFocus(forceFocus);
    } else {
      setForceFocus(forceFocus);
    }
  }

  function renderScreen() {
    const {
      payload,
      configuration,
      focused,
      parentFocus,
      screenData
    } = props;

    const getGroupId = () => {
      if (screenData) {
        return screenData.groupId;
      }
      if (payload) {
        return payload.groupId;
      }
    };

    const screenOptions = {
      segmentKey: null,
      groupId: getGroupId(),
      isPrehook: isPrehook,
      goToScreen: goToScreen,
    };

    function onMaybeLater() {
      const playerHook = isPlayerHook(payload);
      const success = playerHook ? false : true;
      callback &&
        callback({
          success: success,
          error: null,
          payload,
        });
    }

    function onSignedIn() {
      callback &&
        callback({
          success: true,
          error: null,
          payload,
        });
    }

    function onMenuButtonClickedSignIn() {
      const playerHook = isPlayerHook(props?.payload);
      if (playerHook) {
        callback &&
          callback({
            success: false,
            error: null,
            payload,
          });
      } else {
        goToScreen(ScreenData.INTRO);
      }
    }

    switch (screen) {
      case ScreenData.LOADING: {
        return <LoadingScreen {...screenOptions} />;
      }
      case ScreenData.INTRO: {
        return (
          <IntroScreen
            {...screenOptions}
            screenStyles={styles}
            screenLocalizations={localizations}
            parentFocus={parentFocus}
            focused={focused}
            forceFocus={forceFocus}
            onSignedIn={onSignedIn}
          />
        );
      }
      case ScreenData.LOG_OUT: {
        return (
          <LogoutScreen
            {...screenOptions}
            configuration={configuration}
            screenStyles={styles}
            screenLocalizations={localizations}
            parentFocus={parentFocus}
            focused={focused}
            forceFocus={forceFocus}
          />
        );
      }
      case ScreenData.LOG_IN: {
        return (
          <SignInScreen
            {...screenOptions}
            configuration={configuration}
            screenStyles={styles}
            screenLocalizations={localizations}
            onSignedIn={onSignedIn}
            onMenuButtonClicked={onMenuButtonClickedSignIn}
            onMaybeLater={onMaybeLater}
          />
        );
      }
    }
  }
  return renderScreen();
};
