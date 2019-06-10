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
import {
  selectedDog,
  addToFavorites,
  removeFromFavorites
} from "../../actions";
import heartImg from "../../images/heart.png";
import heartFilledImg from "../../images/heartFilled.png";

class FavListItem extends Component {
  formattedDate = () => {
    date = new Date(this.props.item.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  getFavoriteIcon = () => {
    return this.props.favorites.includes(this.props.item)
      ? heartFilledImg
      : heartImg;
  };

  handleFavorite = () => {
    const { favorites, item } = this.props;
    favorites.includes(item)
      ? this.props.removeFromFavorites(item)
      : this.props.addToFavorites(item);
  };

  render() {
    const imageWrapper = (
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: this.props.item.key }}
          style={styles.blurredImage}
          blurRadius={20}
        />
        <Image
          source={{ uri: this.props.item.key }}
          style={styles.image}
          resizeMode="contain"
        />
        {/* icon by Smash Icons */}
        <TouchableHighlight
          style={styles.favorite}
          onPress={() => {
            this.handleFavorite();
          }}
        >
          <Image source={this.getFavoriteIcon()} style={styles.heart} />
        </TouchableHighlight>
        <View style={styles.price}>
          <Text style={styles.coloredPrice}>{this.props.item.price}</Text>
        </View>
      </View>
    );

    return (
      <View style={styles.parent}>
        {imageWrapper}
        <View style={styles.breed}>
          <Text>{this.props.item.breed}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectedDog: dog => {
      dispatch(selectedDog(dog));
    },
    addToFavorites: dog => {
      dispatch(addToFavorites(dog));
    },
    removeFromFavorites: dog => {
      dispatch(removeFromFavorites(dog));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavListItem);
