import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import ButtonMobile from "./ButtonMobile";
import ButtonTV from "./ButtonTV";

export function Button(props) {
  const mobile = <ButtonMobile {...props} />;
  const tv = <ButtonTV {...props} />;

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
