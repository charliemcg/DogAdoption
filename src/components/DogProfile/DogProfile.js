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
  Dimensions
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
import IconAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../Map";
import * as Animatable from "react-native-animatable";
import RecentlyViewed from "../RecentlyViewed";
import { dateFormatter } from "../../utils/dateFormatter";
import { HeaderBackButton } from "react-navigation";

class DogProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: navigation.state.params ? (
      navigation.state.params.headerLeft
    ) : (
      <HeaderBackButton
        onPress={() => navigation.goBack(null)}
        tintColor={colors.contrast}
        title="Dog Adoption"
        backTitleVisible={true}
      />
    ),
    headerStyle: {
      backgroundColor: navigation.state.params
        ? navigation.state.params.headerStyle.backgroundColor
        : colors.primary
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      //needed for checking the character count of the user inputted message
      message: "",
      fullScreenPhoto: false
    };
  }

  componentDidMount() {
    const { recentlyViewed, selectedDog, addToRecents } = this.props;
    //check that doesn't already exist in recents
    !recentlyViewed.includes(selectedDog) && addToRecents(selectedDog);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDog !== prevProps.selectedDog) {
      this.refs["scrollView"].scrollTo({ y: 0 });
    }
  }

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

  //only send message if it is valid
  handleSend = () => {
    this.state.message.length <= 750 && this.state.message.length > 0
      ? alert("This feature is under construction")
      : this.refs["shake"].shake(500);
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
        <TouchableHighlight
          style={{ height: "100%", width: "100%" }}
          onPress={() => {
            this.setState({ ...this.state, fullScreenPhoto: true });
            this.props.navigation.setParams({
              headerLeft: null,
              headerStyle: {
                backgroundColor: colors.black
              }
            });
          }}
        >
          <View style={{ height: "100%", width: "100%" }}>
            <Image
              source={{ uri: this.props.selectedDog.key }}
              style={styles.blurredImage}
              blurRadius={20}
            />
            <Image
              source={{ uri: this.props.selectedDog.key }}
              style={[styles.fillView, styles.image]}
              resizeMode="contain"
            />
          </View>
        </TouchableHighlight>
        <Animatable.View ref="bounce" style={styles.animatable}>
          <TouchableWithoutFeedback
            style={styles.fillView}
            onPress={() => {
              this.handleFavorite();
            }}
          >
            {/* icon by Smash Icons */}
            <Image source={this.getFavoriteIcon()} style={styles.fillView} />
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
        <Text style={styles.date}>
          {dateFormatter(this.props.selectedDog.date)}
        </Text>
      </View>
    );

    const sellerDetails = (
      <View style={styles.sellerWrapper}>
        <View style={styles.sellerText}>
          <Text>Uploaded by</Text>
          <Text
            style={styles.seller}
            onPress={() => this.props.navigation.navigate("UnderConstruction")}
          >
            John Smith
          </Text>
        </View>
        <View>
          <IconAwesome5
            name="user"
            size={30}
            color={colors.fadedText}
            onPress={() => this.props.navigation.navigate("UnderConstruction")}
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
          <Animatable.View
            ref="shake"
            style={[
              styles.sendAnimatable,
              {
                backgroundColor:
                  message.length <= 750 && message.length > 0
                    ? colors.primary
                    : colors.fadedText
              }
            ]}
          >
            <TouchableWithoutFeedback
              //button only active if there is a valid message to send
              onPress={() => this.handleSend()}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>Send</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animatable.View>
        </View>
      </View>
    );

    const showPhotoFullScreen = (
      <View
        style={{
          position: "absolute",
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1
        }}
      >
        <IconMCI
          name="close"
          size={25}
          color={colors.notQuiteWhite}
          onPress={() => {
            this.setState({ ...this.state, fullScreenPhoto: false });
            this.props.navigation.setParams({
              headerLeft: (
                <HeaderBackButton
                  onPress={() => this.props.navigation.goBack(null)}
                  tintColor={colors.contrast}
                  title="Dog Adoption"
                  backTitleVisible={true}
                />
              ),
              headerStyle: {
                backgroundColor: colors.primary
              }
            });
          }}
          style={{
            position: "absolute",
            zIndex: 2,
            top: 5,
            right: 5
          }}
        />
        <Image
          source={{ uri: this.props.selectedDog.key }}
          style={styles.fillView}
          resizeMode="contain"
        />
      </View>
    );

    return (
      <SafeAreaView style={styles.parent}>
        {/* show full screen photo if required */}
        {this.state.fullScreenPhoto && showPhotoFullScreen}
        {/* photos */}
        {photos}
        {/* quick details */}
        {quickDetailsTopRow}
        {quickDetailsBottomRow}
        <ScrollView style={styles.scrollView} ref="scrollView">
          {/* seller details */}
          {sellerDetails}
          {/* description */}
          <Text style={styles.description}>
            {this.props.selectedDog.description}
          </Text>
          {/* map */}
          <Map location={this.props.selectedDog.location} />
          {/* message container */}
          {messageWrapper}
          {/* recently viewed */}
          {/* only show if there are recent dogs in the array. The currently selected dog does not count. */}
          {this.props.recentlyViewed.length > 0 &&
          this.props.recentlyViewed.length === 1 ? (
            //there may ba one dog in the recents but if it's the same as currently selected then don't show recents
            this.props.recentlyViewed[0] !== this.props.selectedDog && (
              <RecentlyViewed
                navigation={this.props.navigation}
                showFav={false}
              />
            )
          ) : (
            <RecentlyViewed
              navigation={this.props.navigation}
              showFav={false}
            />
          )}
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
