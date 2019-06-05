import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";

export default class ListItem extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: this.props.item.key }} style={styles.image} />
        </View>
        <View style={styles.locationRow}>
          <Text>Location: Blah</Text>
          <Text>Price: Free</Text>
        </View>
        <Text style={styles.description}>
          Blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah
        </Text>
      </View>
    );
  }
}
