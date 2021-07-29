import React from "react";
import { Image } from "react-native";
import { mapViewKeyToStyle } from "../../customization";

type Props = {
  imageSrc: string;
  styles: object;
};

export const UserPhotoComponent = ({ imageSrc, styles }: Props) => {
  const styleKey = "user_image";

  const containerData = mapViewKeyToStyle({
    key: styleKey,
    obj: styles,
  });

  const containerStyle = {
    ...styles,
    marginBottom: containerData?.marginBottom,
  };

  console.log("User Image", { containerStyle });

  return <Image style={containerStyle} source={{ uri: imageSrc }} />;
};
