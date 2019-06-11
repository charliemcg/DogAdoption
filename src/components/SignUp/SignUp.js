import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ImageBackground
} from "react-native";
import styles from "./styles";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import backgroundImg from "../../images/backgroundWhite.png";
import SignInComponent from "../SignInComponent";

export default class SignIn extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}
      >
        {/* icon */}
        <View style={styles.iconWrapper}>
          <IconAwesome name="dog" size={100} color={colors.primary} />
        </View>
        {/* sign in component */}
        <SignInComponent navigation={this.props.navigation} />
        {/* new user link */}
        <View style={styles.privacyWrapper}>
          <Text
            style={{ color: colors.dark }}
            onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
          >
            Privacy Policy
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
