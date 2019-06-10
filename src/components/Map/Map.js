import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";
import mapImg from "../../images/mapPlaceholder.png";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false
    };
  }
  render() {
    //user must click the map placeholder in order to render the map
    const containerContents = this.state.showMap ? (
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      />
    ) : (
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => this.setState({ showMap: true })}
      >
        <View style={styles.mapImg}>
          <Image source={mapImg} style={styles.placeholderImg} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Click to show map</Text>
          </View>
        </View>
      </TouchableHighlight>
    );

    return (
      <View style={styles.parent}>
        <View style={styles.mapContainer}>{containerContents}</View>
      </View>
    );
  }
}
