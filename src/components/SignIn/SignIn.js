import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "../ListItem/styles";

export default class SignIn extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <TouchableHighlight style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>Sign in</Text>
            <Text
              style={{ color: "blue" }}
              onPress={() => alert("go to Privacy Policy")}
            >
              Privacy Policy
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
