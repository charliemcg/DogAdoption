import React, { Component } from "react";
import { View, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import constants from "../../constants";
import ListItem from "../ListItem";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import { TouchableHighlight } from "react-native-gesture-handler";
import { breedsList } from "../../actions";
import { getDogs } from "../../searchAlgorithm";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <IconMCI
          name="menu"
          size={35}
          color={colors.white}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerRight: [
        <IconEntypo
          name="message"
          size={35}
          color={colors.white}
          onPress={() => navigation.navigate("Messages")}
        />,
        <IconAwesome
          name="user-circle"
          size={35}
          color={colors.white}
          onPress={() => navigation.navigate("SignIn")}
        />
      ]
    };
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getBreeds();
    getDogs();
  }

  getBreeds = () => {
    fetch(constants.api.breedsList)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        let breedsArr = [];
        let index = 0;
        for (var key in data.message) {
          breedsArr.push({ key: index++, label: key });
        }
        this.props.breedsList(breedsArr);
      })
      .catch(e => console.log(e));
  };

  render() {
    const theList =
      this.props.searchResults.length === 0 ? (
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
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate("Filter")}
        >
          <IconMCI name="filter-outline" size={35} color={colors.white} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => alert("Sort pressed")}>
          <IconAwesome name="sort" size={35} color={colors.white} />
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
    selectedBreed: state.selectedBreed,
    breeds: state.breeds,
    searchResults: state.searchResults
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
