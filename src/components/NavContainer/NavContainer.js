import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "../Home";
import DogProfile from "../DogProfile";
import Splash from "../Splash";
import colors from "../../colors";

const Navigator = createStackNavigator(
  {
    // Splash: {
    //   screen: Splash,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    Home: {
      screen: Home
      // navigationOptions: {
      //   header: null
      // }
    },
    DogProfile: {
      screen: DogProfile
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default (NavContainer = createAppContainer(Navigator));
