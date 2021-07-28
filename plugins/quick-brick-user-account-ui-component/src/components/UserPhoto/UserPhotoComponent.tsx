import React from "react";
import { Image } from "react-native";

type Props = {
  imageSrc: string;
  styles: object;
};

export const UserPhotoComponent = ({ imageSrc, styles }: Props) => (
  <Image style={styles} source={{ uri: imageSrc }} />
);
