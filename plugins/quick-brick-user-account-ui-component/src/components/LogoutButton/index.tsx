import * as React from "react";
import {
  ImageBackground,
  TouchableHighlight,
  Text,
  StyleSheet,
} from "react-native";
import { mapLabelKeyToStyle, mapViewKeyToStyle } from "../../customization";

const componentStyles = StyleSheet.create({
  containerStyle: {
    height: 22,
    width: 99,
    flexDirection: "row",
  },
  flexOne: {
    flex: 1,
    justifyContent: "center",
  },
  labelStyles: {
    textAlign: "center",
    justifyContent: "center",
  },
});

export function LogoutButton(props: ButtonProps) {
  const [isUnderlay, setIsUnderlay] = React.useState(false);
  const styles = props?.styles;
  const styleKey = props?.styleKey;

  function onShowUnderlay() {
    setIsUnderlay(true);
  }

  function onHideUnderlay() {
    setIsUnderlay(false);
  }

  const containerStyle = {
    ...componentStyles.containerStyle,
    ...mapViewKeyToStyle({ key: styleKey, obj: styles, isFocused: isUnderlay }),
  };

  const labelStyles = {
    ...componentStyles.labelStyles,
    ...mapLabelKeyToStyle({
      key: styleKey,
      obj: styles,
      isFocused: isUnderlay,
    }),
  };

  const image = { uri: props?.src };

  return (
    <TouchableHighlight
      onPress={props?.onPress}
      testID={`${props?.id}`}
      style={containerStyle}
      onHideUnderlay={onHideUnderlay}
      onShowUnderlay={onShowUnderlay}
      underlayColor={containerStyle?.backgroundColor}
      accessible={false}
    >
      <ImageBackground
        imageStyle={{ resizeMode: "stretch" }}
        style={componentStyles.flexOne}
        source={image}
      >
        <Text numberOfLines={1} style={labelStyles}>
          {props?.titleText}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
}
