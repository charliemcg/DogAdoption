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
import strings from "../../strings";
import { signInOut } from "../../actions";
import { connect } from "react-redux";
import backgroundImg from "../../images/backgroundWhite.png";
import SignInComponent from "../SignInComponent";

class SignIn extends Component {
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
        {/* sign in with Facebook */}
        <View style={styles.facebookWrapper}>
          <TouchableHighlight style={styles.facebook}>
            <Text>Sign in with Facebook</Text>
          </TouchableHighlight>
        </View>
        {/* new user link */}
        <View style={styles.privacyWrapper}>
          <Text>New member?</Text>
          <Text
            style={{ color: colors.dark }}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            Sign Up!
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default SignIn;
