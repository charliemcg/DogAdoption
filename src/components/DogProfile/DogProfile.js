import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import { addToFavorites, removeFromFavorites } from "../../actions";
import heartImg from "../../images/heart.png";
import heartFilledImg from "../../images/heartFilled.png";
import Icon from "react-native-vector-icons/FontAwesome5";

class DogProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  formattedDate = () => {
    date = new Date(this.props.selectedDog.date);
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

    return (
      <SafeAreaView style={styles.parent}>
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
          {/* icon by Smash Icons */}
          <TouchableHighlight
            style={styles.favorite}
            onPress={() => {
              this.handleFavorite();
            }}
          >
            <Image source={this.getFavoriteIcon()} style={styles.heart} />
          </TouchableHighlight>
        </View>
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
        <View style={styles.breedRow}>
          <Text style={styles.breed}>{this.props.selectedDog.breed}</Text>
          <Text style={styles.date}>{this.formattedDate()}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.userWrapper}>
            <View style={styles.userText}>
              <Text>Uploaded by</Text>
              <Text
                style={styles.user}
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
          <Text style={styles.description}>
            {this.props.selectedDog.description}
          </Text>
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
                onPress={() =>
                  message.length <= 750 && message.length > 0 && alert("Send")
                }
                underlayColor={colors.dark}
              >
                <Text>Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    selectedDog: state.selectedDog
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(DogProfile);
