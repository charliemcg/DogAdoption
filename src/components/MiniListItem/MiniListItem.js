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
import PropTypes from "prop-types";

class MiniListItem extends Component {
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
    this.props.signedIn
      ? favorites.includes(item)
        ? this.props.removeFromFavorites(item)
        : this.props.addToFavorites(item)
      : this.props.navigation.navigate("SignIn");
  };

  showFav = () => {
    return (
      this.props.showFav && (
        // icon by Smash Icons
        <TouchableHighlight
          style={styles.favorite}
          onPress={() => {
            this.handleFavorite();
          }}
        >
          <Image source={this.getFavoriteIcon()} style={styles.heart} />
        </TouchableHighlight>
      )
    );
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
        {this.showFav()}
        <View style={styles.price}>
          <Text style={styles.coloredPrice}>{this.props.item.price}</Text>
        </View>
      </View>
    );
    return (
      <View style={styles.parent}>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => {
            this.props.selectedDog(this.props.item);
            this.props.navigation.navigate("DogProfile");
          }}
        >
          <View>
            {imageWrapper}
            <View
              style={[
                styles.breed,
                {
                  backgroundColor: this.props.showFav
                    ? colors.notQuiteWhite
                    : colors.white
                }
              ]}
            >
              <Text>{this.props.item.breed}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

MiniListItem.propTypes = {
  showFav: PropTypes.bool,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      routeName: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.object.isRequired
  })
};

MiniListItem.defaultProps = {
  showFav: false
};

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    signedIn: state.signedIn
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
)(MiniListItem);
