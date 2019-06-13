import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import constants from "../../constants";
import ListItem from "../ListItem";
import LeftButton from "../LeftButton";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import { TouchableHighlight } from "react-native-gesture-handler";
import { breedsList, toggleError } from "../../actions";
import { loadAllDogsInSystem } from "../../utils/generator";
import store from "../../store";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight:
        /**
         * consider reenabling drawer if there are enough items to populate it
         */
        [
          <IconEntypo
            name="message"
            size={35}
            color={colors.contrast}
            onPress={() => {
              store.getState().signedIn
                ? navigation.navigate("UnderConstruction")
                : navigation.navigate("SignIn");
            }}
          />,
          <IconAwesome
            style={{ paddingRight: 10, paddingLeft: 8 }}
            name="heart-o"
            size={30}
            color={colors.contrast}
            onPress={() => {
              store.getState().signedIn
                ? navigation.navigate("Favorites")
                : navigation.navigate("SignIn");
            }}
          />
        ],
      //left button changes based on whether or not user is logged in
      headerLeft: <LeftButton navigation={navigation} />
    };
  };

  componentDidMount() {
    this.getBreeds();
    //maximum results returned by api is 50. Necessary to call several times to get a decent size database
    let count = 0;
    while (count < 10) {
      loadAllDogsInSystem();
      count++;
    }
  }

  getBreeds = () => {
    fetch(constants.api.breedsList)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        let breedsArr = [];
        let index = 0;
        for (let key in data.message) {
          //capitalizing the breed
          key = key.charAt(0).toUpperCase() + key.slice(1);
          breedsArr.push({ key: index++, label: key });
        }
        this.props.breedsList(breedsArr);
      })
      .catch(e => console.log(e));
  };

  render() {
    //shown when there is an error getting data
    const errorScreen = (
      <View style={styles.retryWrapper}>
        <View style={styles.errorTextWrapper}>
          <Text style={styles.errText}>There was an error...</Text>
        </View>
        <View style={styles.retryBtnWrapper}>
          <TouchableHighlight
            onPress={() => {
              this.props.toggleError(false);
              this.componentDidMount();
            }}
            style={styles.errTouchable}
          >
            <View style={styles.retryTextWrapper}>
              <Text style={styles.retryText}>Retry</Text>
              <IconAwesome
                style={{ paddingRight: 10, paddingLeft: 8 }}
                name="refresh"
                size={25}
                color={colors.contrast}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );

    //need to determine if the absence of data is due to loading or network error
    const noData = this.props.error ? (
      errorScreen
    ) : (
      <ActivityIndicator size="large" style={{ flex: 1 }} />
    );

    const theList =
      this.props.searchResults === null ? (
        noData
      ) : (
        <FlatList
          data={this.props.searchResults}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={this.props.navigation} />
          )}
        />
      );

    const fab = this.props.searchResults !== null && (
      <View style={styles.fab}>
        {/* filter */}
        <TouchableHighlight
          style={styles.filterTouchable}
          onPress={() => this.props.navigation.navigate("Filter")}
          underlayColor={colors.dark}
        >
          <View style={styles.fabButton}>
            <View style={styles.fabIconWrapper}>
              <IconMCI
                name="filter-outline"
                size={20}
                color={colors.contrast}
              />
            </View>
            <View style={styles.fabTextWrapper}>
              <Text style={styles.text}>Filter</Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* divider */}
        <View style={styles.dividerWrapper}>
          <View style={styles.divider} />
        </View>
        {/* sort */}
        <Menu>
          <MenuTrigger>
            <TouchableHighlight
              style={styles.sortTouchable}
              underlayColor={colors.dark}
            >
              <View style={styles.fabButton}>
                <View style={styles.fabIconWrapper}>
                  <IconMCI name="sort" size={20} color={colors.contrast} />
                </View>
                <View style={styles.fabTextWrapper}>
                  <Text style={styles.text}>Sort</Text>
                </View>
              </View>
            </TouchableHighlight>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              style={{ padding: 12 }}
              onSelect={() => alert("This feature is under construction")}
              text="Most Relevant"
            />
            <MenuOption
              style={{ padding: 12 }}
              onSelect={() => alert("This feature is under construction")}
              text="Price: Highest First"
            />
            <MenuOption
              style={{ padding: 12 }}
              onSelect={() => alert("This feature is under construction")}
              text="Price: Cheapest First"
            />
          </MenuOptions>
        </Menu>
      </View>
    );

    return (
      <SafeAreaView style={styles.parent}>
        {/* scrollable list of dogs */}
        {theList}
        {/* manipulate search results */}
        {fab}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    breeds: state.breeds,
    searchResults: state.searchResults,
    signedIn: state.signedIn,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    breedsList: breeds => {
      dispatch(breedsList(breeds));
    },
    toggleError: err => {
      dispatch(toggleError(err));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
