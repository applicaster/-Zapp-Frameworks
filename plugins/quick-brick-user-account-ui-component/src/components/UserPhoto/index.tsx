import React from "react";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";
import { UserPhotoComponent } from "./UserPhotoComponent";

const stylesMobile = { width: 55, height: 55, marginBottom: 23, marginTop: 31 };
const stylesTV = { width: 150, height: 150, margin: 35 };

export function UserPhoto(props) {
  const containerStyle = props?.containerStyle || {};

  const mobile = (
    <UserPhotoComponent
      {...props}
      containerStyle={{ ...stylesMobile, ...containerStyle }}
    />
  );

  const tv = (
    <UserPhotoComponent
      {...props}
      containerStyle={{ ...stylesTV, ...containerStyle }}
    />
  );

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
