import React, { Component } from "react";
import { SafeAreaView, Text, FlatList, ImageBackground } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import MiniListItem from "../MiniListItem";
import backgroundImg from "../../images/backgroundWhite.png";

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
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}
      >
        <SafeAreaView style={styles.parent}>
          <FlatList
            data={this.props.favorites}
            numColumns={2}
            renderItem={({ item }) => (
              <MiniListItem
                item={item}
                navigation={this.props.navigation}
                showFav={true}
              />
            )}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites
  };
};

export default connect(
  mapStateToProps,
  null
)(Favorites);
