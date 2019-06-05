import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "../Home";
import DogProfile from "../DogProfile";
import Splash from "../Splash";

const Navigator = createStackNavigator({
  // Splash: {
  //   screen: Splash,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  DogProfile: {
    screen: DogProfile
  }
});

export default (NavContainer = createAppContainer(Navigator));
