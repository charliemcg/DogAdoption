import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "./styles";
import constants from "../../constants";
import colors from "../../colors";

export default class PrivacyPolicy extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.white
  };
  render() {
    return (
      <View style={styles.parent}>
        <Text>{constants.legal.privacy}</Text>
      </View>
    );
  }
}
