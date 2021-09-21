import { OAuth } from "./src/Components/Login";
import * as R from "ramda";
import { Platform } from "react-native";

import { connectToStore } from "@applicaster/zapp-react-native-redux";

const hasPlayerHook = Platform.OS === "samsung_tv" || Platform.OS === "lg_tv" ? false : true;

export default {
  isFlowBlocker: () => true,
  presentFullScreen: true,
  hasPlayerHook,
  Component: connectToStore(R.pick(["rivers"]))(OAuth),
};
