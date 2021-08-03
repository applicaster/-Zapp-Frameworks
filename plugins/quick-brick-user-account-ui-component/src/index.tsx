/// <reference types="@applicaster/applicaster-types" />

import { UserAccount } from "./components/UserAccount";
import { withNavigator } from "@applicaster/zapp-react-native-ui-components/Decorators/Navigator/";
import { connectToStore } from "@applicaster/zapp-react-native-redux";

import * as R from "ramda";

const reduxConnector = connectToStore(R.pick(["rivers"]));

const UserAccountComponent = R.compose(
  withNavigator,
  reduxConnector
)(UserAccount);

export default UserAccountComponent;
