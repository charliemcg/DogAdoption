import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import {
  addToFavorites,
  removeFromFavorites,
  addToRecents
} from "../../actions";
import heartImg from "../../images/heart.png";
import heartFilledImg from "../../images/heartFilled.png";
import Icon from "react-native-vector-icons/FontAwesome5";
import MiniListItem from "../MiniListItem";
import Map from "../Map";
import * as Animatable from "react-native-animatable";

class DogProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //needed for checking the character count of the user inputted message
      message: ""
    };
  }

  componentDidMount() {
    const { recentlyViewed, selectedDog, addToRecents } = this.props;
    //check that doesn't already exist in recents
    !recentlyViewed.includes(selectedDog) && addToRecents(selectedDog);
  }

  formattedDate = () => {
    date = new Date(this.props.selectedDog.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  //filled if favorited, empty if not
  getFavoriteIcon = () => {
    return this.props.favorites.includes(this.props.selectedDog)
      ? heartFilledImg
      : heartImg;
  };

  //add/remove dog from favorites
  handleFavorite = () => {
    const { favorites, selectedDog } = this.props;
    if (this.props.signedIn) {
      if (favorites.includes(selectedDog)) {
        this.props.removeFromFavorites(selectedDog);
      } else {
        //bounce the heart when adding to favorites
        this.refs["bounce"]
          .bounce(500)
          .then(this.props.addToFavorites(selectedDog));
      }
    } else {
      this.props.navigation.navigate("SignIn");
    }
  };

  render() {
    const { message } = this.state;

    //returning the length of the user inputted message and coloring it red if too long
    const characterLength = (
      <Text
        style={{
          color: message.length <= 750 ? colors.fadedText : "red"
        }}
      >
        {message.length}
      </Text>
    );

    const photos = (
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: this.props.selectedDog.key }}
          style={styles.blurredImage}
          blurRadius={20}
        />
        <Image
          source={{ uri: this.props.selectedDog.key }}
          style={styles.image}
          resizeMode="contain"
        />
        <Animatable.View ref="bounce" style={styles.animatable}>
          <TouchableWithoutFeedback
            style={styles.favorite}
            onPress={() => {
              this.handleFavorite();
            }}
          >
            {/* icon by Smash Icons */}
            <Image source={this.getFavoriteIcon()} style={styles.heart} />
          </TouchableWithoutFeedback>
        </Animatable.View>
      </View>
    );

    const quickDetailsTopRow = (
      <View style={styles.locationRow}>
        <Text style={styles.location}>
          Location: {this.props.selectedDog.location}
        </Text>
        <View style={styles.price}>
          <Text>Price: </Text>
          <Text style={styles.coloredPrice}>
            {this.props.selectedDog.price}
          </Text>
        </View>
      </View>
    );

    const quickDetailsBottomRow = (
      <View style={styles.breedRow}>
        <Text style={styles.breed}>{this.props.selectedDog.breed}</Text>
        <Text style={styles.date}>{this.formattedDate()}</Text>
      </View>
    );

    const sellerDetails = (
      <View style={styles.sellerWrapper}>
        <View style={styles.sellerText}>
          <Text>Uploaded by</Text>
          <Text
            style={styles.seller}
            onPress={() =>
              alert("create function that redirects to seller profile")
            }
          >
            John Smith
          </Text>
        </View>
        <View>
          <Icon
            name="user"
            size={30}
            color={colors.fadedText}
            onPress={() =>
              alert("create function that redirects to seller profile")
            }
          />
        </View>
      </View>
    );

    const messageWrapper = (
      <View style={styles.messageWrapper}>
        <View style={styles.contactTextWrapper}>
          <Text style={styles.contactText}>Contact Seller</Text>
        </View>
        <TextInput
          style={styles.message}
          multiline={true}
          placeholder="Hi. Is this dog still available?"
          onChangeText={msg => this.setState({ message: msg })}
        />
        <View style={styles.btnWrapper}>
          <Text style={styles.counter}>{characterLength}/750</Text>
          <TouchableHighlight
            style={[
              styles.sendBtn,
              {
                backgroundColor:
                  message.length <= 750 && message.length > 0
                    ? colors.primary
                    : colors.fadedText
              }
            ]}
            //button only active if there is a valid message to send
            onPress={() =>
              message.length <= 750 && message.length > 0
                ? this.props.signedIn
                  ? alert("Send")
                  : this.props.navigation.navigate("SignIn")
                : alert("add shake animation")
            }
            underlayColor={colors.dark}
          >
            <Text>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );

    const recentlyViewed = (
      <View>
        <Text style={styles.recents}>Recently Viewed</Text>
        <FlatList
          data={this.props.recentlyViewed}
          horizontal={true}
          renderItem={({ item }) =>
            // don't show the currently selected dog in the recents
            item !== this.props.selectedDog && (
              <MiniListItem
                item={item}
                navigation={this.props.navigation}
                showFav={false}
              />
            )
          }
        />
      </View>
    );

    return (
      <SafeAreaView style={styles.parent}>
        {/* photos */}
        {photos}
        {/* quick details */}
        {quickDetailsTopRow}
        {quickDetailsBottomRow}
        <ScrollView style={styles.scrollView}>
          {/* seller details */}
          {sellerDetails}
          {/* description */}
          <Text style={styles.description}>
            {this.props.selectedDog.description}
          </Text>
          {/* map */}
          <Map />
          {/* message container */}
          {messageWrapper}
          {/* recently viewed */}
          {/* only show if there are recent dogs in the array. The currently selected dog does not count. */}
          {this.props.recentlyViewed.length > 0 &&
          this.props.recentlyViewed.length === 1
            ? this.props.recentlyViewed[0] !== this.props.selectedDog &&
              recentlyViewed
            : recentlyViewed}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    selectedDog: state.selectedDog,
    signedIn: state.signedIn,
    recentlyViewed: state.recentlyViewed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToFavorites: dog => {
      dispatch(addToFavorites(dog));
    },
    removeFromFavorites: dog => {
      dispatch(removeFromFavorites(dog));
    },
    addToRecents: dog => {
      dispatch(addToRecents(dog));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DogProfile);
