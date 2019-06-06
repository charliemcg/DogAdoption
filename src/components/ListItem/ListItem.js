import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import LinearGradient from "react-native-linear-gradient";
import { selectedDog } from "../../actions";

class ListItem extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: this.props.item.key }} style={styles.image} />
        </View>
        <View style={styles.locationRow}>
          <Text style={styles.location}>
            Location: {this.props.item.location}
          </Text>
          <Text style={styles.price}>Price: {this.props.item.price}</Text>
        </View>
        <View style={styles.breedRow}>
          <Text style={styles.breed}>{this.props.item.breed}</Text>
        </View>
        <Text style={styles.description}>{this.props.item.description}</Text>
        <LinearGradient
          colors={[
            "rgba(256, 256, 256, 0.1)",
            "rgba(256, 256, 256, 0.6)",
            colors.white
          ]}
          style={styles.fade}
        />
        <TouchableHighlight
          style={styles.more}
          onPress={() => {
            this.props.selectedDog(this.props.item);
            this.props.navigation.navigate("DogProfile");
          }}
        >
          <Text>More...</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectedDog: dog => {
      dispatch(selectedDog(dog));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListItem);
