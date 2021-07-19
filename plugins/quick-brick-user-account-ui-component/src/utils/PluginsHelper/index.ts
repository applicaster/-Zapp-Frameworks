import { connectToStore } from "@applicaster/zapp-react-native-redux";

const storeConnector = connectToStore((state) => {
  const loginPlugin = state.plugins.find(({ type }) => type === "login");

  return { loginPlugin: loginPlugin, rivers: state.rivers };
});
