import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ImageBackground
} from "react-native";
import styles from "./styles";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import strings from "../../strings";
import { signInOut } from "../../actions";
import { connect } from "react-redux";
import backgroundImg from "../../images/backgroundWhite.png";

class UserProfile extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}
      >
        {/* icon */}
        <View style={styles.iconWrapper}>
          <IconAwesome name="dog" size={100} color={colors.primary} />
        </View>
        {/* personal details */}
        <Text>Name, address, etc</Text>
        {/* sign out */}
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.props.signInOut();
              this.props.navigation.navigate("Home");
            }}
          >
            <Text>Sign out</Text>
          </TouchableHighlight>
        </View>
        {/* view ads */}
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.button}>
            <Text>View ads</Text>
          </TouchableHighlight>
        </View>
        {/* view favourites */}
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.button}>
            <Text>View favourites</Text>
          </TouchableHighlight>
        </View>
        {/* view messages */}
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.button}>
            <Text>View messages</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInOut: () => {
      dispatch(signInOut());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserProfile);
