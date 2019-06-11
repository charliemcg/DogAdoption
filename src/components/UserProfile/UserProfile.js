import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  ScrollView
} from "react-native";
import styles from "./styles";
import IconAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import colors from "../../colors";
import { signInOut } from "../../actions";
import { connect } from "react-redux";
import backgroundImg from "../../images/backgroundWhite.png";
import RecentlyViewed from "../RecentlyViewed";

class UserProfile extends Component {
  buttonSkeleton = btnProps => (
    <View style={styles.buttonWrapper}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          this.props.navigation.navigate(btnProps.route);
        }}
        underlayColor={colors.dark}
      >
        <View style={styles.btnContentsWrapper}>
          {btnProps.icon}
          <Text style={styles.btnText}>{btnProps.text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
  render() {
    const favIcon = (
      <IconAwesome name={"heart"} size={70} color={colors.contrast} />
    );
    const msgIcon = (
      <IconEntypo name={"message"} size={70} color={colors.contrast} />
    );
    const sellIcon = (
      <IconAwesome name={"dollar"} size={70} color={colors.contrast} />
    );
    const adIcon = (
      <IconAwesome5 name={"ad"} size={70} color={colors.contrast} />
    );

    return (
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}
      >
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            {/* icon */}
            <View style={styles.iconWrapper}>
              <IconAwesome5
                name="user-circle"
                size={150}
                color={colors.primary}
              />
            </View>
            {/* personal details */}
            <View style={styles.details}>
              <Text>Dog Lover</Text>
              <Text>123 Fake Street</Text>
              <Text>Springfield</Text>
              <Text>allthedogs@gmail.com</Text>
            </View>
            {this.props.recentlyViewed.length > 0 && (
              <RecentlyViewed
                navigation={this.props.navigation}
                showFav={false}
              />
            )}
            <View style={styles.gridRow}>
              {/* sell dog */}
              {this.buttonSkeleton({
                route: "UnderConstruction", // <- change this
                icon: sellIcon,
                text: "Sell a Dog"
              })}
              {/* view ads */}
              {this.buttonSkeleton({
                route: "UnderConstruction", // <- change this
                icon: adIcon,
                text: "View My Ads"
              })}
            </View>
            <View style={styles.gridRow}>
              {/* view favourites */}
              {this.buttonSkeleton({
                route: "Favorites",
                icon: favIcon,
                text: "View Favorites"
              })}
              {/* view messages */}
              {this.buttonSkeleton({
                route: "Messages",
                icon: msgIcon,
                text: "View Messages"
              })}
            </View>
            {/* sign out */}
            <View style={styles.signOutBtnWrapper}>
              <TouchableHighlight
                style={styles.signOutBtn}
                onPress={() => {
                  this.props.signInOut();
                  this.props.navigation.navigate("Home");
                }}
                underlayColor={colors.dark}
              >
                <View style={styles.signOutContentsWrapper}>
                  <Text style={styles.btnText}>Sign Out</Text>
                  <IconAwesome
                    name="sign-out"
                    size={40}
                    color={colors.contrast}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.resolutionWrapper}>
              <Text>Got a question?</Text>
              <Text
                style={{ color: colors.dark }}
                onPress={() => this.props.navigation.navigate("Resolution")}
              >
                Get in touch!
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    recentlyViewed: state.recentlyViewed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signInOut: () => {
      dispatch(signInOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
