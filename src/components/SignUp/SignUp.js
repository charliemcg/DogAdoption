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
              newPassword={true}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.inputText}
            />
          </View>
        </View>
        {/* sign in */}
        <View style={styles.signInWrapper}>
          <TouchableHighlight style={styles.signIn}>
            <Text>Sign Up</Text>
          </TouchableHighlight>
        </View>
        {/* new user link */}
        <View style={styles.privacyWrapper}>
          <Text
            style={{ color: "blue" }}
            onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
          >
            Privacy Policy
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
