import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import colors from "../../colors";
import { signInOut } from "../../actions";

class SignInComponent extends Component {
  render() {
    return (
      <View style={{ flex: 3 }}>
        {/* username */}
        <View style={styles.usernameWrapper}>
          <View style={styles.textInput}>
            <IconAwesome
              name="user"
              size={30}
              color={colors.primary}
              style={styles.inputIcon}
            />
            {/* textContentType is for autofill  */}
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
      </View>
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
)(SignInComponent);
