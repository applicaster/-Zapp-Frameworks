import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { UserPhotoView } from "./UserPhotoView";

const stylesMobile = { width: 55, height: 55, marginBottom: 23, marginTop: 31 };
const stylesTV = { width: 100, height: 100, marginBottom: 23, marginTop: 31 };

export function UserPhoto(props) {
  const mobile = <UserPhotoView {...props} styles={stylesMobile} />;
  const tv = <UserPhotoView {...props} styles={stylesTV} />;

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
