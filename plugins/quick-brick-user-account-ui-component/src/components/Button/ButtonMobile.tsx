import * as React from "react";
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  mapLabelKeyToStyle,
  mapViewKeyToStyle,
  valueFromObject,
} from "../../customization";

const componentStyles = {
  containerStyle: {
    height: 32,
    marginRight: 57,
    marginLeft: 57,
    marginBottom: 12,
    flex: 1,
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
  imageStyle: { resizeMode: "stretch" },
};

export default function ButtonMobile(props: ButtonProps) {
  const [isUnderlay, setIsUnderlay] = React.useState(false);
  const styles = props?.styles;
  const styleKey = props?.styleKey;
  const propsContainerStyle = props?.containerStyle || {};

  function onShowUnderlay() {
    setIsUnderlay(true);
  }

  function onHideUnderlay() {
    setIsUnderlay(false);
  }

  const containerStyle: any = {
    ...componentStyles.containerStyle,
    ...propsContainerStyle,
    ...mapViewKeyToStyle({ key: styleKey, obj: styles, isFocused: isUnderlay }),
  };

  const labelStyles: any = {
    ...componentStyles.labelStyles,
    ...mapLabelKeyToStyle({
      key: styleKey,
      obj: styles,
      isFocused: isUnderlay,
    }),
  };

  const imageBackgroundStyle: any = componentStyles.flexOne;
  const imageStyle: any = componentStyles.imageStyle;

  const uri = valueFromObject({
    key: `${styleKey}_background_image`,
    obj: styles,
    isFocused: isUnderlay,
  });

  const image = { uri };

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
        imageStyle={imageStyle}
        style={imageBackgroundStyle}
        source={image}
      >
        <Text numberOfLines={1} style={labelStyles}>
          {props?.titleText}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
}
