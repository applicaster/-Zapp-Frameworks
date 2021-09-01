import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
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
// import { RiverOffsetContext } from "@applicaster/zapp-react-native-ui-components/Contexts";

const ButtonTV = React.forwardRef((props: ButtonProps, ref) => {
  // const riverContext = React.useContext(RiverOffsetContext);
  const styles = props?.styles;
  const styleKey = props?.styleKey;
  const propsContainerStyle = props?.containerStyle || {};

  const groupId = props?.groupId;
  const id = props?.id;

  return (
    <Focusable
      id={`${groupId}-${id}`}
      groupId={groupId}
      onPress={props?.onPress}
      ref={ref}
      preferredFocus={props.shouldUsePreferredFocus}
    >
      {(focused) => {
        const containerStyle: any = {
          ...componentStyles.containerStyle,
          ...propsContainerStyle,
          ...mapViewKeyToStyle({
            key: styleKey,
            obj: styles,
            isFocused: focused,
          }),
        };

        const labelStyles: any = {
          ...componentStyles.labelStyles,
          ...mapLabelKeyToStyle({
            key: styleKey,
            obj: styles,
            isFocused: focused,
          }),
        };

        const imageBackgroundStyle: any = componentStyles.flexOne;
        const imageStyle: any = componentStyles.imageStyle;

        const uri = valueFromObject({
          key: `${styleKey}_background_image`,
          obj: styles,
          isFocused: focused,
        });

        const image = { uri: uri };

        return (
          <View style={containerStyle}>
            <ImageBackground
              imageStyle={imageStyle}
              style={imageBackgroundStyle}
              source={image}
            >
              <Text numberOfLines={1} style={labelStyles}>
                {props?.titleText}
              </Text>
            </ImageBackground>
          </View>
        );
      }}
    </Focusable>
  );
});

export default ButtonTV;
