import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextView } from "../TextView";
type Props = {
  titles: {
    title_text: string;
    description_text: string;
  };
  styles: GeneralStyles;
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
    textAlign: "left",
    justifyContent: "center",
  },
});

export function InfoView(props: Props) {
  const styleKeyTitleLabel = "info_label";
  const styleKeyDescriptionLabel = "info_label_description";
  const styles = props.styles;

  const titleText = props?.titles?.title_text;
  const descriptionText = props?.titles?.description_text;
  const extraLabelStyles = { textAlign: "left" };
  return (
    <View style={componentStyles.containerStyle}>
      <TextView
        styleKey={styleKeyTitleLabel}
        styles={styles}
        titleText={titleText}
        labelStyles={extraLabelStyles}
      />
      <TextView
        styleKey={styleKeyDescriptionLabel}
        styles={styles}
        titleText={descriptionText}
        labelStyles={extraLabelStyles}
      />
    </View>
  );
}
