import * as React from "react";

import { useLocalizedStrings } from "@applicaster/zapp-react-native-utils/localizationUtils";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";
import { Button } from "../Button";
import { UserPhoto } from "../UserPhoto";
import { TextView } from "../TextView";

const ID = {
  login1ButtonId: "button_1",
  login2ButtonId: "button_2",
  logoutButtonId: "button_logout",
  logoutButtonBigId: "button_logout_big",
  groupId: "quick-brick-user-account-login",
};

export const LoginFlow = React.forwardRef((props: LoginProps, ref) => {
  const login1ButtonRef = React.useRef(null);
  const login2ButtonRef = React.useRef(null);
  const logoutButtonRef = React.useRef(null);
  const focused = props?.focused;
  const parentFocus = props?.parentFocus;
  const styles = props?.styles;
  const isLoggedIn = props?.isLoggedIn;
  const onLogin1 = props?.onLogin1;
  const onLogin2 = props?.onLogin2;
  const onLogout = props?.onLogout;
  const localizations = props?.localizations;
  const titles = props?.titles;
  const button_2_login_enabled = styles?.button_2_login_enabled;

  const {
    logout_title_text = "Logout",
    login_button_1_title_text = "Login 1",
    login_button_2_title_text = "Login 2",
  } = useLocalizedStrings({
    localizations,
  });

  useInitialFocus(props?.focused, isLoggedIn ? logoutButtonRef : login1ButtonRef);

  return (
    <>
      <UserPhoto styles={styles} imageSrc={styles?.user_image_placeholder} />
      {!isLoggedIn ? (
        <Button
          buttonRef={login1ButtonRef}
          nextFocusUp={parentFocus?.nextFocusUp}
          nextFocusDown={login2ButtonRef}
          focused={focused}
          parentFocus={parentFocus}
          styleKey={ID.login1ButtonId}
          styles={styles}
          id={ID.login1ButtonId}
          groupId={ID.groupId}
          onPress={onLogin1}
          titleText={login_button_1_title_text}
        />
      ) : null}

      {!isLoggedIn && Boolean(button_2_login_enabled) ? (
        <Button
          buttonRef={login2ButtonRef}
          nextFocusUp={login1ButtonRef}
          nextFocusDown={logoutButtonRef}
          focused={focused}
          parentFocus={parentFocus}
          styleKey={ID.login2ButtonId}
          styles={styles}
          id={ID.login2ButtonId}
          groupId={ID.groupId}
          onPress={onLogin2}
          titleText={login_button_2_title_text}
        />
      ) : null}
      {isLoggedIn ? (
        <TextView
          styleKey={"info_label_description"}
          styles={styles}
          titleText={titles?.user_name_title}
        />
      ) : null}
      {isLoggedIn ? (
        <Button
          buttonRef={logoutButtonRef}
          nextFocusUp={parentFocus?.nextFocusUp}
          focused={focused}
          parentFocus={parentFocus}
          styleKey={ID.logoutButtonBigId}
          styles={styles}
          id={ID.logoutButtonId}
          groupId={ID.groupId}
          onPress={onLogout}
          titleText={logout_title_text}
        />
      ) : null}
    </>
  );
});

LoginFlow.displayName = "LoginFlow";
