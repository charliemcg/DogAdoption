import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import colors from "../../colors";

export default class Messages extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text>Show messages here...</Text>
      </View>
    );
  }
}
