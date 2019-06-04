import React, { Component } from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import { Provider } from "react-redux";
import NavContainer from "./components/NavContainer";
import store from "./store";
import colors from "./colors";

// setting the appearance of the status bar
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View
    style={{
      height: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }}
  >
    <StatusBar
      // barStyle="light-content"
      translucent
      backgroundColor={colors.dark}
      {...props}
    />
  </View>
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyStatusBar />
        <NavContainer />
      </Provider>
    );
  }
}

export default App;
