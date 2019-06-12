import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  ImageBackground,
  View
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import MiniListItem from "../MiniListItem";
import backgroundImg from "../../images/backgroundWhite.png";
import RecentlyViewed from "../RecentlyViewed";

class Favorites extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.primary
      }
    };
  };

  render() {
    // list of favorites
    const thereAreFavorites = (
      <FlatList
        style={styles.list}
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
    );

    // recently viewed dogs
    const recents = (
      <View style={styles.recents}>
        <RecentlyViewed navigation={this.props.navigation} showFav={false} />
      </View>
    );

    // inform user there are no favorites
    const thereAreNoFavorites = (
      <View style={styles.noFavoritesWrapper}>
        <View style={styles.noFavorites}>
          <Text style={styles.noFavoritesText}>You have no favorites...</Text>
        </View>
        {/* check there are recents to view */}
        {this.props.recentlyViewed.length > 1 && recents}
      </View>
    );

    return (
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={backgroundImg}
      >
        <SafeAreaView style={styles.parent}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Your Favorites</Text>
          </View>
          {/* check if favorites exist */}
          {this.props.favorites.length === 0
            ? thereAreNoFavorites
            : thereAreFavorites}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    recentlyViewed: state.recentlyViewed
  };
};

export default connect(
  mapStateToProps,
  null
)(Favorites);
