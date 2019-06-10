import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ImageBackground,
  SafeAreaView
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
        <SafeAreaView>
          {/* icon */}
          <View style={styles.iconWrapper}>
            <IconAwesome name="user-circle" size={175} color={colors.primary} />
          </View>
          {/* personal details */}
          <View style={styles.details}>
            <Text>Dog Lover</Text>
            <Text>123 Fake Street</Text>
            <Text>Springfield</Text>
            <Text>allthedogs@gmail.com</Text>
          </View>
          <View style={styles.gridRow}>
            {/* view favourites */}
            <View style={styles.buttonWrapper}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate("Favorites");
                }}
              >
                <Text style={styles.btnText}>View Favorites</Text>
              </TouchableHighlight>
            </View>
            {/* view messages */}
            <View style={styles.buttonWrapper}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate("Messages");
                }}
              >
                <Text style={styles.btnText}>View Messages</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.gridRow}>
            {/* sell dog */}
            <View style={styles.buttonWrapper}>
              <TouchableHighlight style={styles.button}>
                <Text style={styles.btnText}>Sell A Dog</Text>
              </TouchableHighlight>
            </View>
            {/* view ads */}
            <View style={styles.buttonWrapper}>
              <TouchableHighlight style={styles.button}>
                <Text style={styles.btnText}>View My Ads</Text>
              </TouchableHighlight>
            </View>
          </View>
          {/* sign out */}
          <View style={styles.signOutBtnWrapper}>
            <TouchableHighlight
              style={styles.signOutBtn}
              onPress={() => {
                this.props.signInOut();
                this.props.navigation.navigate("Home");
              }}
            >
              <Text style={styles.btnText}>Sign Out</Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
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
