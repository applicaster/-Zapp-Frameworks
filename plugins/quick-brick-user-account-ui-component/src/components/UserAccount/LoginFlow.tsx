import * as React from "react";
import { useLocalizedStrings } from "@applicaster/zapp-react-native-utils/localizationUtils";

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

export const LoginFlow = (props: LoginProps) => {
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

  return (
    <>
      <UserPhoto styles={styles} imageSrc={styles?.user_image_placeholder} />
      {isLoggedIn ? (
        <>
          <TextView
            styleKey={"info_label_description"}
            styles={styles}
            titleText={titles?.user_name_title}
          />
          <Button
            styleKey={ID.logoutButtonBigId}
            styles={styles}
            id={ID.logoutButtonId}
            onPress={onLogout}
            titleText={logout_title_text}
          />
        </>
      ) : (
        <>
          <Button
            styleKey={ID.login1ButtonId}
            styles={styles}
            id={ID.login1ButtonId}
            onPress={onLogin1}
            titleText={login_button_1_title_text}
          />
          {button_2_login_enabled ? (
            <Button
              styleKey={ID.login2ButtonId}
              styles={styles}
              id={ID.login2ButtonId}
              onPress={onLogin2}
              titleText={login_button_2_title_text}
            />
          ) : null}
        </>
      )}
    </>
  );
};

LoginFlow.displayName = "LoginFlow";
