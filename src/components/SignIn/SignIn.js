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
        {/* username */}
        <View style={styles.usernameWrapper}>
          <View style={styles.textInput}>
            <IconAwesome
              name="user"
              size={30}
              color={colors.primary}
              style={styles.inputIcon}
            />
            {/* textContentType is for autofill */}
            <TextInput
              textContentType="username"
              placeholder="Email"
              style={styles.inputText}
            />
          </View>
        </View>
        {/* password */}
        <View style={styles.passwordWrapper}>
          <View style={styles.textInput}>
            <IconMCI
              name="textbox-password"
              size={30}
              color={colors.primary}
              style={styles.inputIcon}
            />
            {/* textContentType is for autofill use newPassword for sign up page */}
            <TextInput
              textContentType="password"
              placeholder="Password"
              secureTextEntry={true}
              style={styles.inputText}
            />
          </View>
        </View>
        {/* sign in */}
        <View style={styles.signInWrapper}>
          <TouchableHighlight
            style={styles.signIn}
            onPress={() => {
              this.props.signInOut();
              this.props.navigation.navigate("Home");
            }}
          >
            <Text>Sign In</Text>
          </TouchableHighlight>
        </View>
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

const mapDispatchToProps = dispatch => {
  return {
    signInOut: () => {
      dispatch(signInOut());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
