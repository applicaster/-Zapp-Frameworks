import React, { useEffect, useRef } from "react";
import { View, Text, Platform, Image } from "react-native";
import { useInitialFocus } from "@applicaster/zapp-react-native-utils/focusManager";
import Button from "./Button";
import Layout from "./Layout";
import { mapKeyToStyle } from "../Utils/Customization";
import {
  removeDataFromStorages,
  storageGet,
  AuthDataKeys,
} from "../Services/StorageService";
import {
  createLogger,
  BaseSubsystem,
  BaseCategories,
} from "../Services/LoggerService";

const LogoutScreen = (props) => {
  const {
    groupId,
    parentFocus,
    focused,
    goToScreen,
    forceFocus,
    screenStyles,
    screenLocalizations,
    configuration,
    isPrehook,
    onLogout,
  } = props;

  const { sing_out, sing_out_url_text, sing_out_url } = screenLocalizations;
  const { logout_icon } = screenStyles;

  const signoutButton = useRef(null);

  const styles = {
    container: {
      flex: 1,
      alignItems: "flex-start",
      marginTop: 70,
    },
    text: {
      ...mapKeyToStyle("text", screenStyles),
      fontSize: 32,
      marginBottom: 20,
    },
    url: {
      ...mapKeyToStyle("text_url", screenStyles),

      fontWeight: "bold",
      fontSize: 36,
      marginBottom: 60,
    },
    buttonContainer: {
      marginTop: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    iconContainer: {
      width: 250,
      height: 250,
      marginBottom: 50,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    icon: {
      width: 250,
      height: 250,
    },
  };

  useEffect(() => {
    prepareComponent();
  }, []);

  const prepareComponent = async () => {
    if (forceFocus) {
      goToScreen(null, false, true);
    }
  };

  if (Platform.OS === "android") {
    useInitialFocus(forceFocus || focused, signoutButton);
  }

  return (
    <Layout screenStyles={screenStyles} isPrehook={isPrehook}>
      <View style={styles.container}>
        {
          logout_icon &&
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={{
                uri: logout_icon,
              }}
            />
          </View>
        }
        <Text style={styles.text}>
          {`${sing_out_url_text} `}
          <Text style={styles.url}>{sing_out_url}</Text>
        </Text>
        <Button
          screenStyles={screenStyles}
          label={sing_out}
          onPress={() => onLogout()}
          preferredFocus={true}
          groupId={groupId}
          style={styles.buttonContainer}
          buttonRef={signoutButton}
          id={"sign-out-button"}
          nextFocusLeft={parentFocus ? parentFocus.nextFocusLeft : null}
          nextFocusUp={parentFocus ? parentFocus.nextFocusUp : null}
        />
      </View>
    </Layout>
  );
};

LogoutScreen.displayName = "LogoutScreen";
export default LogoutScreen;
