import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "../ListItem/styles";
import constants from "../../constants";
import strings from "../../strings";

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text>{strings.legal.privacy}</Text>
      </View>
    );
  }
}
