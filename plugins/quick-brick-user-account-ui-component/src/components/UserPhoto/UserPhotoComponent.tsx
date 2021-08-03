import React from "react";
import { Image } from "react-native";
import { mapViewKeyToStyle } from "../../customization";

type Props = {
  imageSrc: string;
  containerStyle: object;
  styles: GeneralStyles;
};

export const UserPhotoComponent = ({
  imageSrc,
  containerStyle,
  styles,
}: Props) => {
  const styleKey = "user_image";

  const containerData = mapViewKeyToStyle({
    key: styleKey,
    obj: styles,
  });

  const imageStyle = {
    ...containerStyle,
    marginBottom: containerData?.marginBottom,
  };

  return <Image style={imageStyle} source={{ uri: imageSrc }} />;
};
