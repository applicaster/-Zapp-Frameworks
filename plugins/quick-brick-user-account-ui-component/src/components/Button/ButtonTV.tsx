import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";
import { mapLabelKeyToStyle, mapViewKeyToStyle } from "../../customization";

const componentStyles = StyleSheet.create({
  containerStyle: {
    height: 73,
    width: 544,
    marginBottom: 27,
    // flex: 1,
    // flexDirection: "row",
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
// import { RiverOffsetContext } from "@applicaster/zapp-react-native-ui-components/Contexts";

export default function ButtonTV(props: ButtonProps) {
  // const riverContext = React.useContext(RiverOffsetContext);
  console.log("ButtonTV", { props });
  const styles = props?.styles;
  const styleKey = props?.styleKey;
  const propsContainerStyle = props?.containerStyle || {};

  const image = { uri: props?.src };
  const groupId = props?.groupId;
  const id = props?.id;

  return (
    <Focusable
      id={`${groupId}-${id}`}
      groupId={groupId}
      onPress={props?.onPress}
    >
      {(focused) => {
        const containerStyle = {
          ...componentStyles.containerStyle,
          ...propsContainerStyle,
          ...mapViewKeyToStyle({
            key: styleKey,
            obj: styles,
            isFocused: focused,
          }),
        };

        const labelStyles = {
          ...componentStyles.labelStyles,
          ...mapLabelKeyToStyle({
            key: styleKey,
            obj: styles,
            isFocused: focused,
          }),
        };

        console.log({ containerStyle, labelStyles });

        return (
          <View style={containerStyle}>
            <ImageBackground
              imageStyle={{ resizeMode: "stretch" }}
              style={componentStyles.flexOne}
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
}
