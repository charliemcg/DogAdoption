import React, { Component } from "react";
import { View, SafeAreaView, Text, Alert, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import strings from "../../strings";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import constants from "../../constants";
import ListItem from "../ListItem";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //api is retrieving data
      loading: false,
      //list of selectable breeds
      breeds: [],
      //breed that user chose
      selectedBreed: strings.select,
      //images of dogs of the selected breed
      results: [
        {
          key:
            "data:image/png;base64,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",
          location: "Blahsville",
          price: "Free",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies dolor. Aenean lacus nisi, viverra consequat consequat nec, pulvinar nec magna. Donec ac augue turpis. Curabitur vel sem nec arcu fermentum sollicitudin nec vitae ex. Proin tempus, orci nec facilisis dapibus, dolor velit efficitur purus, quis hendrerit ipsum nulla quis augue. Ut condimentum, nisi et hendrerit sagittis, libero enim dignissim sapien, in laoreet elit eros ut arcu. Phasellus venenatis elit in risus eleifend, a mollis justo bibendum. Fusce neque enim, lacinia eget neque vel, egestas blandit ante. Vestibulum rutrum ipsum nisi, in imperdiet mauris ultrices vitae. Morbi ultricies leo vitae purus varius, vel euismod nisi finibus. In et semper orci, ut dignissim lorem. Maecenas vitae consectetur augue. Vivamus condimentum a ipsum ut efficitur. Cras non mauris vitae nulla pellentesque volutpat. Quisque vitae nibh maximus, maximus sem vitae, hendrerit nisi."
        }
      ]
    };
  }

  componentDidMount() {
    this.getBreeds();
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
        this.setState({
          loading: false,
          breeds: breedsArr
        });
      })
      .catch(e => console.log(e));
  };

  //images of dogs of the chosen breed
  getImages = option => {
    let imgArr = [];
    fetch(
      `${constants.api.imagesStart}${option.label}${constants.api.imagesEnd}`
    )
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        for (let i = 0; i < data.message.length; i++) {
          imgArr.push({
            key: String(data.message[i]),
            location: constants.states[Math.floor(Math.random() * 8)],
            price: this.generatePrice(),
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies dolor. Aenean lacus nisi, viverra consequat consequat nec, pulvinar nec magna. Donec ac augue turpis. Curabitur vel sem nec arcu fermentum sollicitudin nec vitae ex. Proin tempus, orci nec facilisis dapibus, dolor velit efficitur purus, quis hendrerit ipsum nulla quis augue. Ut condimentum, nisi et hendrerit sagittis, libero enim dignissim sapien, in laoreet elit eros ut arcu. Phasellus venenatis elit in risus eleifend, a mollis justo bibendum. Fusce neque enim, lacinia eget neque vel, egestas blandit ante. Vestibulum rutrum ipsum nisi, in imperdiet mauris ultrices vitae. Morbi ultricies leo vitae purus varius, vel euismod nisi finibus. In et semper orci, ut dignissim lorem. Maecenas vitae consectetur augue. Vivamus condimentum a ipsum ut efficitur. Cras non mauris vitae nulla pellentesque volutpat. Quisque vitae nibh maximus, maximus sem vitae, hendrerit nisi."
          });
        }
        this.setState({
          results: imgArr
        });
      })
      .catch(e => console.log(e));
    this.setState({
      selectedBreed: option.label
    });
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
    return (
      <SafeAreaView style={styles.parent}>
        {/* select a breed */}
        <ModalSelector
          data={this.state.breeds}
          initValue={this.state.selectedBreed}
          onChange={option => {
            this.getImages(option);
          }}
        />
        {/* scrollable list of dogs */}
        <FlatList
          data={this.state.results}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={this.props.navigation} />
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    //props go here...
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //actions go here...
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
