import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { mapLabelKeyToStyle } from "../../customization";

type Props = {
  titleText: string;
  styles: GeneralStyles;
  styleKey: string;
  labelStyles?: object;
};

const componentStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingBottom: 20,
  },
  flexOne: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 5,
  },
  labelStyles: {
    textAlign: "center",
    justifyContent: "center",
  },
});

export function TextView(props: Props) {
  const styles = props.styles;
  const styleKey = props.styleKey;
  const titleText = props?.titleText;
  const labelStyles = props?.labelStyles;

  const titleLabelStyle = {
    ...componentStyles.labelStyles,
    ...labelStyles,
    ...mapLabelKeyToStyle({
      key: styleKey,
      obj: styles,
    }),
  };

  if (!titleText) {
    return null;
  }

  return (
    <View style={componentStyles.flexOne}>
      <Text numberOfLines={1} style={titleLabelStyle}>
        {titleText}
      </Text>
    </View>
  );
}
