import * as React from "react";
import { View, Text, Platform } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";
import { mapKeyToStyle } from "../Utils/Customization";

export default function Button(props) {
  const {
    id,
    label,
    groupId,
    onPress,
    preferredFocus,
    buttonRef,
    nextFocusLeft,
    nextFocusDown,
    nextFocusUp,
    style,
    screenStyles,
  } = props;
  const {
    action_button_background_color,
    action_button_background_color_focused,
    action_button_font_color,
    action_button_font_color_focused,
    action_button_round,
    action_button_border_color,
    action_button_border_color_focused,
    action_button_border_size,
    action_button_shadow
  } = screenStyles;

  let button = {
    width: 600,
    height: 80,
    backgroundColor: action_button_background_color,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  };

  if (action_button_round) {
    button = {
      ...button,
      borderRadius: 80,
      borderWidth: action_button_border_size,
      borderColor: action_button_border_color
    }
  }

  let focusedButton = {
    ...button,
    backgroundColor: action_button_background_color_focused,
    borderColor: action_button_border_color_focused
  }

  if (action_button_shadow) {
    focusedButton = {
      ...focusedButton,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      width: 650,
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    }
  }

  const buttonText = {
    fontSize: 24,
    fontWeight: "bold",
    ...mapKeyToStyle("action_button", screenStyles),
    color: action_button_font_color,
  };

  const styles = {
    focused: {
      button: focusedButton,
      buttonText: {
        ...buttonText,
        color: action_button_font_color_focused,
      },
    },
    default: {
      button,
      buttonText,
    },
  };

  const renderButton = (focused, label) => {
    const buttonStyles = styles[focused ? "focused" : "default"];
    return (
      <View style={buttonStyles.button}>
        <Text style={buttonStyles.buttonText}>{label}</Text>
      </View>
    );
  };

  return Platform.OS !== "android" ? (
    <FocusableGroup
      id={id}
      style={style}
      preferredFocus={preferredFocus}
      groupId={groupId}
    >
      <Focusable
        id={label}
        groupId={id}
        onPress={onPress}
        preferredFocus={preferredFocus}
      >
        {(focused) => renderButton(focused, label)}
      </Focusable>
    </FocusableGroup>
  ) : (
    <View style={style}>
      <Focusable
        ref={buttonRef}
        id={id}
        onPress={onPress}
        nextFocusLeft={nextFocusLeft}
        nextFocusDown={nextFocusDown}
        nextFocusUp={nextFocusUp}
      >
        {(focused) => renderButton(focused, label)}
      </Focusable>
    </View>
  );
}
