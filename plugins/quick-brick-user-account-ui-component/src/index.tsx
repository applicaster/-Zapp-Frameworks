/// <reference types="@applicaster/applicaster-types" />

import { UserAccount } from "./components/UserAccount";
import { withNavigator } from "@applicaster/zapp-react-native-ui-components/Decorators/Navigator/";
import { connectToStore } from "@applicaster/zapp-react-native-redux";
import { ZappUIComponent } from "@applicaster/zapp-react-native-ui-components/Components/ZappUIComponent";
import {
  RiverOffsetContext,
  HorizontalScrollContext,
  ScreenScrollingContext,
} from "@applicaster/zapp-react-native-ui-components/Contexts";

import * as R from "ramda";

const reduxConnector = connectToStore(R.pick(["rivers"]));

const UserAccountComponent = R.compose(
  withNavigator,
  reduxConnector,
  ScreenScrollingContext.withConsumer,
  RiverOffsetContext.withConsumer,
  HorizontalScrollContext.withConsumer
)(UserAccount);

export default UserAccountComponent;
// export default ZappUIComponent({
//   Component: UserAccountComponent,
//   options: { skipOnLoadFinished: true, allowsEmptyDataSource: true },
// });

// `;
// import { HorizontalListLayout } from "./HorizontalListLayout";
// export default ZappUIComponent({
//   Component: HorizontalListLayout,
//   options: { skipOnLoadFinished: true },
// });
