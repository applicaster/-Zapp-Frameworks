import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

import {
  mapLabelKeyToStyle,
  mapViewKeyToStyle,
  valueFromObject,
} from "../../customization";

const componentStyles = {
  containerStyle: {
    height: 73,
    width: 544,
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

const ButtonTV = (props: ButtonProps) => {
  const groupId = props?.groupId;
  const id = props?.id;
  const nextFocusDown = props?.nextFocusDown;
  const nextFocusUp = props?.nextFocusUp;
  const onPress = props?.onPress;
  const propsContainerStyle = props?.containerStyle || {};
  const styleKey = props?.styleKey;
  const styles = props?.styles;

  const imageBackgroundStyle: any = componentStyles.flexOne;
  const imageStyle: any = componentStyles.imageStyle;

  const containerStyle = (focused) =>
    ({
      ...componentStyles.containerStyle,
      ...propsContainerStyle,
      ...mapViewKeyToStyle({
        key: styleKey,
        obj: styles,
        isFocused: focused,
      }),
    } as ViewStyle);

  const labelStyles = (focused) =>
    ({
      ...componentStyles.labelStyles,
      ...mapLabelKeyToStyle({
        key: styleKey,
        obj: styles,
        isFocused: focused,
      }),
    } as TextStyle);

  const uri = (focused) =>
    valueFromObject({
      key: `${styleKey}_background_image`,
      obj: styles,
      isFocused: focused,
    });

  return (
    <Focusable
      ref={props.buttonRef}
      id={`${groupId}-${id}`}
      groupId={groupId}
      onPress={onPress}
      nextFocusUp={nextFocusUp}
      nextFocusDown={nextFocusDown}
    >
      {(focused) => {
        const image = { uri: uri(focused) };

        return (
          <View style={containerStyle(focused)}>
            <ImageBackground
              imageStyle={imageStyle}
              style={imageBackgroundStyle}
              source={image}
            >
              <Text numberOfLines={1} style={labelStyles(focused)}>
                {props?.titleText}
              </Text>
            </ImageBackground>
          </View>
        );
      }}
    </Focusable>
  );
};

export default ButtonTV;
