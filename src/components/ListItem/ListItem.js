import React, { Component } from "react";
import { View, Image, Text, TouchableHighlight } from "react-native";
import styles from "./styles";
import colors from "../../colors";
import LinearGradient from "react-native-linear-gradient";

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
          onPress={() => alert(`clicked`)}
        >
          <Text>More...</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
