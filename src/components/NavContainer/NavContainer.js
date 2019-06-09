import React from "react";
import { View, Text, Dimensions } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  DrawerActions
} from "react-navigation";
import Splash from "../Splash";
import Home from "../Home";
import DogProfile from "../DogProfile";
import Messages from "../Messages";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Favorites from "../Favorites";
import Resolution from "../Resolution";
import Filter from "../Filter";
import PrivacyPolicy from "../PrivacyPolicy";
import UserProfile from "../UserProfile";
import colors from "../../colors";
import LinearGradient from "react-native-linear-gradient";
import strings from "../../strings";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";

const DrawerHeader = props => (
  <View>
    <LinearGradient
      colors={[colors.primary, colors.primary, colors.dark]}
      style={{
        height: "40%",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <IconAwesome name="dog" size={50} color={colors.contrast} />
      <Text
        style={{
          color: colors.contrast,
          fontSize: 30,
          textAlign: "center",
          paddingLeft: "3%",
          paddingRight: "3%",
          paddingBottom: "3%"
        }}
      >
        {strings.appName}
      </Text>
    </LinearGradient>
    <DrawerItems {...props} />
  </View>
);

const Stack = createStackNavigator(
  {
    // Splash: {
    //   screen: Splash,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: strings.appName,
        headerTitleStyle: {
          fontSize: 17,
          width: Dimensions.get("window").width,
          color: colors.contrast
        }
      }
    },
    DogProfile,
    Messages,
    SignIn,
    SignUp,
    PrivacyPolicy,
    Filter,
    UserProfile,
    // putting drawer screens in stack so that they will have a back button
    Favorites,
    Resolution
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

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: Stack
    },
    Favorites: {
      screen: Favorites
    },
    Resolution: {
      screen: Resolution
    }
  },
  {
    drawerBackgroundColor: colors.notQuiteWhite,
    contentOptions: {
      activeTintColor: colors.notQuiteWhite,
      inactiveTintColor: colors.notQuiteBlack,
      activeBackgroundColor: colors.primary,
      inactiveBackgroundColor: colors.notQuiteWhite,
      labelStyle: {
        fontSize: 15
      }
    },
    contentComponent: DrawerHeader
  }
);

export default (NavContainer = createAppContainer(Drawer));
