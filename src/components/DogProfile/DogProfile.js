import React, { Component } from "react";
import { View, SafeAreaView, Text, Image } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";

class DogProfile extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.white
  };
  render() {
    return (
      <SafeAreaView style={styles.parent}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: this.props.selectedDog.key }}
            style={styles.image}
          />
        </View>
        <View style={styles.locationRow}>
          <Text>Location: {this.props.selectedDog.location}</Text>
          <Text>Price: {this.props.selectedDog.price}</Text>
        </View>
        <Text style={styles.description}>
          {this.props.selectedDog.description}
        </Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedDog: state.selectedDog
  };
};

export default connect(
  mapStateToProps,
  null
)(DogProfile);
