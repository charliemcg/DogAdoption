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
import { breedsList } from "../../actions";
import { loadAllDogsInSystem } from "../../utils/generator";
import store from "../../store";

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
    const theList =
      this.props.searchResults === null ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={this.props.searchResults}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={this.props.navigation} />
          )}
        />
      );

    const fab = (
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
        <TouchableHighlight
          style={styles.sortTouchable}
          onPress={() => alert("This feature is under construction")}
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
    signedIn: state.signedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    breedsList: breeds => {
      dispatch(breedsList(breeds));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
