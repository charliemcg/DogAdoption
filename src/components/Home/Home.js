import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import strings from "../../strings";

class Home extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text>{strings.exampleStringOne}</Text>
        <Text>{strings.exampleStringTwo}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    //props go here...
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //actions go here...
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
