import React from "react";
import { Image } from "react-native";
import { mapViewKeyToStyle } from "../../customization";

type Props = {
  imageSrc: string;
  styles: object;
};

export const UserPhotoComponent = ({ imageSrc, styles }: Props) => {
  const styleKey = "user_image";

  const containerStyle = {
    ...styles,
    ...mapViewKeyToStyle({
      key: styleKey,
      obj: styles,
    }),
  };

  return <Image style={containerStyle} source={{ uri: imageSrc }} />;
};
