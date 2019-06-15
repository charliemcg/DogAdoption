import { Dimensions } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Splash from "../../screens/Splash";
import Home from "../../screens/Home";
import DogProfile from "../../screens/DogProfile";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";
import Favorites from "../../screens/Favorites";
import UnderConstruction from "../../screens/UnderConstruction";
import Filter from "../../screens/Filter";
import PrivacyPolicy from "../../screens/PrivacyPolicy";
import UserProfile from "../../screens/UserProfile";
import colors from "../../colors";
import strings from "./strings";

const Stack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: strings.appName,
        headerTitleStyle: {
          fontSize: 17,
          width: Dimensions.get("window").width,
          color: colors.contrast
        },
        headerBackTitle: strings.back
      }
    },
    DogProfile,
    SignIn,
    SignUp,
    PrivacyPolicy,
    Filter,
    UserProfile,
    UnderConstruction,
    Favorites
  },
  {
    // styling the header for each screen
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.contrast
    }
  },
  { headerLayoutPreset: "center" }
);

export default (NavContainer = createAppContainer(Stack));
