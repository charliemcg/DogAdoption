import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "../Home";
import Splash from "../Splash";

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

export default (NavContainer = createAppContainer(Navigator));
