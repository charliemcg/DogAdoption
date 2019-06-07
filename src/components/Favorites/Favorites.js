import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";

class Favorites extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.primary
      }
    };
  };
  render() {
    return (
      <SafeAreaView style={styles.parent}>
        <Text>Favorites</Text>
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
)(Favorites);