import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import strings from "../../strings";

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 2500);
  }
  render() {
    return (
      <View style={styles.parent}>
        <Text>{strings.appName}</Text>
      </View>
    );
  }
}

export default Splash;
