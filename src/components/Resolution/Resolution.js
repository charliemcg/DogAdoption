import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import strings from "../../strings";

class Resolution extends Component {
  render() {
    return (
      <SafeAreaView style={styles.parent}>
        <Text>{strings.resolutionCentre}</Text>
        <Text>{strings.resolutionDetails}</Text>
      </SafeAreaView>
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
)(Resolution);
