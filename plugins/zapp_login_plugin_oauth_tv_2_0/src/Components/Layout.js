import React, { Component } from "react";
import { TVEventHandlerComponent } from "@applicaster/zapp-react-native-tvos-ui-components/Components/TVEventHandlerComponent";
import { Dimensions, View, Image, ImageBackground } from "react-native";

const noop = () => null;
const { height } = Dimensions.get("window");

class Layout extends Component {
  
  renderChildren() {
    const {
      client_logo,
    } = this.props.screenStyles;

    return (
      <>
        {this.props.isPrehook && (
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={{
                uri: client_logo,
              }}
            />
          </View>
        )}
        <View style={styles.subContainer}>{this.props.children}</View>
      </>
    )
  }

  renderContent() {
    const {
      background_color,
      background_color_prehook,
      background_image,
    } = this.props.screenStyles;

    if (background_image) {
      return (
        <ImageBackground source={{ uri: background_image }} resizeMode="cover" style={styles.container}>
          {this.renderChildren()}
        </ImageBackground>
      )
    }

    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: this.props.isPrehook
            ? background_color
            : background_color_prehook,
        }}
      >
        {this.renderChildren()}
      </View>
    )
  }

  render() {
    return (
      <TVEventHandlerComponent
        tvEventHandler={this.props.tvEventHandler || noop}
      >
        {this.renderContent()}
      </TVEventHandlerComponent>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    height,
    alignItems: "center",
  },
  logoContainer: {
    width: 150,
    height: 150,
    paddingLeft: 100,
    paddingTop: 50,
    alignSelf: "flex-start",
  },
  subContainer: {
    flex: 1,
    width: 1390,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  logo: {
    width: 150,
    height: 150,
  },
};

Layout.displayName = "Layout";
export default Layout;
