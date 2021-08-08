import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { Button } from "../Button";

const stylesMobile = { height: 22, width: 99 };
const stylesTV = { height: 52, width: 250 };

export function LogoutButton(props) {
  const mobile = <Button {...props} propsContainerStyle={stylesMobile} />;
  const tv = <Button {...props} propsContainerStyle={stylesTV} />;

  return platformSelect({
    tvos: tv,
    ios: mobile,
    android: mobile,
    android_tv: tv,
    web: tv,
    samsung_tv: tv,
    lg_tv: tv,
  });
}
