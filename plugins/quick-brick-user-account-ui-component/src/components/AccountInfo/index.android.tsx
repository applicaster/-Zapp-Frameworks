import * as React from "react";
import { View } from "react-native";
import { InfoView } from "../InfoView";
import { LogoutButton } from "../LogoutButton";
import { UserPhoto } from "../UserPhoto";
type Props = {
  onLogoutPress: () => void;
  user_image_placeholder: string;
  titles: {
    account_title: string;
    user_name_title: string;
    subscription_title: string;
    subscription_expiration_title: string;
    logout_title_text: string;
  };
  styles: GeneralStyles;
  src: string;
  groupId: string;
  parentFocus: ParentFocus;
  focused: boolean;
};

const componentStyles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 20,
  },
  infoViewsContainer: {
    flex: 1,
    paddingLeft: 17,
    paddingTop: 35,
  },
};

export function AccountInfo(props: Props) {
  const logoutButtonRef = React.useRef(null);
  const logoutButtonId = "button_logout";
  const parentFocus = props?.parentFocus;
  const focused = props?.focused;
  const groupId = props?.groupId || "quick-brick-user-account-logout";

  const titles = props?.titles;
  const styles = props?.styles;

  const accountDataTitles = {
    title_text: titles?.account_title,
    description_text: titles?.user_name_title,
  };

  const subscriptionDataTitles = {
    title_text: titles?.subscription_title,
    description_text: titles?.subscription_expiration_title,
  };

  const containuerStyle: any = componentStyles.container;
  const userPhotoContainerStyle = { alignSelf: "start" };

  return (
    <View style={containuerStyle}>
      <UserPhoto
        styles={styles}
        containerStyle={userPhotoContainerStyle}
        imageSrc={props?.user_image_placeholder}
      />
      <View style={componentStyles.infoViewsContainer}>
        {accountDataTitles.description_text && (
          <InfoView styles={styles} titles={accountDataTitles} />
        )}
        {subscriptionDataTitles.description_text && (
          <InfoView styles={styles} titles={subscriptionDataTitles} />
        )}
        <LogoutButton
          ref={logoutButtonRef}
          nextFocusUp={parentFocus?.nextFocusUp}
          parentFocus={parentFocus}
          focused={focused}
          groupId={groupId}
          styleKey={logoutButtonId}
          onPress={props?.onLogoutPress}
          titleText={titles.logout_title_text}
          styles={styles}
          id={logoutButtonId}
        />
      </View>
    </View>
  );
}
