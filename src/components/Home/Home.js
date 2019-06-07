import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import strings from "../../strings";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import constants from "../../constants";
import ListItem from "../ListItem";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import { TouchableHighlight } from "react-native-gesture-handler";
import { breedsList, setResults } from "../../actions";
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
    // this.getDogs(this.props.selectedBreed);
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
        // this.setState({
        //   breeds: breedsArr
        // });
        this.props.breedsList(breedsArr);
      })
      .catch(e => console.log(e));
  };

  //getting results. All dogs or those of a chosen breed
  getDogs = option => {
    let imgArr = [];
    fetch(
      //get all breeds when no breed selected
      option === null
        ? constants.api.allDogs
        : `${constants.api.imagesStart}${option.label}${
            constants.api.imagesEnd
          }`
    )
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        for (let i = 0; i < data.message.length; i++) {
          let trimmedString = "";
          //
          if (option === null) {
            // need to extract breed from the image url
            //removing the head
            trimmedString = String(data.message[i]).replace(
              "https://images.dog.ceo/breeds/",
              ""
            );
            //removing the tail
            let tailString = trimmedString.substring(
              trimmedString.indexOf("/")
            );
            trimmedString = trimmedString.replace(tailString, "");
          }
          imgArr.push({
            key: String(data.message[i]),
            location: constants.states[Math.floor(Math.random() * 8)],
            price: this.generatePrice(),
            breed: option === null ? trimmedString : this.state.selectedBreed,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies dolor. Aenean lacus nisi, viverra consequat consequat nec, pulvinar nec magna. Donec ac augue turpis. Curabitur vel sem nec arcu fermentum sollicitudin nec vitae ex. Proin tempus, orci nec facilisis dapibus, dolor velit efficitur purus, quis hendrerit ipsum nulla quis augue. Ut condimentum, nisi et hendrerit sagittis, libero enim dignissim sapien, in laoreet elit eros ut arcu. Phasellus venenatis elit in risus eleifend, a mollis justo bibendum. Fusce neque enim, lacinia eget neque vel, egestas blandit ante. Vestibulum rutrum ipsum nisi, in imperdiet mauris ultrices vitae. Morbi ultricies leo vitae purus varius, vel euismod nisi finibus. In et semper orci, ut dignissim lorem. Maecenas vitae consectetur augue. Vivamus condimentum a ipsum ut efficitur. Cras non mauris vitae nulla pellentesque volutpat. Quisque vitae nibh maximus, maximus sem vitae, hendrerit nisi."
          });
        }
        // this.setState({
        //   results: imgArr
        // });
        this.props.setResults(imgArr);
      })
      .catch(e => console.log(e));
    // this.setState({
    //   selectedBreed: option.label
    // });
    // this.props.setSelectedBreed(option.label);
  };

  //generating placeholder prices. Not to be used in production
  generatePrice = () => {
    // Getting a price between 0 and 2000 rounded up to the nearest 100
    // prettier-ignore
    let price = Math.ceil(Math.floor((Math.random() * 2000) + 1) / 100) * 100;

    // some dogs should be free
    // prettier-ignore
    if (Math.floor(Math.random() * 6) === 0) {
      return "Free";
    }
    return `$${price}`;
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
        {/* <ModalSelector
          style={styles.breedSelector}
          data={this.props.breeds}
          initValue={this.props.selectedBreed}
          onChange={option => {
            // setting results to nothing will bring up the activity indicator for better UX
            this.setState({ results: [] });
            this.getDogs(option);
          }}
          selectTextStyle={{
            color: colors.dark
          }}
          optionTextStyle={{
            color: colors.notQuiteBlack
          }}
        /> */}
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
    },
    setResults: results => {
      dispatch(setResults(results));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
