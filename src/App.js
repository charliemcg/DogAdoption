/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import Home from "./components/Home";
import Splash from "./components/Splash";
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

const Navigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  }
});

const Container = createAppContainer(Navigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyStatusBar />
        <Container />
      </Provider>
    );
  }
}

export default App;
