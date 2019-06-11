import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  TouchableWithoutFeedback
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
import * as Animatable from "react-native-animatable";

class ListItem extends Component {
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
    if (this.props.signedIn) {
      if (favorites.includes(item)) {
        this.props.removeFromFavorites(item);
      } else {
        //bounce the heart when adding to favorites
        this.refs["bounce"].bounce(500).then(this.props.addToFavorites(item));
      }
    } else {
      this.props.navigation.navigate("SignIn");
    }
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
        <Animatable.View ref="bounce" style={styles.animatable}>
          {/* icon by Smash Icons */}
          <TouchableWithoutFeedback
            style={styles.favorite}
            onPress={() => {
              this.handleFavorite();
            }}
          >
            <Image source={this.getFavoriteIcon()} style={styles.heart} />
          </TouchableWithoutFeedback>
        </Animatable.View>
      </View>
    );

    const quickDetailsRowOne = (
      <View style={styles.quickDetailsRowOne}>
        <Text style={styles.location}>
          Location: {this.props.item.location}
        </Text>
        <View style={styles.price}>
          <Text>Price: </Text>
          <Text style={styles.coloredPrice}>{this.props.item.price}</Text>
        </View>
      </View>
    );

    const quickDetailsRowTwo = (
      <View style={styles.quickDetailsRowTwo}>
        <Text style={styles.breed}>{this.props.item.breed}</Text>
        <Text style={styles.date}>{this.formattedDate()}</Text>
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
          underlayColor={colors.notQuiteWhite}
        >
          <View style={styles.contentWrapper}>
            {imageWrapper}
            {quickDetailsRowOne}
            {quickDetailsRowTwo}
            <Text style={styles.description}>
              {this.props.item.description}
            </Text>
            <LinearGradient
              colors={[
                "rgba(256, 256, 256, 0.1)",
                "rgba(256, 256, 256, 0.6)",
                colors.white
              ]}
              style={styles.fade}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

ListItem.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      routeName: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.object.isRequired
  })
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
)(ListItem);
